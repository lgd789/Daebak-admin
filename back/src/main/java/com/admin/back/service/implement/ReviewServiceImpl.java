package com.admin.back.service.implement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.admin.back.dto.ReviewDto;
import com.admin.back.dto.ReviewResponseDto;
import com.admin.back.entity.ReviewEntity;
import com.admin.back.entity.ReviewResponseEntity;
import com.admin.back.repository.ReviewRepository;
import com.admin.back.repository.ReviewResponseRepository;
import com.admin.back.service.service.ReviewService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final ReviewResponseRepository reviewResponseRepository;

    @Transactional
    @Override
    public List<ReviewDto> getAllReviews() {
        List<ReviewEntity> reviews = reviewRepository.findAllReviewsWithDetails();

        return reviews.stream().map(review -> {
            ReviewDto dto = new ReviewDto();
            dto.setReviewId(review.getReviewId());
            dto.setProductId(review.getProduct().getProductId());
            dto.setProductName(review.getProduct().getName());
            dto.setOptionId(review.getOption().getOptionId());
            dto.setOptionName(review.getOption().getName());
            dto.setMemberId(review.getMember().getMemberId());
            dto.setMemberName(review.getMember().getName());
            dto.setContents(review.getContents());
            dto.setScore(review.getScore());
            dto.setReviewDate(review.getReviewDate());
            dto.setIsBest(review.getIsBest());
            dto.setOrderNumber(review.getOrderNumber());

            dto.setImgUrl(review.getImages().stream()
                    .map(image -> image.getImageUrl())
                    .collect(Collectors.toList()));

            dto.setResponse(review.getResponses().stream()
                    .map(response -> {
                        ReviewResponseDto responseDTO = new ReviewResponseDto();
                        responseDTO.setResponseId(response.getResponseId());
                        responseDTO.setAdminId(response.getAdminId());
                        responseDTO.setResponseText(response.getResponseText());
                        responseDTO.setResponseDate(response.getResponseDate());
                        return responseDTO;
                    }).collect(Collectors.toList()));

            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public ReviewDto saveReviewResponse(Long reviewId, ReviewResponseDto reviewResponse) {
        
        Optional<ReviewEntity> optionalReviewEntity = reviewRepository.findById(reviewId);
        
        if (optionalReviewEntity.isPresent()) {
            ReviewEntity reviewEntity = optionalReviewEntity.get();

            ReviewResponseEntity reviewResponseEntity = new ReviewResponseEntity();
            reviewResponseEntity.setAdminId(reviewResponse.getAdminId());
            reviewResponseEntity.setResponseText(reviewResponse.getResponseText());
            reviewResponseEntity.setResponseDate(LocalDateTime.now());
            
            reviewEntity.addResponse(reviewResponseEntity);

            ReviewEntity saveReviewEntity = reviewRepository.save(reviewEntity);

            return ReviewDto.fromEntity(saveReviewEntity);
        } else {
            throw new IllegalArgumentException("Review with id " + reviewId + " not found");
        }
    }

    @Override
    public ReviewDto updateBestReivew(Long reviewId) {
        Optional<ReviewEntity> optionalReviewEntity = reviewRepository.findById(reviewId);

        if (optionalReviewEntity.isPresent()) {
            ReviewEntity reviewEntity = optionalReviewEntity.get();
            
            reviewEntity.setIsBest(!reviewEntity.getIsBest());
            ReviewEntity saveReviewEntity = reviewRepository.save(reviewEntity);

            return ReviewDto.fromEntity(saveReviewEntity);
        } else {
            throw new IllegalArgumentException("Review with id " + reviewId + " not found");
        }
    }


    @Override
    public ReviewDto deleteResponse(Long reviewId, Long responseId) {
        Optional<ReviewEntity> optionalReviewEntity = reviewRepository.findById(reviewId);
        
        if (optionalReviewEntity.isPresent()) {
            ReviewEntity reviewEntity = optionalReviewEntity.get();

            Optional<ReviewResponseEntity> optionalResponse = reviewEntity.getResponses().stream()
                    .filter(response -> response.getResponseId().equals(responseId))
                    .findFirst();

            if (optionalResponse.isPresent()) {
                reviewEntity.getResponses().remove(optionalResponse.get());
                reviewResponseRepository.delete(optionalResponse.get());

                ReviewEntity savedReviewEntity = reviewRepository.save(reviewEntity);

                return ReviewDto.fromEntity(savedReviewEntity);
            } else {
                throw new IllegalArgumentException("Response with id " + responseId + " not found in review with id " + reviewId);
            }
        } else {
            throw new IllegalArgumentException("Review with id " + reviewId + " not found");
        }
    }
}
