package com.admin.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.admin.back.entity.MemberEntity;

public interface MemberRepository extends JpaRepository<MemberEntity, Long> {

    MemberEntity findByMemberId(Long memberId);
    
}
