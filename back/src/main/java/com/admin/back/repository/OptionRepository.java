package com.admin.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.admin.back.entity.OptionEntity;

public interface OptionRepository extends JpaRepository<OptionEntity, Long>{
    
}
