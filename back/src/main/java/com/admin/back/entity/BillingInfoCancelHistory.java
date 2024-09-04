package com.admin.back.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Getter @Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class BillingInfoCancelHistory{
    @JsonProperty("pg_tid")
    private String pgTid;

    @JsonProperty("amount")
    private int amount;

    @JsonProperty("cancelled_at")
    private long cancelledAt;

    @JsonProperty("reason")
    private String reason;

    @JsonProperty("cancellation_id")
    private String cancellationId;

    @JsonProperty("receipt_url")
    private String receiptUrl;
}