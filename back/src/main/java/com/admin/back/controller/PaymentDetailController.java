package com.admin.back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.admin.back.dto.PaymentDetailDto;
import com.admin.back.service.service.PaymentDetailService;

import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequestMapping("payment-detail")
@RequiredArgsConstructor
public class PaymentDetailController {

    private final PaymentDetailService paymentDetailService;

    @GetMapping("all")
    public List<PaymentDetailDto> getAllPaymentDetails() {
        return paymentDetailService.getAllPaymentDetails();
    }
    
    @PostMapping("refresh-status")
    public ResponseEntity<String> refreshPaymentStatus() {
        paymentDetailService.refreshPaymentStatus();
        return ResponseEntity.ok("Payment status refreshed");
    }
}