package com.admin.back.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.admin.back.dto.CouponDto;
import com.admin.back.dto.MemberCouponRequest;
import com.admin.back.dto.MemberDto;
import com.admin.back.dto.MemberPointsRequest;
import com.admin.back.dto.PointsDto;
import com.admin.back.service.service.PointService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.math.BigDecimal;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequestMapping("points")
@RequiredArgsConstructor
public class PointController {
    
    private final PointService pointService;

    @PostMapping("points")
    public ResponseEntity<?> putMethodName(@RequestBody MemberPointsRequest request) {
        List<MemberDto> members = request.getMembers();
        PointsDto points = request.getPoints();

        List<MemberDto> updatedMembers = pointService.addMPointsToMembers(members, points);

         return ResponseEntity.ok(updatedMembers);
    }
}
