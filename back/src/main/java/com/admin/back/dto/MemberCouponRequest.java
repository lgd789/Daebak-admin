package com.admin.back.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MemberCouponRequest {
    private List<MemberDto> members;
    private CouponDto coupon;
}