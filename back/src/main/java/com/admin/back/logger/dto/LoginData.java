package com.admin.back.logger.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class LoginData {
    private String message;
    private String memberId;
    private String id;
    private String type;
    private String date;

    public LoginData(String date, String message, String memberId, String id, String type) {
        this.message = message;
        this.memberId = memberId;
        this.id = id;
        this.type = type;
        this.date = date;
    }
}
