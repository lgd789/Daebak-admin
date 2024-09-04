package com.admin.back.logger.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ProductData {
    private String date;
    private String message;
    private Long productId;
    private String productName;

    public ProductData(String date, String message, Long productId, String productName) {
        this.date = date;
        this.message = message;
        this.productId = productId;
        this.productName = productName;
    }
}
