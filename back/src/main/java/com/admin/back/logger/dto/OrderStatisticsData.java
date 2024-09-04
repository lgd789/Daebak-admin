package com.admin.back.logger.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class OrderStatisticsData {
    public OrderStatisticsData(String date, String productName, int quantity, double amount) {
        this.date = date;
        this.productName = productName;
        this.quantity = quantity;
        this.amount = amount;
    }
    private String date;
    private String productName;
    private int quantity;
    private double amount;

}