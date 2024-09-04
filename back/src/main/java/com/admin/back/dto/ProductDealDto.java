package com.admin.back.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.admin.back.entity.ProductDealEntity;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ProductDealDto {
    private Long dealId; 
    private ProductDto product;
    private BigDecimal dealPrice;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

     public static ProductDealDto fromEntity(ProductDealEntity productDealEntity) {
        ProductDealDto productDealDto = new ProductDealDto();
        productDealDto.setDealId(productDealEntity.getDealId());
        productDealDto.setProduct(ProductDto.fromEntity(productDealEntity.getProduct()));
        productDealDto.setDealPrice(productDealEntity.getDealPrice());
        productDealDto.setStartDate(productDealEntity.getStartDate());
        productDealDto.setEndDate(productDealEntity.getEndDate());
        return productDealDto;
    }

    public static ProductDealEntity toEntity(ProductDealDto productDealDto) {
        ProductDealEntity productDealEntity = new ProductDealEntity();
        productDealEntity.setDealId(productDealDto.getDealId());
        productDealEntity.setProduct(ProductDto.toEntity(productDealDto.getProduct()));
        productDealEntity.setDealPrice(productDealDto.getDealPrice());
        productDealEntity.setStartDate(productDealDto.getStartDate());
        productDealEntity.setEndDate(productDealDto.getEndDate());
        return productDealEntity;
    }
}
