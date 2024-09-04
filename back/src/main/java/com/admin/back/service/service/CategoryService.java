package com.admin.back.service.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.admin.back.dto.CategoryDto;

public interface CategoryService {

    List<CategoryDto> getCategories();

    void deleteCategory(Long categoryId);

    CategoryDto updateCategories(CategoryDto categoryDto, MultipartFile image);
    
}
