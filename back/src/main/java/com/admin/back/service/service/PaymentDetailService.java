package com.admin.back.service.service;

import com.admin.back.dto.PaymentDetailDto;

import java.util.List;

public interface PaymentDetailService {
    List<PaymentDetailDto> getAllPaymentDetails();
    void refreshPaymentStatus();
}