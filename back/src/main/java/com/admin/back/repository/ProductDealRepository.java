package com.admin.back.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.admin.back.dto.ProductDto;
import com.admin.back.entity.ProductDealEntity;
import com.admin.back.entity.ProductEntity;

public interface ProductDealRepository extends JpaRepository<ProductDealEntity, Long>{

    Optional<ProductDealEntity> findByProduct(ProductEntity productEntity);
    
}
