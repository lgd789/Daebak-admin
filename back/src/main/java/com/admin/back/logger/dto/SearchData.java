package com.admin.back.logger.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class SearchData {
    private String date;
    private String message;
    private String query;

    public SearchData(String date, String message, String query) {
        this.date = date;
        this.message = message;
        this.query = query;
    }
}
