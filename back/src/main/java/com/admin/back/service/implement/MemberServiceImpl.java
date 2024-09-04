package com.admin.back.service.implement;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.admin.back.dto.CouponDto;
import com.admin.back.dto.MemberCouponDto;
import com.admin.back.dto.MemberDto;
import com.admin.back.entity.CouponEntity;
import com.admin.back.entity.MemberCouponEntity;
import com.admin.back.entity.MemberEntity;
import com.admin.back.mapper.Mapper;
import com.admin.back.repository.MemberCouponRepository;
import com.admin.back.repository.MemberRepository;
import com.admin.back.service.service.CouponService;
import com.admin.back.service.service.MemberService;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final CouponService couponService;

    private final MemberRepository memberRepository;
    private final Mapper mapper;

    @PersistenceContext
    private EntityManager entityManager;

    public List<MemberDto> getMembers() {
        List<MemberEntity> memberEntities = memberRepository.findAll();
        return memberEntities.stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    @Override
    public MemberDto updateMember(MemberDto memberDto) {
        Optional<MemberEntity> optionalMemberEntity = memberRepository.findById(memberDto.getMemberId());

        if (optionalMemberEntity.isPresent()) {
            MemberEntity memberEntity = optionalMemberEntity.get();
            memberEntity.setName(memberDto.getName());
            memberEntity.setId(memberDto.getId());
            memberEntity.setEmail(memberDto.getEmail());
            memberEntity.setPhone(memberDto.getPhone());
            memberEntity.setAddress(memberDto.getAddress());
            memberEntity.setCreateAt(memberDto.getEmployed());

            MemberEntity updatedMemberEntity = memberRepository.save(memberEntity);

            return mapper.toDto(updatedMemberEntity);
        } else {
            // 해당 memberId를 가진 멤버를 찾을 수 없을 경우 예외 처리
            throw new IllegalArgumentException("Member with id " + memberDto.getMemberId() + " not found");
        }
    }
    @Transactional
    @Override
    public MemberDto updateMemberCoupon(MemberDto memberDto) {
        Optional<MemberEntity> optionalMemberEntity = memberRepository.findById(memberDto.getMemberId());

        if (optionalMemberEntity.isPresent()) {
            MemberEntity memberEntity = optionalMemberEntity.get();
            
            // MemberDto의 쿠폰 ID를 Set으로 변환
            Set<Long> dtoCouponIds = memberDto.getMemberCoupons().stream()
                    .map(memberCouponDto -> memberCouponDto.getId())
                    .collect(Collectors.toSet());
            
            // MemberEntity에서 삭제할 쿠폰을 찾음
            Set<MemberCouponEntity> couponsToDelete = memberEntity.getMemberCoupons().stream()
                    .filter(memberCouponEntity -> !dtoCouponIds.contains(memberCouponEntity.getId()))
                    .collect(Collectors.toSet());

            System.out.println(couponsToDelete);
            
            // 삭제할 쿠폰이 있다면, MemberEntity에서 해당 쿠폰을 제거
            if (!couponsToDelete.isEmpty()) {
                memberEntity.getMemberCoupons().removeAll(couponsToDelete);
                memberRepository.save(memberEntity); // 변경사항 저장
            }
            
            return mapper.toDto(memberEntity);
            
        } else {
            throw new IllegalArgumentException("Member with id " + memberDto.getMemberId() + " not found");
        }
    }
    

    @Transactional
    @Override
    public List<MemberDto> addCouponToMembers(List<MemberDto> memberDtos, CouponDto couponDto) {
        List<MemberDto> updatedMemberDtos = new ArrayList<>();
    
        for (MemberDto memberDto : memberDtos) {
            Optional<MemberEntity> optionalMemberEntity = memberRepository.findById(memberDto.getMemberId());
    
            if (optionalMemberEntity.isPresent()) {
                MemberEntity memberEntity = optionalMemberEntity.get();
                
                // MemberEntity를 인자로 전달합니다.
                MemberCouponEntity memberCouponEntity = couponService.createMemberCoupon(couponDto, memberEntity);
                
                memberEntity.addCoupon(memberCouponEntity);
    
                MemberEntity updatedMember = memberRepository.save(memberEntity);
                updatedMemberDtos.add(mapper.toDto(updatedMember));
            } else {
                throw new IllegalArgumentException("Member with id " + memberDto.getMemberId() + " not found");
            }
        }
    
        return updatedMemberDtos;
    }
    

}
