package com.admin.back.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class BillingInfoResponse{
    @JsonProperty("imp_uid")
    private String impUid;

    @JsonProperty("merchant_uid")
    private String merchantUid;

    @JsonProperty("pay_method")
    private String payMethod;

    @JsonProperty("channel")
    private String channel;

    @JsonProperty("pg_provider")
    private String pgProvider;

    @JsonProperty("emb_pg_provider")
    private String embPgProvider;

    @JsonProperty("pg_tid")
    private String pgTid;

    @JsonProperty("pg_id")
    private String pgId;

    @JsonProperty("escrow")
    private boolean escrow;

    @JsonProperty("apply_num")
    private String applyNum;

    @JsonProperty("bank_code")
    private String bankCode;

    @JsonProperty("bank_name")
    private String bankName;

    @JsonProperty("card_code")
    private String cardCode;

    @JsonProperty("card_name")
    private String cardName;

    @JsonProperty("card_issuer_code")
    private String cardIssuerCode;

    @JsonProperty("card_issuer_name")
    private String cardIssuerName;

    @JsonProperty("card_publisher_code")
    private String cardPublisherCode;

    @JsonProperty("card_publisher_name")
    private String cardPublisherName;

    @JsonProperty("card_quota")
    private int cardQuota;

    @JsonProperty("card_number")
    private String cardNumber;

    @JsonProperty("card_type")
    private int cardType;

    @JsonProperty("vbank_code")
    private String vbankCode;

    @JsonProperty("vbank_name")
    private String vbankName;

    @JsonProperty("vbank_num")
    private String vbankNum;

    @JsonProperty("vbank_holder")
    private String vbankHolder;

    @JsonProperty("vbank_date")
    private long vbankDate;

    @JsonProperty("vbank_issued_at")
    private long vbankIssuedAt;

    @JsonProperty("name")
    private String name;

    @JsonProperty("amount")
    private int amount;

    @JsonProperty("cancel_amount")
    private int cancelAmount;

    @JsonProperty("currency")
    private String currency;

    @JsonProperty("buyer_name")
    private String buyerName;

    @JsonProperty("buyer_email")
    private String buyerEmail;

    @JsonProperty("buyer_tel")
    private String buyerTel;

    @JsonProperty("buyer_addr")
    private String buyerAddr;

    @JsonProperty("buyer_postcode")
    private String buyerPostcode;

    @JsonProperty("custom_data")
    private String customData;

    @JsonProperty("user_agent")
    private String userAgent;

    @JsonProperty("status")
    private String status;

    @JsonProperty("started_at")
    private long startedAt;

    @JsonProperty("paid_at")
    private long paidAt;

    @JsonProperty("failed_at")
    private long failedAt;

    @JsonProperty("cancelled_at")
    private long cancelledAt;

    @JsonProperty("fail_reason")
    private String failReason;

    @JsonProperty("cancel_reason")
    private String cancelReason;

    @JsonProperty("receipt_url")
    private String receiptUrl;

    @JsonProperty("cancel_history")
    private List<BillingInfoCancelHistory> cancelHistory;

    @JsonProperty("cancel_receipt_urls")
    private List<String> cancelReceiptUrls;

    @JsonProperty("cash_receipt_issued")
    private boolean cashReceiptIssued;

    @JsonProperty("customer_uid")
    private String customerUid;

    @JsonProperty("customer_uid_usage")
    private String customerUidUsage;
}