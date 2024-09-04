package com.admin.back.entity;

import java.util.HashSet;
import java.util.Set;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "coupons")
@Getter @Setter
public class CouponEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "coupon_id")
    private Long couponId;

    @Column(name = "coupon_code")
    private String couponCode;

    @Column(name = "coupon_name")
    private String couponName;

    @Column(name = "discount")
    private BigDecimal discount;

    @Column(name = "valid_from")
    private LocalDateTime validFrom;

    @Column(name = "valid_until")
    private LocalDateTime validUntil;

    @Column(name = "minimum_order_amount")
    private BigDecimal minimumOrderAmount;

    @Column(name = "expiration_period")
    private Integer expirationPeriod;
    
    @OneToMany(mappedBy="coupon")
    private Set<MemberCouponEntity> memberCoupons = new HashSet<>();

    @Override
    public String toString() {
        return "CouponEntity{" +
                "couponId=" + couponId +
                ", couponCode='" + couponCode + '\'' +
                ", couponName='" + couponName + '\'' +
                ", discount=" + discount +
                ", validFrom=" + validFrom +
                ", validUntil=" + validUntil +
                ", minimumOrderAmount=" + minimumOrderAmount +
                ", expirationPeriod=" + expirationPeriod +
                '}';
    }
}
