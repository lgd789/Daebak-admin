package com.admin.back.logger.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class LoginStatisticsData {
    private String date;
    private int count;

    public LoginStatisticsData(String date, int count) {
        this.date = date;
        this.count = count;
    }
}