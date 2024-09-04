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

import com.admin.back.logger.dto.CouponData;
import com.admin.back.logger.dto.CouponErrorData;
import com.admin.back.logger.dto.OrderItemData;
import com.admin.back.logger.service.CouponLogService;


import java.util.regex.Matcher;
import java.util.regex.Pattern;


@Service
public class CouponLogServiceImpl implements CouponLogService {
    private static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd");
    private static final SimpleDateFormat MONTH_FORMAT = new SimpleDateFormat("yyyy-MM");

    private String[] couponLogHeaders = {"Date", "Message", "Member ID", "ID", "Coupon ID", "Coupon Name", "Amount"};
    private String[] couponErrorLogHeaders = {"Date", "Message", "Member ID", "ID", "Coupon ID", "Coupon Name"};


    private Pattern createInfoLogPattern(String messageIdentifier) {
        String patternString = String.format(
            "(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}) INFO .* - %s - Message: (.*), MemberId: (.*), Id: (.*) CouponId: (.*), CouponName: (.*), Amount: (.*)",
            messageIdentifier
        );
        return Pattern.compile(patternString);
    }

    private Pattern createErrorLogPattern(String messageIdentifier) {
        String patternString = String.format(
            "(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}) ERROR .* - %s - Message: (.*), MemberId: (.*), Id: (.*) CouponId: (.*), CouponName: (.*)",
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
    public void appendInfoCouponData(Workbook workbook, List<CouponData> coupons, String sheetName) {
        Sheet sheet = getOrCreateSheet(workbook, sheetName, couponLogHeaders);

        int rowNum = sheet.getLastRowNum() + 1;
        for (CouponData coupon : coupons) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(coupon.getDate());
            row.createCell(1).setCellValue(coupon.getMessage());
            row.createCell(2).setCellValue(coupon.getMemberId().longValue());
            row.createCell(3).setCellValue(coupon.getId());
            row.createCell(4).setCellValue(coupon.getCouponId());
            row.createCell(5).setCellValue(coupon.getCouponName());
            row.createCell(6).setCellValue(coupon.getAmount().doubleValue());
        }
    }

    @Override
    public void appendErrorCouponData(Workbook workbook, List<CouponErrorData> coupons, String sheetName) {
        Sheet sheet = getOrCreateSheet(workbook, sheetName, couponErrorLogHeaders);

        int rowNum = sheet.getLastRowNum() + 1;
        for (CouponErrorData coupon : coupons) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(coupon.getDate());
            row.createCell(1).setCellValue(coupon.getMessage());
            row.createCell(2).setCellValue(coupon.getMemberId().longValue());
            row.createCell(3).setCellValue(coupon.getId());
            row.createCell(4).setCellValue(coupon.getCouponId());
            row.createCell(5).setCellValue(coupon.getCouponName());
        }
    }
    @Override
    public CouponData findInfo(String logMessage, String messageIdentifier) {
        Pattern pattern = createInfoLogPattern(messageIdentifier);
        Matcher matcher = pattern.matcher(logMessage);

        if (matcher.find()) {
            BigDecimal amount = null;
            String group7 = matcher.group(7);
            if (group7.equals("null")) {
                amount = BigDecimal.ZERO;
            } else {

                try {
                    amount = new BigDecimal(group7);
                } catch (NumberFormatException e) {

                }
            }
            return new CouponData(
                    matcher.group(1), matcher.group(2), Long.parseLong(matcher.group(3)), 
                    matcher.group(4), matcher.group(5),matcher.group(6), amount);
        }

        return null;
    }

    @Override
    public CouponErrorData findError(String logMessage, String messageIdentifier) {
        Pattern pattern = createErrorLogPattern(messageIdentifier);
        Matcher matcher = pattern.matcher(logMessage);

        if (matcher.find()) {
            return new CouponErrorData(
                    matcher.group(1), matcher.group(2), Long.parseLong(matcher.group(3)), 
                    matcher.group(4), matcher.group(5),matcher.group(6));
        }

        return null;
    }

}
