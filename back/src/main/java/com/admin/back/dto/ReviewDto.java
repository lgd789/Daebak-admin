package com.admin.back.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.admin.back.entity.ReviewEntity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewDto {
    private Long reviewId;

    private Long productId;
    private String productName;

    private Long optionId;
    private String optionName;

    private Long memberId;
    private String memberName;

    private String contents;
    private int score;
    private LocalDateTime reviewDate;
    private Boolean isBest;
    private String orderNumber;
    private List<String> imgUrl;
    private List<ReviewResponseDto> response;

    public static ReviewDto fromEntity(ReviewEntity reviewEntity) {
        ReviewDto reviewDto = new ReviewDto();
        reviewDto.setReviewId(reviewEntity.getReviewId());
        reviewDto.setProductId(reviewEntity.getProduct().getProductId());
        reviewDto.setProductName(reviewEntity.getProduct().getName());
        reviewDto.setOptionId(reviewEntity.getOption().getOptionId());
        reviewDto.setOptionName(reviewEntity.getOption().getName()); // 옵션 이름 추가
        reviewDto.setMemberId(reviewEntity.getMember().getMemberId());
        reviewDto.setMemberName(reviewEntity.getMember().getName());
        reviewDto.setContents(reviewEntity.getContents());
        reviewDto.setScore(reviewEntity.getScore());
        reviewDto.setReviewDate(reviewEntity.getReviewDate());
        reviewDto.setIsBest(reviewEntity.getIsBest());
        reviewDto.setOrderNumber(reviewEntity.getOrderNumber());
        reviewDto.setImgUrl(reviewEntity.getImages().stream()
                .map(image -> image.getImageUrl())
                .collect(Collectors.toList()));

        reviewDto.setResponse(reviewEntity.getResponses().stream()
                .map(response -> {
                    ReviewResponseDto responseDTO = new ReviewResponseDto();
                    responseDTO.setResponseId(response.getResponseId());
                    responseDTO.setAdminId(response.getAdminId());
                    responseDTO.setResponseText(response.getResponseText());
                    responseDTO.setResponseDate(response.getResponseDate());
                    return responseDTO;
                }).collect(Collectors.toList()));
        return reviewDto;
    }
}
