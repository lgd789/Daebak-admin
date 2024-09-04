package com.admin.back.dto;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class OptionDto {
    private Long optionId;
    private String name;
    private BigDecimal addPrice;

    @Override
    public String toString() {
        return "OptionDto{" +
                "optionId=" + optionId +
                ", name='" + name + '\'' +
                ", addPrice=" + addPrice +
                '}';
    }
}
