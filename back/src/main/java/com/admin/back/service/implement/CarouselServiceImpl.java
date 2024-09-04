package com.admin.back.service.implement;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.admin.back.dto.CarouselDto;
import com.admin.back.entity.CarouselEntity;
import com.admin.back.repository.CarouselRepository;
import com.admin.back.service.service.CarouselService;
import com.admin.back.service.service.S3Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CarouselServiceImpl implements CarouselService {

    private final S3Service s3Service;
    private final CarouselRepository carouselRepository;
    
    @Override
    public List<CarouselDto> getCarousel() {
        List<CarouselEntity> carouselEntities = carouselRepository.findAll();
        return carouselEntities.stream()
                .map(CarouselDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public CarouselDto updateCarousel(MultipartFile image, CarouselDto carousel) {
        CarouselEntity carouselEntity;
    
        if (carousel.getCarouselId() == null) {
            carouselEntity = new CarouselEntity();
        } else {
            carouselEntity = carouselRepository.findById(carousel.getCarouselId())
                                               .orElseThrow(() -> new IllegalArgumentException("Carousel with id " + carousel.getCarouselId() + " not found"));
        }
    
        carouselEntity.setLink(carousel.getLink());
    
        if (image != null) {
            try {
                if (carouselEntity.getImageUrl() != null) {
                    s3Service.deleteImageFromS3(carouselEntity.getImageUrl());
                }
                String imageUrl = s3Service.saveImageToS3(image, "carousel/");
                carouselEntity.setImageUrl(imageUrl);
            } catch (IOException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to save image to S3", e);
            }
        }
    
        CarouselEntity updatedCarouselEntity = carouselRepository.save(carouselEntity);
        return CarouselDto.fromEntity(updatedCarouselEntity);
    }

    @Override
    public void deleteCarousel(Long carouselId) {
        CarouselEntity carouselEntity = carouselRepository.findById(carouselId)
                .orElseThrow(() -> new IllegalArgumentException("Carousel with id " + carouselId + " not found"));

        if (carouselEntity.getImageUrl() != null) {
            try {
                s3Service.deleteImageFromS3(carouselEntity.getImageUrl());
            } catch (IOException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to delete image from S3", e);
            }
        }

        carouselRepository.delete(carouselEntity);
    }

    
}
