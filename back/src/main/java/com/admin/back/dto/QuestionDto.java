package com.admin.back.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.admin.back.entity.QuestionEntity;

@Getter
@Setter
public class QuestionDto {
    private Long questionId;
    private Long productId;
    private String productName;
    private String question;
    private LocalDateTime createdAt;
    private Long memberId;
    private String name;
    private List<AnswerDto> answers;

    public static QuestionDto fromEntity(QuestionEntity questionEntity) {
        QuestionDto dto = new QuestionDto();

        dto.setQuestionId(questionEntity.getQuestionId());
        dto.setQuestion(questionEntity.getQuestion());
        dto.setCreatedAt(questionEntity.getCreatedAt());
        dto.setMemberId(questionEntity.getMember().getMemberId());
        dto.setName(questionEntity.getMember().getName());
        dto.setProductId(questionEntity.getProduct().getProductId());
        dto.setProductName(questionEntity.getProduct().getName());
        dto.setAnswers(questionEntity.getAnswers().stream()
                .map(answer -> {
                    AnswerDto answerDto = new AnswerDto();
                    answerDto.setAnswerId(answer.getAnswerId());
                    answerDto.setResponseText(answer.getContent());
                    answerDto.setResponseDate(answer.getCreatedAt());
                    return answerDto;
                }).collect(Collectors.toList()));

        return dto;
    }
}
