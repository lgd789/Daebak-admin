package com.admin.back.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.admin.back.dto.BillingInfoDto;
import com.admin.back.dto.ImpUidRequest;
import com.admin.back.service.service.BillingService;

@RestController
@RequestMapping("/billing")
public class BillingController {

    @Autowired
    private BillingService billingService;

    @GetMapping("/{impUid}")
    public ResponseEntity<?> getBillingInfo(@PathVariable("impUid") String impUid) {
        // return billingService.getBillingInfo(impUid);
        return ResponseEntity.ok().body(billingService.getBillingInfo(impUid));
    }

    @PostMapping
    public ResponseEntity<List<BillingInfoDto>> getBillingInfos(@RequestBody ImpUidRequest impUidRequest) {
        List<String> impUids = impUidRequest.getImpUids();
        List<BillingInfoDto> billingInfo = billingService.getBillingInfos(impUids);
        return ResponseEntity.ok(billingInfo);
    }
}
