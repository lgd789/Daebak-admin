package com.admin.back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.admin.back.entity.CategoryEntity;


public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {
    @Query("SELECT c FROM CategoryEntity c LEFT JOIN FETCH c.subcategories")
    List<CategoryEntity> findAllWithSubcategories();

    List<CategoryEntity> findByParentCategory(CategoryEntity categoryEntity);
}