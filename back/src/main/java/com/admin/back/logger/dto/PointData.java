package com.admin.back.logger.dto;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class PointData {
    private String date;
    private String message;
    private BigDecimal deductionPoints;
    private BigDecimal currentPoints;
    private BigDecimal updatePoints;
    private Long memberId;
    private String id;

    public PointData(String date, String message, BigDecimal deductionPoints,  
                    BigDecimal currentPoints,  BigDecimal updatePoints, Long memberId, String id) {

        this.date = date;
        this.message = message;
        this.deductionPoints = deductionPoints;
        this.currentPoints = currentPoints;
        this.updatePoints = updatePoints;
        this.memberId = memberId;
        this.id = id;
   }                
}
