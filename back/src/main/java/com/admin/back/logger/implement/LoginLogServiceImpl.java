package com.admin.back.logger.implement;

import java.util.*;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;

import com.admin.back.logger.dto.LoginData;
import com.admin.back.logger.dto.LoginErrorData;
import com.admin.back.logger.dto.OrderItemErrorData;
import com.admin.back.logger.service.LoginLogService;


import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class LoginLogServiceImpl implements LoginLogService{
    private static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd");
    private static final SimpleDateFormat MONTH_FORMAT = new SimpleDateFormat("yyyy-MM");

    private String[] loginLogHeaders = {"Date", "Message", "Member ID", "ID", "Type"};
    private String[] loginErrorLogHeaders = {"Date", "Message", "ID", "Type"};
    private String[] loginStatisticsHeaders = {"Date", "Count"};

    private Pattern createLogPattern(String messageIdentifier) {
        String patternString = String.format(
            "(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}) INFO .* - %s - Message: (.*), MemberId: (.*), ID: (.*), Type: (.*)",
            messageIdentifier
        );
        return Pattern.compile(patternString);
    }

    private Pattern createErrorLogPattern(String messageIdentifier) {
        String patternString = String.format(
            "(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}) ERROR .* - %s - Message: (.*), ID: (.*), Type: (.*)",
            messageIdentifier
        );
        return Pattern.compile(patternString);
    }


    private Sheet getOrCreateSheet(Workbook workbook, String sheetName, String[] headers) {
        Sheet sheet = workbook.getSheet(sheetName);
        if (sheet == null) {

            sheet = workbook.createSheet(sheetName);
            Row headerRow = sheet.createRow(0);
            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
            }
        }
        return sheet;
    }

    @Override
    public void appendInfoLoginData(Workbook workbook, List<LoginData> logins, String sheetName) {
        Sheet sheet = getOrCreateSheet(workbook, sheetName, loginLogHeaders);

        int rowNum = sheet.getLastRowNum() + 1;
        for (LoginData login : logins) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(login.getDate());
            row.createCell(1).setCellValue(login.getMessage());
            row.createCell(2).setCellValue(login.getMemberId());
            row.createCell(3).setCellValue(login.getId());
            row.createCell(4).setCellValue(login.getType());
            
        }
    }

    @Override
    public void updateLoginStatistics(Workbook workbook, Workbook workbookMonthlyStatistic, List<LoginData> logins, String sheetName) {
        Sheet dailySheet = getOrCreateSheet(workbook, sheetName, loginStatisticsHeaders);
        Sheet monthlySheet = getOrCreateSheet(workbookMonthlyStatistic, sheetName, loginStatisticsHeaders);

        Map<String, Integer> loginDailyCounts = new HashMap<>();
        Map<String, Integer> loginMonthlyCounts = new HashMap<>();

        for (LoginData login : logins) {
            try {
                // 날짜 문자열을 Date 객체로 변환
                Date date = DATE_FORMAT.parse(login.getDate());

                // Date 객체를 다시 원하는 형식의 문자열로 변환
                String formattedDate = DATE_FORMAT.format(date);
                String formattedMonth = MONTH_FORMAT.format(date);

                // 변환한 날짜 문자열을 사용하여 작업
                loginDailyCounts.merge(formattedDate, 1, Integer::sum);
                loginMonthlyCounts.merge(formattedMonth, 1, Integer::sum);
            } catch (ParseException e) {
                // 날짜를 파싱할 수 없는 경우 예외 처리
                e.printStackTrace();
            }
        }

        updateSheetWithCounts(dailySheet, loginDailyCounts, null);
        updateSheetWithCounts(monthlySheet, loginMonthlyCounts, null);
    }
    
    @Override
    public LoginData find(String logMessage, String messageIdentifier) {
        Pattern pattern = createLogPattern(messageIdentifier);
        Matcher matcher = pattern.matcher(logMessage);

        if (matcher.find()) {
            return new LoginData( matcher.group(1), matcher.group(2), matcher.group(3), matcher.group(4), matcher.group(5));
        }

        return null;
    }

    private void updateSheetWithCounts(Sheet sheet, Map<String, Integer> counts, String defaultValue) {
        for (Map.Entry<String, Integer> entry : counts.entrySet()) {
            boolean found = false;
            int rowNum = sheet.getLastRowNum();
            for (int i = 1; i <= rowNum; i++) {
                Row row = sheet.getRow(i);
                if (row != null && row.getCell(0).getStringCellValue().equals(entry.getKey())) {
                    row.getCell(1).setCellValue(row.getCell(1).getNumericCellValue() + entry.getValue());
                    found = true;
                    break;
                }
            }
            if (!found) {
                Row row = sheet.createRow(rowNum + 1);
                row.createCell(0).setCellValue(entry.getKey());
                row.createCell(1).setCellValue(entry.getValue());
                if (defaultValue != null) {
                    row.createCell(2).setCellValue(defaultValue);
                }
            }
        }
    }

    @Override
    public LoginErrorData findError(String logMessage, String messageIdentifier) {
        Pattern pattern = createErrorLogPattern(messageIdentifier);
        Matcher matcher = pattern.matcher(logMessage);

        if (matcher.find()) {
            return new LoginErrorData( matcher.group(1), matcher.group(2), matcher.group(3), matcher.group(4));
        }

        return null;
    }

    @Override
    public void appendErrorLoginErrorData(Workbook workbook, List<LoginErrorData> logins, String sheetName) {
        Sheet sheet = getOrCreateSheet(workbook, sheetName, loginErrorLogHeaders);

        int rowNum = sheet.getLastRowNum() + 1;
        for (LoginErrorData login : logins) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(login.getDate());
            row.createCell(1).setCellValue(login.getMessage());
            row.createCell(2).setCellValue(login.getId());
            row.createCell(3).setCellValue(login.getType());
        }
    }
}
