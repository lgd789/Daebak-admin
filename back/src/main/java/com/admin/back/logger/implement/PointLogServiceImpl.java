package com.admin.back.logger.implement;

import java.util.*;
import java.math.BigDecimal;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.admin.back.logger.dto.CouponData;
import com.admin.back.logger.dto.OrderData;
import com.admin.back.logger.dto.PointData;
import com.admin.back.logger.dto.PointErrorData;
import com.admin.back.logger.service.PointLogService;

@Service
public class PointLogServiceImpl implements PointLogService{
    private String[] pointLogHeaders = { "Date", "Message", "Deduction Amount"," Current Points", "Updated Points", "Member ID", "ID"};
    private String[] pointErrorLogHeaders = { "Date", "Message", "Deduction Amount"," Current Points", "Member ID", "ID"};

    private Pattern createPointInfoLogPattern(String messageIdentifier) {
        String patternString = String.format(
            "(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}) INFO .* - Point - Message: (.*), Deduction Amount: (.*), Current Points: (.*), Updated Points: (.*), Member ID: (.*), Id: (.*)",
            messageIdentifier
        );

        return Pattern.compile(patternString);
    }

    private Pattern createPointErrorLogPattern(String messageIdentifier) {
        String patternString = String.format(
            "(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}) ERROR .* - Point - Message: (.*), Deduction Amount: (.*), Current Points: (.*), Member ID: (.*), Id: (.*)",
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
    public void appendInfoPointData(Workbook workbook, List<PointData> points, String sheetName) {
        Sheet sheet = getOrCreateSheet(workbook, sheetName, pointLogHeaders);
        int rowNum = sheet.getLastRowNum() + 1;

        for (PointData point : points) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(point.getDate());
            row.createCell(1).setCellValue(point.getMessage());
            row.createCell(2).setCellValue(point.getDeductionPoints().doubleValue());
            row.createCell(3).setCellValue(point.getCurrentPoints().doubleValue());
            row.createCell(4).setCellValue(point.getUpdatePoints().doubleValue());
            row.createCell(5).setCellValue(point.getMemberId().longValue());
            row.createCell(6).setCellValue(point.getId());
        }
    }

    @Override
    public void appendErrorPointData(Workbook workbook, List<PointErrorData> points, String sheetName) {
        Sheet sheet = getOrCreateSheet(workbook, sheetName, pointErrorLogHeaders);
        int rowNum = sheet.getLastRowNum() + 1;

        for (PointErrorData point : points) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(point.getDate());
            row.createCell(1).setCellValue(point.getMessage());
            row.createCell(2).setCellValue(point.getDeductionPoints().doubleValue());
            row.createCell(3).setCellValue(point.getCurrentPoints().doubleValue());
            row.createCell(4).setCellValue(point.getMemberId().longValue());
            row.createCell(5).setCellValue(point.getId());
        }
    }

    @Override
    public PointData findInfo(String logMessage, String messageIdentifier) {
        Pattern pattern = createPointInfoLogPattern(messageIdentifier);
        Matcher matcher = pattern.matcher(logMessage);

        if (matcher.find()) {
            BigDecimal deductionPoints = new BigDecimal(matcher.group(3));
            BigDecimal currentPoints = new BigDecimal(matcher.group(4));
            BigDecimal updatePoints = new BigDecimal(matcher.group(5));
            return new PointData(
                    matcher.group(1), matcher.group(2), deductionPoints,
                    currentPoints, updatePoints, Long.parseLong(matcher.group(6)), matcher.group(7));
        }

        return null;
    }

    @Override
    public PointErrorData findError(String logMessage, String messageIdentifier) {
        Pattern pattern = createPointErrorLogPattern(messageIdentifier);
        Matcher matcher = pattern.matcher(logMessage);

        if (matcher.find()) {
            BigDecimal deductionPoints = new BigDecimal(matcher.group(3));
            BigDecimal currentPoints = new BigDecimal(matcher.group(4));
            return new PointErrorData(
                    matcher.group(1), matcher.group(2), deductionPoints,
                    currentPoints, Long.parseLong(matcher.group(5)), matcher.group(6));
        }

        return null;
    }

}
