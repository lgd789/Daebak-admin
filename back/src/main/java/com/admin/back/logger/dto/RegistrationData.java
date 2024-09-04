package com.admin.back.logger.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class RegistrationData {
    private String message;
    private String memberId;
    private String id;
    private String type;
    private String date;

    public RegistrationData(String message, String memberId, String id, String type, String date) {
        this.message = message;
        this.memberId = memberId;
        this.id = id;
        this.type = type;
        this.date = date;
    }
}
