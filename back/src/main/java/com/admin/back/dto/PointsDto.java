package com.admin.back.dto;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class PointsDto {
    private BigDecimal points;
    private String description;
}
