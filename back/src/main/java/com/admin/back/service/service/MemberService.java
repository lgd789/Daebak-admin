package com.admin.back.service.service;

import java.util.List;

import com.admin.back.dto.CouponDto;
import com.admin.back.dto.MemberDto;
import com.admin.back.entity.MemberEntity;

public interface MemberService {
    List<MemberDto> getMembers();

    MemberDto updateMember(MemberDto memberDto);

    MemberDto updateMemberCoupon(MemberDto memberDto);

    List<MemberDto> addCouponToMembers(List<MemberDto> memberDtos, CouponDto couponDto);
}
