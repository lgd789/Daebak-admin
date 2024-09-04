package com.admin.back.service.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.admin.back.dto.PromotionalVideoDto;

public interface PromotionalVideoService {

    List<PromotionalVideoDto> getPromotionalVideo();

    PromotionalVideoDto updatePromotionalVideo(MultipartFile image, PromotionalVideoDto promotionalVideo);
    
}
