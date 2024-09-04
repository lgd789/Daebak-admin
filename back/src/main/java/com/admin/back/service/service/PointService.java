package com.admin.back.service.service;

import java.math.BigDecimal;
import java.util.List;

import com.admin.back.dto.MemberDto;
import com.admin.back.dto.PointsDto;

public interface PointService {

    List<MemberDto> addMPointsToMembers(List<MemberDto> memberDtos, PointsDto pointsDto);
    
}
