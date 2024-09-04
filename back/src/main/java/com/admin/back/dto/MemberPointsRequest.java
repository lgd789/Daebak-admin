package com.admin.back.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter @Setter
public class MemberPointsRequest {
    private List<MemberDto> members;
    private PointsDto points;
}
