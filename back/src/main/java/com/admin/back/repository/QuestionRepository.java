package com.admin.back.repository;

import com.admin.back.entity.QuestionEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface QuestionRepository extends JpaRepository<QuestionEntity, Long> {

    @Query("SELECT DISTINCT q FROM QuestionEntity q " +
        "LEFT JOIN FETCH q.answers " +
        "LEFT JOIN FETCH q.member m " +
        "LEFT JOIN FETCH q.product p " +
        "LEFT JOIN FETCH m.memberPoints " +
        "LEFT JOIN FETCH p.productDetail")
    List<QuestionEntity> findAllWithAnswersAndMemberAndProduct();
}
