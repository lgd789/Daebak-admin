package com.admin.back.service.service;

import java.util.List;

import com.admin.back.dto.CouponDto;
import com.admin.back.entity.MemberCouponEntity;
import com.admin.back.entity.MemberEntity;

public interface CouponService {
    public List<CouponDto> getCoupons();
    public MemberCouponEntity createMemberCoupon(CouponDto couponDto, MemberEntity memberEntity);
    public CouponDto saveCoupon(CouponDto coupon);
    public void deleteCoupon(Long couponId);
}
