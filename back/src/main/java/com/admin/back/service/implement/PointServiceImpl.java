package com.admin.back.service.implement;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.mariadb.jdbc.plugin.codec.BigDecimalCodec;
import org.springframework.stereotype.Service;

import com.admin.back.dto.MemberDto;
import com.admin.back.dto.PointsDto;
import com.admin.back.entity.MemberCouponEntity;
import com.admin.back.entity.MemberEntity;
import com.admin.back.entity.MemberPointsEntity;
import com.admin.back.entity.PointsDetailsEntity;
import com.admin.back.repository.MemberRepository;
import com.admin.back.repository.PointsDetailsRepository;
import com.admin.back.service.service.PointService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PointServiceImpl implements PointService {

    private final MemberRepository memberRepository;
    private final PointsDetailsRepository pointsDetailsRepository;

    @Override
    @Transactional
    public List<MemberDto> addMPointsToMembers(List<MemberDto> memberDtos, PointsDto pointsDto) {
        List<MemberDto> updatedMemberDtos = new ArrayList<>();

        for (MemberDto memberDto : memberDtos) {
            Optional<MemberEntity> optionalMemberEntity = memberRepository.findById(memberDto.getMemberId());
            
            BigDecimal subTotal = BigDecimal.ZERO;
            
            if (optionalMemberEntity.isPresent()) {
                MemberEntity memberEntity = optionalMemberEntity.get();
                MemberPointsEntity memberPoints = memberEntity.getMemberPoints();

                if (memberPoints != null) {
                    memberPoints.setPoints(memberPoints.getPoints().add(pointsDto.getPoints()));
                    subTotal = memberPoints.getPoints();
                } else {
                    memberPoints = new MemberPointsEntity();
                    memberPoints.setPoints(pointsDto.getPoints());
                    memberPoints.setMember(memberEntity);
                    memberEntity.setMemberPoints(memberPoints);
                }

                // 포인트 내역 생성 및 저장
                PointsDetailsEntity pointsDetails = new PointsDetailsEntity();
                pointsDetails.setMemberId(memberEntity.getMemberId());
                pointsDetails.setDate(LocalDateTime.now());
                pointsDetails.setDescription(pointsDto.getDescription());
                pointsDetails.setUsageAmount(pointsDto.getPoints());
                pointsDetails.setSubTotal(subTotal);

                pointsDetailsRepository.save(pointsDetails);

                memberRepository.save(memberEntity);
                
                memberDto.setPoints(memberPoints.getPoints());
                updatedMemberDtos.add(memberDto);
            } else {
                throw new IllegalArgumentException("Member with id " + memberDto.getMemberId() + " not found");
            }
        }
    
        return updatedMemberDtos;
    }
    
}
