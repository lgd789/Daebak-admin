package com.admin.back.mapper;

import com.admin.back.dto.CouponDto;
import com.admin.back.dto.MemberCouponDto;
import com.admin.back.dto.MemberDto;
import com.admin.back.entity.CouponEntity;
import com.admin.back.entity.MemberCouponEntity;
import com.admin.back.entity.MemberEntity;

import java.util.stream.Collectors;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Set;

import org.springframework.stereotype.Component;

@Component
public class Mapper {

    public MemberDto toDto(MemberEntity entity) {
        MemberDto dto = new MemberDto();

        dto.setMemberId(entity.getMemberId());
        dto.setName(entity.getName());
        dto.setId(entity.getId());
        dto.setEmail(entity.getEmail());
        dto.setPhone(entity.getPhone());
        dto.setAddress(entity.getAddress());
        dto.setPoints(entity.getMemberPoints().getPoints());
        dto.setEmployed(entity.getCreateAt());

        Set<MemberCouponDto> memberCoupons = entity.getMemberCoupons().stream()
                .map(this::toDto)
                .collect(Collectors.toSet());
        dto.setMemberCoupons(memberCoupons);

        return dto;
    }

   public MemberCouponDto toDto(MemberCouponEntity entity) {
        MemberCouponDto dto = new MemberCouponDto();

        dto.setId(entity.getId());
        dto.setIssueDate(entity.getIssueDate());
        dto.setValidUntil(entity.getValidUntil());
        dto.setCoupon(toDto(entity.getCoupon()));

        return dto;
    }

    public CouponDto toDto(CouponEntity entity) {
        CouponDto dto = new CouponDto();

        dto.setCouponId(entity.getCouponId());
        dto.setCouponCode(entity.getCouponCode());
        dto.setCouponName(entity.getCouponName());
        dto.setDiscount(entity.getDiscount());
        dto.setValidFrom(entity.getValidFrom());
        dto.setValidUntil(entity.getValidUntil());
        dto.setMinimumOrderAmount(entity.getMinimumOrderAmount());
        dto.setExpirationPeriod(entity.getExpirationPeriod());

        return dto;
    }
    
    public MemberEntity toEntity(MemberDto dto) {
        MemberEntity entity = new MemberEntity();

        entity.setMemberId(dto.getMemberId());
        entity.setName(dto.getName());
        entity.setId(dto.getId());
        entity.setEmail(dto.getEmail());
        entity.setPhone(dto.getPhone());
        entity.setAddress(dto.getAddress());
        
        Set<MemberCouponEntity> memberCoupons = dto.getMemberCoupons().stream()
                .map(this::toEntity)
                .collect(Collectors.toSet());
        entity.setMemberCoupons(memberCoupons);

        return entity;
    }

    public MemberCouponEntity toEntity(MemberCouponDto dto) {
        MemberCouponEntity entity = new MemberCouponEntity();

        entity.setId(dto.getId());
        entity.setIssueDate(dto.getIssueDate());
        entity.setValidUntil(dto.getValidUntil());
        entity.setCoupon(toEntity(dto.getCoupon()));

        return entity;
    }

    public CouponEntity toEntity(CouponDto dto) {
        CouponEntity entity = new CouponEntity();

        entity.setCouponId(dto.getCouponId());
        entity.setCouponCode(dto.getCouponCode());
        entity.setCouponName(dto.getCouponName());
        entity.setDiscount(dto.getDiscount());
        entity.setValidFrom(dto.getValidFrom());
        entity.setValidUntil(dto.getValidUntil());
        entity.setMinimumOrderAmount(dto.getMinimumOrderAmount());
        entity.setExpirationPeriod(dto.getExpirationPeriod());

        return entity;
    }
}
