package com.admin.back.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MemberCouponDto {
    private Long id;
    private LocalDateTime issueDate;
    private LocalDateTime validUntil;
    private CouponDto coupon;
}
