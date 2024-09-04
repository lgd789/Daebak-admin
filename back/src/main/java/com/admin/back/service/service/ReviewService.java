package com.admin.back.service.service;

import java.util.List;

import com.admin.back.dto.ReviewDto;
import com.admin.back.dto.ReviewResponseDto;

public interface ReviewService {
    List<ReviewDto> getAllReviews();

    ReviewDto saveReviewResponse(Long reviewId, ReviewResponseDto reviewResponse);

    ReviewDto updateBestReivew(Long reviewId);

    ReviewDto deleteResponse(Long reviewId, Long responseId);
}
