package com.admin.back.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

import com.admin.back.entity.CategoryEntity;

@Getter
@Setter
public class CategoryDto {
    private Long id;
    private String name;
    private String imageUrl;
    private List<SubcategoryDTO> subcategories;

    @Getter
    @Setter
    public static class SubcategoryDTO {
        private Long id;
        private String name;
        
    }

    public static CategoryDto fromEntity(CategoryEntity categoryEntity) {
        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setId(categoryEntity.getCategoryId());
        categoryDto.setName(categoryEntity.getName());
        categoryDto.setImageUrl(categoryEntity.getImageUrl());
        
        List<SubcategoryDTO> subcategoryDTOs = new ArrayList<>();
        List<CategoryEntity> subcategories = categoryEntity.getSubcategories();
        if (subcategories != null) {
            for (CategoryEntity subcategoryEntity : categoryEntity.getSubcategories()) {
                SubcategoryDTO subcategoryDTO = new SubcategoryDTO();
                subcategoryDTO.setId(subcategoryEntity.getCategoryId());
                subcategoryDTO.setName(subcategoryEntity.getName());
                subcategoryDTOs.add(subcategoryDTO);
            }
        }
        categoryDto.setSubcategories(subcategoryDTOs);
        return categoryDto;
    }

}
