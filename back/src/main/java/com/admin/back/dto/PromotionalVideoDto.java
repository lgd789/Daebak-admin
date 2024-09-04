package com.admin.back.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.admin.back.entity.ProductEntity;
import com.admin.back.entity.PromotionalVideoEntity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PromotionalVideoDto {
    private Long videoId;
    private String videoUrl;
    private String link;
    private List<ProductDto> products;

    public static PromotionalVideoDto fromEntity(PromotionalVideoEntity entity) {
        PromotionalVideoDto dto = new PromotionalVideoDto();
        dto.setVideoId(entity.getVideoId());
        dto.setVideoUrl(entity.getVideoUrl());
        dto.setLink(entity.getLink());

        // PromotionalVideoEntity가 Product 정보를 포함하고 있다면 이를 매핑
        if (entity.getPromotionalProducts() != null) {
            List<ProductDto> products = entity.getPromotionalProducts().stream()
                    .map(promotionalProductEntity -> ProductDto.fromEntity(promotionalProductEntity.getProduct()))
                    .collect(Collectors.toList());
            dto.setProducts(products);
        }

        return dto;
    }

}
