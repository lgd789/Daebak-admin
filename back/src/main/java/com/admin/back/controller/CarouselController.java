package com.admin.back.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.admin.back.dto.CarouselDto;
import com.admin.back.service.service.CarouselService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("carousel")
@RequiredArgsConstructor
public class CarouselController {
    
    private final CarouselService carouselService;

    @GetMapping
    public ResponseEntity<?> getCarousel() {
        List<CarouselDto> carouselDtos = carouselService.getCarousel();
        return ResponseEntity.ok().body(carouselDtos);
    }

    @PutMapping
    public ResponseEntity<?> updateCarousel(
            @RequestParam(value = "image", required = false) MultipartFile image,
            @ModelAttribute CarouselDto carousel) {
        
        CarouselDto carouselDto = carouselService.updateCarousel(image, carousel);
        return ResponseEntity.ok().body(carouselDto);
    }

    @DeleteMapping("/{carouselId}")
    public ResponseEntity<?> deleteCarousel(@PathVariable("carouselId") Long carouselId) {
        carouselService.deleteCarousel(carouselId);
        return ResponseEntity.ok().body(carouselId);
    }
    
}
