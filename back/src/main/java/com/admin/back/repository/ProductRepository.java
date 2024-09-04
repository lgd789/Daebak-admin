package com.admin.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.admin.back.entity.ProductEntity;

import java.util.List;

public interface ProductRepository extends JpaRepository<ProductEntity, Long> {

    @Query("SELECT p FROM ProductEntity p " +
           "LEFT JOIN FETCH p.options " +
           "LEFT JOIN FETCH p.productDetail " +
           "WHERE p.productId = :productId")
    ProductEntity findByIdWithDetails(@Param("productId") Long productId);
    
    @Query("SELECT DISTINCT p FROM ProductEntity p " +
           "LEFT JOIN FETCH p.options " +
           "LEFT JOIN FETCH p.productDetail")
    List<ProductEntity> findAllWithDetails();
}