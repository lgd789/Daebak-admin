package com.admin.back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.admin.back.entity.PaymentDetailEntity;

@Repository
public interface PaymentDetailRepository extends JpaRepository<PaymentDetailEntity, Integer> {
    List<PaymentDetailEntity> findAllByStatusIn(List<String> statuses);
    PaymentDetailEntity findByImpUid(String impUid);
}