package com.admin.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.admin.back.entity.AnswerEntity;

public interface AnswerRepository extends JpaRepository<AnswerEntity, Integer> {
}
