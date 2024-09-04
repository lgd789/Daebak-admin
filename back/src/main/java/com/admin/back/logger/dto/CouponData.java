package com.admin.back.logger.dto;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CouponData {
    private String date;
    private String message;
    private Long memberId;
    private String id;
    private String couponId;
    private String couponName;
    private BigDecimal amount;

    public CouponData(String date, String message, Long memberId, String id, String couponId, String couponName, BigDecimal amount) {
        this.date = date;
        this.message = message;
        this.memberId = memberId;
        this.id = id;
        this.couponId = couponId;
        this.couponName = couponName;
        this.amount = amount;
    }
}
