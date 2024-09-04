package com.admin.back.logger.dto;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class PointErrorData {
    private String date;
    private String message;
    private BigDecimal deductionPoints;
    private BigDecimal currentPoints;
    private Long memberId;
    private String id;

    public PointErrorData(String date, String message, BigDecimal deductionPoints, BigDecimal currentPoints, Long memberId, String id) {
        this.date = date;
        this.message = message;
        this.deductionPoints = deductionPoints;
        this.currentPoints = currentPoints;
        this.memberId = memberId;
        this.id = id;
    }
}