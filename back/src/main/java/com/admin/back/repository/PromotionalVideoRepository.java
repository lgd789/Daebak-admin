package com.admin.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.admin.back.entity.PromotionalVideoEntity;

public interface PromotionalVideoRepository extends JpaRepository<PromotionalVideoEntity, Long> {
    
}
