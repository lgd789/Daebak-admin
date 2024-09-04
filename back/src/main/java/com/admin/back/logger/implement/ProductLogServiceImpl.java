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

import com.admin.back.logger.dto.LoginData;
import com.admin.back.logger.dto.OrderData;
import com.admin.back.logger.dto.ProductData;
import com.admin.back.logger.service.ProductLogService;

@Service
public class ProductLogServiceImpl implements ProductLogService{
    private static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd");
    private static final SimpleDateFormat MONTH_FORMAT = new SimpleDateFormat("yyyy-MM");

    private String[] productLogHeaders = { "Date", "Message", "Product Id", "Product Name"};
    private String[] productLogStatisticsHeaders = { "Date", "Product Id", "Count"};

    private Pattern createInfoLogPattern(String messageIdentifier) {
        String patternString = String.format(
            "(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}) INFO .* - %s - Message: (.*), Product Id: (\\d+), Product Name: (.*)",
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
    public void appendInfoProductData(Workbook workbook, List<ProductData> products, String sheetName) {
        Sheet sheet = getOrCreateSheet(workbook, sheetName, productLogHeaders);
        int rowNum = sheet.getLastRowNum() + 1;

        for (ProductData product : products) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(product.getDate());
            row.createCell(1).setCellValue(product.getMessage());
            row.createCell(2).setCellValue(product.getProductId().longValue());
            row.createCell(3).setCellValue(product.getProductName());
        }
    }

    @Override
    public ProductData findInfo(String logMessage, String messageIdentifier) {
        Pattern pattern = createInfoLogPattern(messageIdentifier);
        Matcher matcher = pattern.matcher(logMessage);

        if (matcher.find()) {
            return new ProductData(
                matcher.group(1),
                matcher.group(2), 
                Long.parseLong(matcher.group(3)),
                matcher.group(4)
            );
        }

        return null;
    }

    @Override
    public void updateProductStatistics(Workbook workbook, Workbook workbookMonthlyStatistic,
                                        List<ProductData> productOrders, String sheetName) {
        Sheet dailySheet = getOrCreateSheet(workbook, sheetName, productLogStatisticsHeaders);
        Sheet monthlySheet = getOrCreateSheet(workbookMonthlyStatistic, sheetName, productLogStatisticsHeaders);
    
        Map<String, Map<Long, Integer>> productDailyCounts = new HashMap<>();
        Map<String, Map<Long, Integer>> productMonthlyCounts = new HashMap<>();
    
        for (ProductData productOrder : productOrders) {
            try {
                Date date = DATE_FORMAT.parse(productOrder.getDate());
    
                String formattedDate = DATE_FORMAT.format(date);
                String formattedMonth = MONTH_FORMAT.format(date);
                Long productId = productOrder.getProductId();
    
                // 일별 통계 업데이트
                productDailyCounts.putIfAbsent(formattedDate, new HashMap<>());
                Map<Long, Integer> dailyCounts = productDailyCounts.get(formattedDate);
                dailyCounts.merge(productId, 1, Integer::sum);
    
                // 월별 통계 업데이트
                productMonthlyCounts.putIfAbsent(formattedMonth, new HashMap<>());
                Map<Long, Integer> monthlyCounts = productMonthlyCounts.get(formattedMonth);
                monthlyCounts.merge(productId, 1, Integer::sum);
    
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
    
        updateSheetWithCounts(dailySheet, productDailyCounts);
        updateSheetWithCounts(monthlySheet, productMonthlyCounts);
    }
    
    private void updateSheetWithCounts(Sheet sheet, Map<String, Map<Long, Integer>> counts) {
        for (Map.Entry<String, Map<Long, Integer>> entry : counts.entrySet()) {
            String dateOrMonth = entry.getKey();
            Map<Long, Integer> productCounts = entry.getValue();
            for (Map.Entry<Long, Integer> productEntry : productCounts.entrySet()) {
                Long productId = productEntry.getKey();
                int count = productEntry.getValue();
    
                boolean found = false;
                for (Row row : sheet) {
                    if (row.getCell(0).getStringCellValue().equals(dateOrMonth)
                            && Long.valueOf((long)row.getCell(1).getNumericCellValue()).equals(productId)) {
                        // 해당 상품 ID가 이미 시트에 있는 경우 주문 수를 증가시킵니다.
                        int existingCount = (int) row.getCell(2).getNumericCellValue();
                        row.getCell(2).setCellValue(existingCount + count);
                        found = true;
                        break;
                    }
                }
    
                if (!found) {
                    // 해당 상품 ID가 시트에 없는 경우 새로운 행을 생성하여 주문 수를 추가합니다.
                    int rowNum = sheet.getLastRowNum() + 1;
                    Row newRow = sheet.createRow(rowNum);
                    newRow.createCell(0).setCellValue(dateOrMonth);
                    newRow.createCell(1).setCellValue(productId);
                    newRow.createCell(2).setCellValue(count);
                }
            }
        }
    }
    

}
