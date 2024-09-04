package com.admin.back.logger.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter @Setter
public class OrderItemData {
    private String message;
    private String orderNumber;
    private String productId;
    private String productName;
    private int quantity;
    private BigDecimal amount;
    private String date;

    public OrderItemData(String date, String message, String orderNumber, String productId, String productName, int quantity, BigDecimal amount) {
        this.message = message;
        this.orderNumber = orderNumber;
        this.productId = productId;
        this.productName = productName;
        this.quantity = quantity;
        this.amount = amount;
        this.date = date;
    }
}
