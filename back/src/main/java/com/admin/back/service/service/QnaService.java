package com.admin.back.service.service;

import java.util.List;

import com.admin.back.dto.AnswerDto;
import com.admin.back.dto.QuestionDto;

public interface QnaService {
    List<QuestionDto> getAllQna();

    QuestionDto addAnswer(Long questionId, AnswerDto answer);

    QuestionDto deleteAnswer(Long questionId, Long answerId);
}
