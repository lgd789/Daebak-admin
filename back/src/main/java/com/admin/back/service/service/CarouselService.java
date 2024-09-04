package com.admin.back.service.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.admin.back.dto.CarouselDto;

public interface CarouselService {

    List<CarouselDto> getCarousel();

    CarouselDto updateCarousel(MultipartFile image, CarouselDto carousel);

    void deleteCarousel(Long carouselId);
    
}
