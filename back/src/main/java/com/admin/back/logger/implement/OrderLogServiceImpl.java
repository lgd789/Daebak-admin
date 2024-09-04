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

import com.admin.back.logger.dto.OrderData;
import com.admin.back.logger.dto.OrderErrorData;
import com.admin.back.logger.dto.OrderItemData;
import com.admin.back.logger.service.OrderLogService;

@Service
public class OrderLogServiceImpl implements OrderLogService {

    private String[] orderLogHeaders = { "Date", "Message", "Member ID", "ID", "OrderNumber", "ImpUid"};
    private String[] orderErrorLogHeaders = { "Date", "Message", "Member ID", "ID", "ImpUid"};

    private Pattern createLogPattern(String messageIdentifier) {
        String patternString = String.format(
            "(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}) INFO .* - %s - Message: (.*), MemberId: (\\d+), Id: (.*), OrderNumber: (.*), ImpUid: (.*)",
            messageIdentifier
        );
        return Pattern.compile(patternString);
    }

    private Pattern createErrorLogPattern(String messageIdentifier) {
        String patternString = String.format(
            "(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}) ERROR .* - %s - Message: (.*), MemberId: (\\d+), Id: (.*), ImpUid: (.*)",
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
    public void appendInfoOrderData(Workbook workbook, List<OrderData> orders, String sheetName) {
        Sheet sheet = getOrCreateSheet(workbook, sheetName, orderLogHeaders);
        int rowNum = sheet.getLastRowNum() + 1;

        for (OrderData order : orders) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(order.getDate());
            row.createCell(1).setCellValue(order.getMessage());
            row.createCell(2).setCellValue(order.getMemberId());
            row.createCell(3).setCellValue(order.getId());
            row.createCell(4).setCellValue(order.getOrderNumber());
            row.createCell(5).setCellValue(order.getImpUid());
        }
    }

    @Override
    public void appendErrorOrderData(Workbook workbook, List<OrderErrorData> orders, String sheetName) {
        Sheet sheet = getOrCreateSheet(workbook, sheetName, orderErrorLogHeaders);
        int rowNum = sheet.getLastRowNum() + 1;

        for (OrderErrorData order : orders) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(order.getDate());
            row.createCell(1).setCellValue(order.getMessage());
            row.createCell(2).setCellValue(order.getMemberId());
            row.createCell(3).setCellValue(order.getId());
            row.createCell(4).setCellValue(order.getImpUid());
        }
    }


    @Override
    public OrderData find(String logMessage, String messageIdentifier) {
        Pattern pattern = createLogPattern(messageIdentifier);
        Matcher matcher = pattern.matcher(logMessage);

        if (matcher.find()) {
            return new OrderData(
                matcher.group(1),  // Date
                matcher.group(2),  // Message
                matcher.group(3),  // MemberId
                matcher.group(4),  // Id
                matcher.group(5),  // OrderNumber
                matcher.group(6)   // ImpUid
            );
        }

        return null;
    }

    @Override
    public OrderErrorData findError(String logMessage, String messageIdentifier) {
        Pattern pattern = createErrorLogPattern(messageIdentifier);
        Matcher matcher = pattern.matcher(logMessage);

        if (matcher.find()) {
            return new OrderErrorData(
                matcher.group(1),  // Date
                matcher.group(2),  // Message
                matcher.group(3),  // MemberId
                matcher.group(4),  // Id
                matcher.group(5)   // ImpUid
            );
        }

        return null;
    }

}
