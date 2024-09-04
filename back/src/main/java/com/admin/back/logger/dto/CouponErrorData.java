package com.admin.back.logger.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CouponErrorData {
    private String date;
    private String message;
    private Long memberId;
    private String id;
    private String couponId;
    private String couponName;

    public CouponErrorData(String date, String message, Long memberId, String id, String couponId, String couponName) {
        this.date = date;
        this.message = message;
        this.memberId = memberId;
        this.id = id;
        this.couponId = couponId;
        this.couponName = couponName;
    }
}
