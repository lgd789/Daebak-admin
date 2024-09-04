package com.admin.back.logger.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class LoginErrorData {
    private String message;
    private String id;
    private String type;
    private String date;

    public LoginErrorData(String date, String message, String id, String type) {
        this.message = message;
        this.id = id;
        this.type = type;
        this.date = date;
    }
}
