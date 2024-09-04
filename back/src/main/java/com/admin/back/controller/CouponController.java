package com.admin.back.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.admin.back.dto.CouponDto;
import com.admin.back.service.service.CouponService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;



@RestController
@RequestMapping("coupon")
@RequiredArgsConstructor
public class CouponController {
    private final CouponService couponService;

    @GetMapping("all")
    public ResponseEntity<?> getCoupons() {
        List<CouponDto> couponDtos = couponService.getCoupons();
        return ResponseEntity.ok().body(couponDtos);
    }

    @PostMapping
    public ResponseEntity<?> saveCoupon(@RequestBody CouponDto coupon) {
        CouponDto couponDto = couponService.saveCoupon(coupon);

        return ResponseEntity.ok().body(couponDto);
    }

    @DeleteMapping("/{couponId}")
    public ResponseEntity<?> deleteCoupon(@PathVariable("couponId") Long couponId) {
        couponService.deleteCoupon(couponId);

        return new ResponseEntity<>(couponId, HttpStatus.OK);
    }
    
}
