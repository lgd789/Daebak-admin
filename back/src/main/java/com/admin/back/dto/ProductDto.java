package com.admin.back.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.admin.back.entity.OptionEntity;
import com.admin.back.entity.ProductEntity;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ProductDto {
    private Long productId;
    private Integer category;
    private String name;
    private String imageUrl;
    private Integer stockQuantity;
    private BigDecimal regularPrice;
    private BigDecimal salePrice;
    private BigDecimal shippingCost;
    private String description;
    private LocalDateTime arrivalDate;
    private Boolean recommended;
    private Boolean popularity;
    private Integer maxQuantityPerDelivery;
    private List<OptionDto> options = new ArrayList<>();;

    // Optional: Include methods to convert between entity and DTO
    public static ProductDto fromEntity(ProductEntity productEntity) {
        ProductDto productDto = new ProductDto();
        productDto.setProductId(productEntity.getProductId());
        productDto.setCategory(productEntity.getCategory());
        productDto.setName(productEntity.getName());
        productDto.setImageUrl(productEntity.getImageUrl());
        productDto.setStockQuantity(productEntity.getStockQuantity());
        productDto.setRegularPrice(productEntity.getRegularPrice());
        productDto.setSalePrice(productEntity.getSalePrice());
        productDto.setShippingCost(productEntity.getShippingCost());
        productDto.setDescription(productEntity.getDescription());
        productDto.setArrivalDate(productEntity.getArrivalDate());
        productDto.setRecommended(productEntity.getRecommended());
        productDto.setPopularity(productEntity.getPopularity());
        productDto.setMaxQuantityPerDelivery(productEntity.getMaxQuantityPerDelivery());
        
        productDto.setOptions(
                productEntity.getOptions().stream()
                    .map(optionEntity -> {
                        OptionDto optionDto = new OptionDto();
                        optionDto.setOptionId(optionEntity.getOptionId());
                        optionDto.setName(optionEntity.getName());
                        optionDto.setAddPrice(optionEntity.getAddPrice());
                        return optionDto;
                    })
                    .collect(Collectors.toList())
            );
        return productDto;
    }

    public static ProductEntity toEntity(ProductDto productDto) {
        ProductEntity productEntity = new ProductEntity();
        productEntity.setProductId(productDto.getProductId());
        productEntity.setCategory(productDto.getCategory());
        productEntity.setName(productDto.getName());
        productEntity.setImageUrl(productDto.getImageUrl());
        productEntity.setStockQuantity(productDto.getStockQuantity());
        productEntity.setRegularPrice(productDto.getRegularPrice());
        productEntity.setSalePrice(productDto.getSalePrice());
        productEntity.setShippingCost(productDto.getShippingCost());
        productEntity.setDescription(productDto.getDescription());
        productEntity.setArrivalDate(productDto.getArrivalDate());
        productEntity.setRecommended(productDto.getRecommended());
        productEntity.setPopularity(productDto.getPopularity());
        productEntity.setMaxQuantityPerDelivery(productDto.getMaxQuantityPerDelivery());
       
        productEntity.setOptions(
                productDto.getOptions().stream()
                    .map(optionDto -> {
                        OptionEntity optionEntity = new OptionEntity();
                        optionEntity.setOptionId(optionDto.getOptionId());
                        optionEntity.setName(optionDto.getName());
                        optionEntity.setAddPrice(optionDto.getAddPrice());
                        return optionEntity;
                    })
                    .collect(Collectors.toList())
            );
        return productEntity;
    }
    @Override
    public String toString() {
        return "ProductDto{" +
                "productId=" + productId +
                ", category=" + category +
                ", name='" + name + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", stockQuantity=" + stockQuantity +
                ", regularPrice=" + regularPrice +
                ", salePrice=" + salePrice +
                ", shippingCost=" + shippingCost +
                ", description='" + description + '\'' +
                ", arrivalDate=" + arrivalDate +
                ", recommended=" + recommended +
                ", popularity=" + popularity +
                ", maxQuantityPerDelivery=" + maxQuantityPerDelivery +
                ", option=" + options +
                '}';
    }

}