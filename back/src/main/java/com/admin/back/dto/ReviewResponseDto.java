package com.admin.back.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ReviewResponseDto {
    private Long responseId;
    private int adminId;
    private String responseText;
    private LocalDateTime responseDate;

    // Getters and Setters
}
