package com.admin.back.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.admin.back.dto.CarouselDto;
import com.admin.back.dto.PromotionalVideoDto;
import com.admin.back.service.service.PromotionalVideoService;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("promotionalVideo")
@RequiredArgsConstructor
public class PromotionalVideoController {

    private final PromotionalVideoService promotionalVideoService;
    private final ObjectMapper objectMapper;
    
    @GetMapping
    public ResponseEntity<?> getPromotionalVideo() {
        List<PromotionalVideoDto> promotionalVideoDtos = promotionalVideoService.getPromotionalVideo();
        return ResponseEntity.ok().body(promotionalVideoDtos);
    }

    @PutMapping
    public ResponseEntity<?> updatePromotionalVideo(
            @RequestParam(value = "video", required = false) MultipartFile video,
            @RequestParam("promotionalVideo") String promotionalVideoJson) throws IOException {

        PromotionalVideoDto promotionalVideo = objectMapper.readValue(promotionalVideoJson, PromotionalVideoDto.class);
        PromotionalVideoDto promotionalVideoDto = promotionalVideoService.updatePromotionalVideo(video, promotionalVideo);
        return ResponseEntity.ok().body(promotionalVideoDto);
    }
}
