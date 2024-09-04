package com.admin.back.service.implement;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.admin.back.dto.BillingInfoDto;
import com.admin.back.dto.CustomData;
import com.admin.back.entity.BillingInfoEntity;
import com.admin.back.entity.BillingInfoResponse;
import com.admin.back.entity.BillingInfosEntity;
import com.admin.back.service.service.BillingService;
import com.admin.back.util.IamportUtil;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BillingServiceImpl implements BillingService {

    @Value("${iamport.api.url}")
    private String iamportApiUrl;

    private final IamportUtil iamportUtil;

    @Override
    public BillingInfoDto getBillingInfo(String impUid) {
        RestTemplate restTemplate = new RestTemplate();

        // Obtain access token
        String token = iamportUtil.getAccessToken();

        // Request payment details
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<BillingInfoEntity> response = restTemplate.exchange(
            iamportApiUrl + "/payments/" + impUid, HttpMethod.GET, entity, BillingInfoEntity.class
        );


        BillingInfoResponse billingInfoResponse = response.getBody().getResponse();
        BillingInfoDto dto = convertToBillingInfoDto(billingInfoResponse);

        return dto;
    }

    @Override
    public List<BillingInfoDto> getBillingInfos(List<String> impUids) {
        RestTemplate restTemplate = new RestTemplate();

        // Obtain access token
        String token = iamportUtil.getAccessToken();

        // Build URL
        StringBuilder urlBuilder = new StringBuilder(iamportApiUrl + "/payments?");
        for (String impUid : impUids) {
            urlBuilder.append("imp_uid[]=").append(impUid).append("&");
        }
        urlBuilder.append("_token=").append(token);

        String url = urlBuilder.toString();

        // Request payment details
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<BillingInfosEntity> response = restTemplate.exchange(
            url, HttpMethod.GET, entity, BillingInfosEntity.class
        );

        BillingInfosEntity billingInfoEntities = response.getBody();
        List<BillingInfoDto> dtos = new ArrayList<>();
        for (BillingInfoResponse billingInfoResponse : billingInfoEntities.getResponse()) {
            BillingInfoDto dto = convertToBillingInfoDto(billingInfoResponse);
            dtos.add(dto);
        }

        return dtos;
    }

    private BillingInfoDto convertToBillingInfoDto(BillingInfoResponse billingInfoResponse) {
        BillingInfoDto dto = new BillingInfoDto();
        dto.setAmount(billingInfoResponse.getAmount());
        dto.setBuyerName(billingInfoResponse.getBuyerName());
        dto.setBuyerEmail(billingInfoResponse.getBuyerEmail());
        dto.setBuyerTel(billingInfoResponse.getBuyerTel());
        dto.setBuyerAddr(billingInfoResponse.getBuyerAddr());
        dto.setStatus(billingInfoResponse.getStatus());
        dto.setItemName(billingInfoResponse.getName());
        dto.setPaymentTime(billingInfoResponse.getPaidAt());
        dto.setMerchantUid(billingInfoResponse.getMerchantUid());
        dto.setPaymentMethod(billingInfoResponse.getPayMethod());
        dto.setStoreId(billingInfoResponse.getPgId());
        dto.setPgProvider(billingInfoResponse.getPgProvider());
        dto.setPgApprovalNumber(billingInfoResponse.getPgTid());
        dto.setPaymentEnvironment(billingInfoResponse.getChannel());
        dto.setCancelledTime(billingInfoResponse.getCancelledAt());
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            CustomData customData = objectMapper.readValue(billingInfoResponse.getCustomData(), CustomData.class);
            dto.setCustomData(customData);
        } catch (Exception e) {
            e.printStackTrace();
            // Handle parsing error
        }
        return dto;
    }
}

