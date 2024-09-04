package com.admin.back.service.implement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.admin.back.dto.AnswerDto;
import com.admin.back.dto.QuestionDto;
import com.admin.back.entity.AnswerEntity;
import com.admin.back.entity.QuestionEntity;
import com.admin.back.entity.ReviewResponseEntity;
import com.admin.back.repository.AnswerRepository;
import com.admin.back.repository.QuestionRepository;
import com.admin.back.service.service.QnaService;

import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QnaServiceImpl implements QnaService {

    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;

    @Override
    public List<QuestionDto> getAllQna() {
        List<QuestionEntity> questions = questionRepository.findAllWithAnswersAndMemberAndProduct();

        return questions.stream().map(question -> {
            QuestionDto dto = new QuestionDto();
            dto.setQuestionId(question.getQuestionId());
            dto.setQuestion(question.getQuestion());
            dto.setCreatedAt(question.getCreatedAt());
            dto.setMemberId(question.getMember().getMemberId());
            dto.setName(question.getMember().getName());
            dto.setProductId(question.getProduct().getProductId());
            dto.setProductName(question.getProduct().getName());
            dto.setAnswers(question.getAnswers().stream()
                    .map(answer -> {
                        AnswerDto answerDto = new AnswerDto();
                        answerDto.setAnswerId(answer.getAnswerId());
                        answerDto.setResponseText(answer.getContent());
                        answerDto.setResponseDate(answer.getCreatedAt());
                        return answerDto;
                    }).collect(Collectors.toList()));

            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public QuestionDto addAnswer(Long questionId, AnswerDto answer) {
        Optional<QuestionEntity> optionalQuestionEntity = questionRepository.findById(questionId); 

        if (optionalQuestionEntity.isPresent()) {
            QuestionEntity questionEntity = optionalQuestionEntity.get();

            AnswerEntity answerEntity = new AnswerEntity();
            answerEntity.setContent(answer.getResponseText());
            answerEntity.setCreatedAt(LocalDateTime.now());
            
            questionEntity.addAnswer(answerEntity);

            QuestionEntity updateQuestionEntity = questionRepository.save(questionEntity);
        
            return QuestionDto.fromEntity(updateQuestionEntity);
        } else {
            throw new IllegalArgumentException("Qustion with id " + questionId + " not found");
        }
    }

    
    @Override
    public QuestionDto deleteAnswer(Long questionId, Long answerId) {
        Optional<QuestionEntity> optionalQuestionEntity = questionRepository.findById(questionId); 

        if (optionalQuestionEntity.isPresent()) {
            QuestionEntity questionEntity = optionalQuestionEntity.get();

            Optional<AnswerEntity> optionalAnswer = questionEntity.getAnswers().stream()
                    .filter(answer -> answer.getAnswerId().equals(answerId))
                    .findFirst();

            if (optionalAnswer.isPresent()) {
                AnswerEntity answerEntity = optionalAnswer.get();
                questionEntity.getAnswers().remove(answerEntity);  // 리스트에서 답변 제거
                answerRepository.delete(answerEntity);

                QuestionEntity updateQuestionEntity = questionRepository.save(questionEntity);  // 변경 사항 저장

                return QuestionDto.fromEntity(updateQuestionEntity);
            } else {
                throw new IllegalArgumentException("Answer with id " + answerId + " not found");
            }
        } else {
            throw new IllegalArgumentException("Question with id " + questionId + " not found");
        }
    }
}
