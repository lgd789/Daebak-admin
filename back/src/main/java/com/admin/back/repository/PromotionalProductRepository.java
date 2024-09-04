package com.admin.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.admin.back.entity.PromotionalProductEntity;

public interface PromotionalProductRepository extends JpaRepository<PromotionalProductEntity, Long>{
    
}
