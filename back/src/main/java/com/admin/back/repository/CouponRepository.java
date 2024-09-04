package com.admin.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.admin.back.entity.CouponEntity;

public interface CouponRepository extends JpaRepository<CouponEntity, Long> {

}
