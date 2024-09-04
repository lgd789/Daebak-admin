package com.admin.back.logger.service;

import java.util.List;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;

import com.admin.back.logger.dto.LoginData;
import com.admin.back.logger.dto.LoginErrorData;

public interface LoginLogService {
    public void appendInfoLoginData(Workbook workbook, List<LoginData> logins, String sheetName);
    public void appendErrorLoginErrorData(Workbook workbook, List<LoginErrorData> logins, String sheetName);
    public void updateLoginStatistics(Workbook workbook, Workbook workbookMonthlyStatistic, List<LoginData> logins, String sheetName);
    public LoginData find(String logMessage, String messageIdentifier);
    public LoginErrorData findError(String logMessage, String string);
}