package com.admin.back.dto;

import java.util.Set;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MemberDto {
    private Long memberId;
    private String name;
    private String id;
    private String email;
    private String phone;
    private String address; 
    private BigDecimal points;
    private LocalDateTime employed;
    private Set<MemberCouponDto> memberCoupons;
}

