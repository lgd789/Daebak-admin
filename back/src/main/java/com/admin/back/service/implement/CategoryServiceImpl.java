package com.admin.back.service.implement;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.Optional;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.function.Function;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.admin.back.dto.CategoryDto;
import com.admin.back.dto.CategoryDto.SubcategoryDTO;
import com.admin.back.entity.CategoryEntity;
import com.admin.back.repository.CategoryRepository;
import com.admin.back.service.service.CategoryService;
import com.admin.back.service.service.S3Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService{
    private final S3Service s3Service;
    private final CategoryRepository categoryRepository;

    @Override
    public List<CategoryDto> getCategories() {
        List<CategoryDto> categoryDTOs = new ArrayList<>();
        List<CategoryEntity> categoryEntities = categoryRepository.findAllWithSubcategories();
        for (CategoryEntity categoryEntity : categoryEntities) {
            if (categoryEntity.getParentCategory() == null) {
                CategoryDto categoryDTO = CategoryDto.fromEntity(categoryEntity);
                categoryDTOs.add(categoryDTO);
            }
        }
        return categoryDTOs;
    }

    @Override
    public CategoryDto updateCategories(CategoryDto categoryDto, MultipartFile image) {
        if (categoryDto.getId() == null) {
            CategoryDto newCategory = newCategory(categoryDto, image);
            return newCategory;
        }
    
        Optional<CategoryEntity> optionalCategoryEntity = categoryRepository.findById(categoryDto.getId());
    
        if (optionalCategoryEntity.isPresent()) {
            CategoryEntity categoryEntity = optionalCategoryEntity.get();
            categoryEntity.setName(categoryDto.getName());
    
            List<SubcategoryDTO> subcategoryDtos = categoryDto.getSubcategories();
            List<CategoryEntity> subCategoryEntities = categoryRepository.findByParentCategory(categoryEntity);
    
            Map<Long, CategoryEntity> subCategoryEntityMap = subCategoryEntities.stream()
                .collect(Collectors.toMap(CategoryEntity::getCategoryId, Function.identity()));
    
            // Extract IDs of remaining subcategories
            Set<Long> remainingSubcategoryIds = subCategoryEntityMap.keySet();

            for (SubcategoryDTO subcategoryDto : subcategoryDtos) {
                if (subcategoryDto.getName().equals("")) continue;
    
                if (subcategoryDto.getId() == null || !subCategoryEntityMap.containsKey(subcategoryDto.getId())) {
                    CategoryEntity newSubcategoryEntity = new CategoryEntity();
                    newSubcategoryEntity.setName(subcategoryDto.getName());
                    newSubcategoryEntity.setParentCategory(categoryEntity);
                    categoryRepository.save(newSubcategoryEntity);
                } else {
                    CategoryEntity existingSubcategoryEntity = subCategoryEntityMap.get(subcategoryDto.getId());
                    existingSubcategoryEntity.setName(subcategoryDto.getName());
                    categoryRepository.save(existingSubcategoryEntity);
    
                    // Remove processed subcategory ID from remainingSubcategoryIds
                    remainingSubcategoryIds.remove(existingSubcategoryEntity.getCategoryId());
                }
            }

            // Delete remaining subcategories not processed
            for (Long remainingSubcategoryId : remainingSubcategoryIds) {
                categoryRepository.deleteById(remainingSubcategoryId);
            }

            try {
                if (image != null) {
                    s3Service.deleteImageFromS3(categoryEntity.getImageUrl());
    
                    String imageUrl = s3Service.saveImageToS3(image, "category/");
                    categoryEntity.setImageUrl(imageUrl);
                }
            } catch (IOException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to save image to S3", e);
            }
            
            CategoryEntity updateCategoryEntity = categoryRepository.save(categoryEntity);
            return CategoryDto.fromEntity(updateCategoryEntity);
        } else {
            throw new IllegalArgumentException("Category with id " + categoryDto.getId() + " not found");
        }
    }

    public CategoryDto newCategory(CategoryDto categoryDto, MultipartFile image) {
        CategoryEntity categoryEntity = new CategoryEntity();
        categoryEntity.setName(categoryDto.getName());
    

        List<SubcategoryDTO> subcategoryDtos = categoryDto.getSubcategories();
        List<CategoryEntity> subCategoryEntities = new ArrayList<>();

        categoryEntity.setSubcategories(subCategoryEntities);
        CategoryEntity savedCategoryEntity = categoryRepository.save(categoryEntity);

        for (SubcategoryDTO subcategoryDto : subcategoryDtos) {
            if (subcategoryDto.getName().equals("")) continue;

            CategoryEntity subcategoryEntity = new CategoryEntity();
            subcategoryEntity.setName(subcategoryDto.getName());
            subcategoryEntity.setParentCategory(savedCategoryEntity);

            CategoryEntity newSubCategoryEntity = categoryRepository.save(subcategoryEntity);
            savedCategoryEntity.getSubcategories().add(newSubCategoryEntity);
        }
        
        try {
            if (image != null) {
                String imageUrl = s3Service.saveImageToS3(image, "category/");
                savedCategoryEntity.setImageUrl(imageUrl);
            }
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to save image to S3", e);
        }
        CategoryEntity updateCategoryEntity = categoryRepository.save(savedCategoryEntity);
        System.out.println(updateCategoryEntity);
        return CategoryDto.fromEntity(updateCategoryEntity);
    }

    @Override
    @Transactional
    public void deleteCategory(Long categoryId) {
        // 카테고리 ID에 해당하는 카테고리 엔터티를 찾습니다.
        CategoryEntity categoryEntity = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + categoryId));

        // 해당 카테고리 ID를 부모로 가지는 모든 서브 카테고리를 찾습니다.
        List<CategoryEntity> deleteCategoris = categoryRepository.findByParentCategory(categoryEntity);
        deleteCategoris.add(categoryEntity);

        categoryRepository.deleteAll(deleteCategoris);

        try {
            String imageUrl = categoryEntity.getImageUrl();
            if (imageUrl != null) {
                s3Service.deleteImageFromS3(categoryEntity.getImageUrl());
            }
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to delete image to S3", e);
        }
    }

}
