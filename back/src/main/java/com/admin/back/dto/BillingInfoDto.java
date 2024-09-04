package com.admin.back.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class BillingInfoDto {
    private int amount;
    private String buyerName;
    private String buyerEmail;
    private String buyerTel;
    private String buyerAddr;
    private String status;
    private String itemName;
    private Long paymentTime;
    private String merchantUid;
    private String paymentMethod;
    private String storeId;
    private String pgProvider;
    private String pgApprovalNumber;
    private String paymentEnvironment;
    private Long cancelledTime;
    private CustomData customData;
}
