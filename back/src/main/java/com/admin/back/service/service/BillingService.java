package com.admin.back.service.service;

import java.util.List;

import com.admin.back.dto.BillingInfoDto;

public interface BillingService {
    BillingInfoDto getBillingInfo(String impUid);
    List<BillingInfoDto> getBillingInfos(List<String> impUids);
}
