package com.admin.back.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class PaymentDetailDto {
    private int paymentDetailId;

    private String id;
    private String memberName;

    private String impUid;
    private String orderNumber;
    private LocalDateTime orderDate;
    private boolean isCancel;
    private Integer trackingNumber;
    private String mid;
    private String status;
}