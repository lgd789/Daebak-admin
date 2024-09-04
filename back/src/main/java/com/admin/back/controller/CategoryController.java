package com.admin.back.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.admin.back.dto.CategoryDto;
import com.admin.back.service.service.CategoryService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.validation.Valid;

import java.io.IOException;
import java.util.List;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("category")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;
    private final ObjectMapper objectMapper;
    
    @GetMapping
    public ResponseEntity<?> getCategories() {
        List<CategoryDto> categories = categoryService.getCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

   @PostMapping
    public ResponseEntity<?> updateCategories(
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam(value = "id", required = false) Long id,
            @RequestParam("name") String name,
            @RequestParam(value = "subcategories", required = false) String subcategoriesJson) {

        List<CategoryDto.SubcategoryDTO> subcategories = null;

        if (subcategoriesJson != null) {
            try {
                subcategories = objectMapper.readValue(subcategoriesJson, new TypeReference<List<CategoryDto.SubcategoryDTO>>(){});
            } catch (IOException e) {
                return new ResponseEntity<>("Invalid subcategories format", HttpStatus.BAD_REQUEST);
            }
        }

        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setId(id);
        categoryDto.setName(name);
        categoryDto.setSubcategories(subcategories);

        CategoryDto updatedCategory = categoryService.updateCategories(categoryDto, image);
        System.out.println("controller" + updatedCategory.getImageUrl());
        return new ResponseEntity<>(updatedCategory, HttpStatus.OK);
    }

    @DeleteMapping("/{categoryId}")
    public ResponseEntity<?> deleteCategory(@PathVariable("categoryId") Long categoryId) {
        System.out.println(categoryId);
        categoryService.deleteCategory(categoryId);

        return new ResponseEntity<>(categoryId, HttpStatus.OK);
    }
}
