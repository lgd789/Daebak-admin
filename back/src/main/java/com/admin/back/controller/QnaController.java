package com.admin.back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.admin.back.dto.AnswerDto;
import com.admin.back.dto.QuestionDto;
import com.admin.back.dto.ReviewDto;
import com.admin.back.dto.ReviewResponseDto;
import com.admin.back.service.service.QnaService;

import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequestMapping("qna")
@RequiredArgsConstructor
public class QnaController {

    private final QnaService qnaService;

    @GetMapping("all")
    public List<QuestionDto> getAllQna() {
        return qnaService.getAllQna();
    }

    @PutMapping("/{questionId}")
    public ResponseEntity<?> addAnswer(@PathVariable("questionId") Long questionId, @RequestBody AnswerDto answer) {
        QuestionDto questionDto = qnaService.addAnswer(questionId, answer);
        
        return ResponseEntity.ok().body(questionDto);
    }

    @DeleteMapping("/{questionId}/answer/{answerId}")
    public ResponseEntity<?> deleteAnswer(@PathVariable("questionId") Long questionId, @PathVariable("answerId") Long answerId) {
        QuestionDto questionDto = qnaService.deleteAnswer(questionId, answerId);
        
        return ResponseEntity.ok().body(questionDto);
    }
}
