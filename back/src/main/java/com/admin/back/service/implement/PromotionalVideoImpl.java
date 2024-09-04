package com.admin.back.service.implement;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.admin.back.dto.ProductDto;
import com.admin.back.dto.PromotionalVideoDto;
import com.admin.back.entity.ProductEntity;
import com.admin.back.entity.PromotionalProductEntity;
import com.admin.back.entity.PromotionalVideoEntity;
import com.admin.back.repository.ProductRepository;
import com.admin.back.repository.PromotionalProductRepository;
import com.admin.back.repository.PromotionalVideoRepository;
import com.admin.back.service.service.PromotionalVideoService;
import com.admin.back.service.service.S3Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PromotionalVideoImpl implements PromotionalVideoService {

    private final S3Service s3Service;
    private final PromotionalVideoRepository promotionalVideoRepository;
    private final PromotionalProductRepository promotionalProductRepository;
    private final ProductRepository productRepository;

    @Override
    public List<PromotionalVideoDto> getPromotionalVideo() {
        List<PromotionalVideoEntity> promotionalVideos = promotionalVideoRepository.findAll();
        return promotionalVideos.stream()
                .map(PromotionalVideoDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    @Override
    public PromotionalVideoDto updatePromotionalVideo(MultipartFile image, PromotionalVideoDto promotionalVideo) {
        PromotionalVideoEntity promotionalVideoEntity;
    
        if (promotionalVideo.getVideoId() == null) {
            promotionalVideoEntity = new PromotionalVideoEntity();
        } else {
            promotionalVideoEntity = promotionalVideoRepository.findById(promotionalVideo.getVideoId())
                    .orElseThrow(() -> new IllegalArgumentException(
                            "PromotionalVideo with id " + promotionalVideo.getVideoId() + " not found"));
        }
    
        promotionalVideoEntity.setLink(promotionalVideo.getLink());
    
        if (image != null) {
            try {
                if (promotionalVideoEntity.getVideoUrl() != null) {
                    s3Service.deleteImageFromS3(promotionalVideoEntity.getVideoUrl());
                }
                String fileUrl = s3Service.saveImageToS3(image, "video/");
                promotionalVideoEntity.setVideoUrl(fileUrl);
            } catch (IOException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to save image to S3", e);
            }
        }
        
        List<PromotionalProductEntity> productsToDelete = promotionalVideoEntity.getPromotionalProducts();

        promotionalProductRepository.deleteAll(productsToDelete);
        promotionalVideoEntity.getPromotionalProducts().removeAll(productsToDelete);
       
       // 새로운 promotionalProducts 추가
        for (ProductDto productDto : promotionalVideo.getProducts()) {
            if (productDto.getName() == null || productDto.getName().isEmpty()) continue;

            ProductEntity productEntity = productRepository.findById(productDto.getProductId())
                    .orElseThrow(() -> new IllegalArgumentException(
                            "Product with id " + productDto.getProductId() + " not found"));

            PromotionalProductEntity promotionalProductEntity = new PromotionalProductEntity();
            promotionalProductEntity.setProduct(productEntity);
            promotionalProductEntity.setVideo(promotionalVideoEntity);
            promotionalProductRepository.save(promotionalProductEntity);
            promotionalVideoEntity.addPromotionalProduct(promotionalProductEntity);
        }
    
        PromotionalVideoEntity updatedPromotionalVideoEntity = promotionalVideoRepository.save(promotionalVideoEntity);
        return PromotionalVideoDto.fromEntity(updatedPromotionalVideoEntity);
    }
    
}
