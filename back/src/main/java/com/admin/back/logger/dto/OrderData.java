package com.admin.back.logger.dto;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class OrderData {
    private String date;
    private String message;
    private String memberId;
    private String id;
    private String orderNumber;
    private String impUid;

    public OrderData(String date, String message, String memberId, String id, String orderNumber, String impUid) {
        this.date = date;
        this.message = message;
        this.memberId = memberId;
        this.id = id;
        this.orderNumber = orderNumber;
        this.impUid = impUid;
    }
}

