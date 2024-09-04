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

import com.admin.back.logger.dto.OrderItemData;
import com.admin.back.logger.dto.OrderItemErrorData;
import com.admin.back.logger.service.OrderItemLogService;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class OrderItemLogServiceImpl implements OrderItemLogService {
    private static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd");
    private static final SimpleDateFormat MONTH_FORMAT = new SimpleDateFormat("yyyy-MM");

    private String[] orderItemLogHeaders = { "Date", "Message", "OrderNumber", "Product ID", "Product Name", "Quantity", "Amount" };
    private String[] orderItemErrorLogHeaders = { "Date", "Message", "Product ID", "Product Name" };
    private String[] orderItemStatisticsHeaders = { "Date", "Product ID", "Product Name", "Quantity", "Amount" };

    private Pattern createInfoLogPattern(String messageIdentifier) {
        String patternString = String.format(
            "(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}) INFO .* - %s - Message: (.*), OrderNumber: (.*), ProductId: (.*), ProductName: (.*), Quantity: (\\d+), Amount: (\\d+)",
            messageIdentifier
        );
        return Pattern.compile(patternString);
    }

    private Pattern createErrorLogPattern(String messageIdentifier) {
        String patternString = String.format(
            "(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}) ERROR .* - %s - Message: (.*), ProductId: (.*), ProductName: (.*)",
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
    public void appendInfoOrderItemData(Workbook workbook, List<OrderItemData> orderItems, String sheetName) {
        Sheet sheet = getOrCreateSheet(workbook, sheetName, orderItemLogHeaders);

        int rowNum = sheet.getLastRowNum() + 1;
        for (OrderItemData orderItem : orderItems) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(orderItem.getDate());
            row.createCell(1).setCellValue(orderItem.getMessage());
            row.createCell(2).setCellValue(orderItem.getOrderNumber());
            row.createCell(3).setCellValue(orderItem.getProductId());
            row.createCell(4).setCellValue(orderItem.getProductName());
            row.createCell(5).setCellValue(orderItem.getQuantity());
            row.createCell(6).setCellValue(orderItem.getAmount().doubleValue());
        }
    }

    @Override
    public void appendErrorOrderItemData(Workbook workbook, List<OrderItemErrorData> orderItems, String sheetName) {
        Sheet sheet = getOrCreateSheet(workbook, sheetName, orderItemErrorLogHeaders);

        int rowNum = sheet.getLastRowNum() + 1;
        for (OrderItemErrorData orderItem : orderItems) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(orderItem.getDate());
            row.createCell(1).setCellValue(orderItem.getMessage());
            row.createCell(2).setCellValue(orderItem.getProductId());
            row.createCell(3).setCellValue(orderItem.getProductName());
        }
    }

    @Override
    public OrderItemData findInfo(String logMessage, String messageIdentifier) {
        Pattern pattern = createInfoLogPattern(messageIdentifier);
        Matcher matcher = pattern.matcher(logMessage);

        if (matcher.find()) {
            BigDecimal amount = new BigDecimal(matcher.group(7));
            return new OrderItemData(
                    matcher.group(1), matcher.group(2), matcher.group(3), matcher.group(4), matcher.group(5),
                    Integer.parseInt(matcher.group(6)), amount);
        }

        return null;
    }

    @Override
    public OrderItemErrorData findError(String logMessage, String messageIdentifier) {
        Pattern pattern = createErrorLogPattern(messageIdentifier);
        Matcher matcher = pattern.matcher(logMessage);

        if (matcher.find()) {
            return new OrderItemErrorData(
                    matcher.group(1), matcher.group(2), Long.parseLong(matcher.group(3)), matcher.group(4));
        }

        return null;
    }

    @Override
    public void updateOrderStatistics(Workbook workbook, Workbook workbookMonthlyStatistic, List<OrderItemData> orders, String sheetName) {
        Sheet dailySheet = getOrCreateSheet(workbook, sheetName, orderItemStatisticsHeaders);
        Sheet monthlySheet = getOrCreateSheet(workbookMonthlyStatistic, sheetName, orderItemStatisticsHeaders);

        Map<String, Map<String, List<OrderItemData>>> orderDailyCounts = new HashMap<>();
        Map<String, Map<String, List<OrderItemData>>> orderMonthlyCounts = new HashMap<>();

        for (OrderItemData order : orders) {
            try {
                Date date = DATE_FORMAT.parse(order.getDate());
                
                String formattedDate = DATE_FORMAT.format(date);
                String formattedMonth = MONTH_FORMAT.format(date);
                String productId = order.getProductId();

                Map<String, List<OrderItemData>> innerDailyMap = orderDailyCounts.computeIfAbsent(formattedDate, k -> new HashMap<>());
                List<OrderItemData> dailyProductList = innerDailyMap.computeIfAbsent(productId, k -> new ArrayList<>());


                Map<String, List<OrderItemData>> innerMap = orderMonthlyCounts.computeIfAbsent(formattedMonth, k -> new HashMap<>());
                List<OrderItemData> monthlyProductList = innerMap.computeIfAbsent(productId, k -> new ArrayList<>());

                dailyProductList.add(order);
                monthlyProductList.add(order);

            } catch (ParseException e) {
                e.printStackTrace();
            }
        }

        updateSheetWithCounts(dailySheet, orderDailyCounts);
        updateSheetWithCounts(monthlySheet, orderMonthlyCounts);
    }

    private void updateSheetWithCounts(Sheet sheet, Map<String, Map<String, List<OrderItemData>>> orderCounts) {
        for (Map.Entry<String, Map<String, List<OrderItemData>>> entry : orderCounts.entrySet()) {
            String dateOrMonth = entry.getKey();
            Map<String, List<OrderItemData>> productMap = entry.getValue();
            for (Map.Entry<String, List<OrderItemData>> productEntry : productMap.entrySet()) {
                String productId = productEntry.getKey();
                List<OrderItemData> orders = productEntry.getValue();
                int totalQuantity = 0;
                BigDecimal totalAmount = BigDecimal.ZERO;
                for (OrderItemData order : orders) {
                    totalQuantity += order.getQuantity();
                    totalAmount = totalAmount.add(order.getAmount());
                }
                boolean found = false;
                for (Row row : sheet) {
                    if (row.getCell(0).getStringCellValue().equals(dateOrMonth)
                            && row.getCell(1).getStringCellValue().equals(productId)) {
                        int existingQuantity = (int) row.getCell(3).getNumericCellValue();
                        BigDecimal existingAmount = BigDecimal.valueOf(row.getCell(4).getNumericCellValue());
                        row.getCell(3).setCellValue(existingQuantity + totalQuantity);
                        row.getCell(4).setCellValue(existingAmount.add(totalAmount).doubleValue());
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    int rowNum = sheet.getLastRowNum() + 1;
                    Row newRow = sheet.createRow(rowNum);
                    newRow.createCell(0).setCellValue(dateOrMonth);
                    newRow.createCell(1).setCellValue(productId);
                    newRow.createCell(2).setCellValue(orders.get(0).getProductName());
                    newRow.createCell(3).setCellValue(totalQuantity);
                    newRow.createCell(4).setCellValue(totalAmount.doubleValue());
                }
            }
        }
    }    
}
