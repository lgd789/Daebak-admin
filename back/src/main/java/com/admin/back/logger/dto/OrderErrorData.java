package com.admin.back.logger.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class OrderErrorData {
    private String date;
    private String message;
    private String memberId;
    private String id;
    private String impUid;

    public OrderErrorData(String date, String message, String memberId, String id, String impUid) {
        this.date = date;
        this.message = message;
        this.memberId = memberId;
        this.id = id;
        this.impUid = impUid;
    }
}
