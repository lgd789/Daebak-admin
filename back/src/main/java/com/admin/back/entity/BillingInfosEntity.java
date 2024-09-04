package com.admin.back.entity;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class BillingInfosEntity {
    int code;
    String message;
    BillingInfoResponse[] response;
}
