package com.admin.back.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.admin.back.entity.ReviewResponseEntity;

public interface ReviewResponseRepository extends JpaRepository<ReviewResponseEntity, Long> {

}
