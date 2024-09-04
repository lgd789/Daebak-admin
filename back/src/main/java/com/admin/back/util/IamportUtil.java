package com.admin.back.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class IamportUtil {

    @Value("${iamport.api.key}")
    private String iamportApiKey;

    @Value("${iamport.api.secret}")
    private String iamportApiSecret;

    public String getAccessToken() {
        String url = "https://api.iamport.kr/users/getToken";
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String requestJson = "{\"imp_key\":\"" + iamportApiKey + "\",\"imp_secret\":\"" + iamportApiSecret + "\"}";
        HttpEntity<String> entity = new HttpEntity<>(requestJson, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);

        String body = response.getBody();
        String token = body.split("\"access_token\":\"")[1].split("\"")[0];
        return token;
    }
}
