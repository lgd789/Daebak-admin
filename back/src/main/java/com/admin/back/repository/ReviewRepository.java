package com.admin.back.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import com.admin.back.entity.ReviewEntity;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<ReviewEntity, Long> {

    @Query("SELECT r FROM ReviewEntity r " +
        "LEFT JOIN FETCH r.responses " +
        "LEFT JOIN FETCH r.images " +
        "LEFT JOIN FETCH r.product p " +
        "LEFT JOIN FETCH r.member m " +
        "LEFT JOIN FETCH r.option " +
        "LEFT JOIN FETCH m.memberPoints " +
        "LEFT JOIN FETCH p.productDetail")
    List<ReviewEntity> findAllReviewsWithDetails();
    
}
