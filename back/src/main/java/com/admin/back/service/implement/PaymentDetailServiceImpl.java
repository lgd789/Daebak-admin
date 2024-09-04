package com.admin.back.service.implement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.admin.back.dto.PaymentDetailDto;
import com.admin.back.entity.PaymentDetailEntity;
import com.admin.back.repository.PaymentDetailRepository;
import com.admin.back.service.service.PaymentDetailService;
import com.admin.back.util.IamportUtil;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PaymentDetailServiceImpl implements PaymentDetailService {

    @Autowired
    private PaymentDetailRepository paymentDetailRepository;

    @Value("${iamport.api.url}")
    private String iamportApiUrl;

    private final IamportUtil iamportUtil;

    @Override
    public List<PaymentDetailDto> getAllPaymentDetails() {
        List<PaymentDetailEntity> paymentDetails = paymentDetailRepository.findAll(Sort.by(Sort.Direction.DESC, "paymentDetailId"));
        return paymentDetails.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private PaymentDetailDto convertToDTO(PaymentDetailEntity paymentDetail) {
        PaymentDetailDto dto = new PaymentDetailDto();
        dto.setPaymentDetailId(paymentDetail.getPaymentDetailId());

        if (paymentDetail.getMemberId() == null) {
            dto.setMemberName("비회원");
            dto.setId("비회원");
        } else if (paymentDetail.getMember() == null) {
            dto.setMemberName("탈퇴회원");
            dto.setId("탈퇴회원");
        } else {
            dto.setMemberName(paymentDetail.getMember().getName());
            dto.setId(paymentDetail.getMember().getId());
        }

        dto.setImpUid(paymentDetail.getImpUid());
        dto.setOrderNumber(paymentDetail.getOrderNumber());
        dto.setOrderDate(paymentDetail.getOrderDate());
        dto.setCancel(paymentDetail.isCancel());
        dto.setTrackingNumber(paymentDetail.getTrackingNumber());
        dto.setMid(paymentDetail.getMid());
        dto.setStatus(paymentDetail.getStatus());
        return dto;
    }

    @Override
    public void refreshPaymentStatus() {
        List<PaymentDetailEntity> pendingPayments = paymentDetailRepository
                .findAllByStatusIn(Arrays.asList("pending", "paid", "ready"));

        if (pendingPayments.isEmpty()) {
            return;
        }

        List<String> impUids = pendingPayments.stream()
                .map(PaymentDetailEntity::getImpUid)
                .collect(Collectors.toList());

        StringBuilder urlBuilder = new StringBuilder(iamportApiUrl + "/payments?");

        for (String impUid : impUids) {
            urlBuilder.append("imp_uid[]=").append(impUid).append("&");
        }
        urlBuilder.append("_token=").append(iamportUtil.getAccessToken());

        String url = urlBuilder.toString();
        System.out.println(url);

        try {
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            HttpEntity<String> entity = new HttpEntity<>(headers);
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                Map<String, Object> responseBody = response.getBody();
                if (responseBody != null && responseBody.containsKey("response")) {
                    List<Map<String, Object>> paymentDataList = (List<Map<String, Object>>) responseBody
                            .get("response");
                    for (Map<String, Object> paymentData : paymentDataList) {
                        String impUid = (String) paymentData.get("imp_uid");
                        String status = (String) paymentData.get("status");

                        PaymentDetailEntity paymentDetail = paymentDetailRepository.findByImpUid(impUid);
                        if (paymentDetail != null) {
                            paymentDetail.setStatus(status);
                            paymentDetailRepository.save(paymentDetail);
                        }
                    }
                }
            } else {
                System.err.println("Failed to refresh payment status. HTTP Status: " + response.getStatusCode());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}