package com.admin.back.dto;

import com.admin.back.entity.CarouselEntity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CarouselDto {
    private Long carouselId;
    private String imageUrl;
    private String link;

    public static CarouselDto fromEntity(CarouselEntity carouselEntity) {
        CarouselDto carouselDto = new CarouselDto();
        carouselDto.setCarouselId(carouselEntity.getCarouselId());
        carouselDto.setImageUrl(carouselEntity.getImageUrl());
        carouselDto.setLink(carouselEntity.getLink());
        return carouselDto;
    }
}
