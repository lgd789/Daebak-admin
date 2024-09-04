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
import com.admin.back.logger.dto.ProductData;
import com.admin.back.logger.dto.SearchData;
import com.admin.back.logger.service.SearchLogService;

@Service
public class SearchLogServiceImpl implements SearchLogService {
    private static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd");
    private static final SimpleDateFormat MONTH_FORMAT = new SimpleDateFormat("yyyy-MM");

    private String[] searchLogHeaders = { "Date", "Message", "Query"};
    private String[] searchStatisticsLogHeaders = { "Date", "Query", "Count"};

    private Pattern createInfoLogPattern(String messageIdentifier) {
        String patternString = String.format(
            "(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}) INFO .* - %s - Message: (.*), Search: (.*)",
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
    public void appendInfoSearchData(Workbook workbook, List<SearchData> searchs, String sheetName) {
        Sheet sheet = getOrCreateSheet(workbook, sheetName, searchLogHeaders);
        int rowNum = sheet.getLastRowNum() + 1;

        for (SearchData search : searchs) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(search.getDate());
            row.createCell(1).setCellValue(search.getMessage());
            row.createCell(2).setCellValue(search.getQuery());
           
        }
    }

    @Override
    public SearchData findInfo(String logMessage, String messageIdentifier) {
        Pattern pattern = createInfoLogPattern(messageIdentifier);
        Matcher matcher = pattern.matcher(logMessage);

        if (matcher.find()) {
            return new SearchData(
                matcher.group(1),
                matcher.group(2), 
                matcher.group(3)
            );
        }

        return null;
    }

    @Override
    public void updateSearchStatistics(Workbook workbook, Workbook workbookMonthlyStatistic, List<SearchData> searches, String sheetName) {
        Sheet dailySheet = getOrCreateSheet(workbook, sheetName, searchStatisticsLogHeaders);
        Sheet monthlySheet = getOrCreateSheet(workbookMonthlyStatistic, sheetName, searchStatisticsLogHeaders);
    
        Map<String, Map<String, Integer>> searchDailyCounts = new HashMap<>();
        Map<String, Map<String, Integer>> searchMonthlyCounts = new HashMap<>();
    
        for (SearchData search : searches) {
            try {
                Date date = DATE_FORMAT.parse(search.getDate());
                String formattedDate = DATE_FORMAT.format(date);
                String formattedMonth = MONTH_FORMAT.format(date);
                String query = search.getQuery();
    
                // 일별 통계 업데이트
                searchDailyCounts.putIfAbsent(formattedDate, new HashMap<>());
                Map<String, Integer> dailyCounts = searchDailyCounts.get(formattedDate);
                dailyCounts.merge(query, 1, Integer::sum);
    
                // 월별 통계 업데이트
                searchMonthlyCounts.putIfAbsent(formattedMonth, new HashMap<>());
                Map<String, Integer> monthlyCounts = searchMonthlyCounts.get(formattedMonth);
                monthlyCounts.merge(query, 1, Integer::sum);
    
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
    
        updateSheetWithCounts(dailySheet, searchDailyCounts);
        updateSheetWithCounts(monthlySheet, searchMonthlyCounts);
    }
    
    private void updateSheetWithCounts(Sheet sheet, Map<String, Map<String, Integer>> counts) {
        for (Map.Entry<String, Map<String, Integer>> entry : counts.entrySet()) {
            String dateOrMonth = entry.getKey();
            Map<String, Integer> queryCounts = entry.getValue();
            for (Map.Entry<String, Integer> queryEntry : queryCounts.entrySet()) {
                String query = queryEntry.getKey();
                int count = queryEntry.getValue();
    
                boolean found = false;
                for (Row row : sheet) {
                    if (row.getCell(0).getStringCellValue().equals(dateOrMonth)
                            && row.getCell(1).getStringCellValue().equals(query)) {
                        // 해당 검색어가 이미 시트에 있는 경우 검색 횟수를 증가시킵니다.
                        int existingCount = (int) row.getCell(2).getNumericCellValue();
                        row.getCell(2).setCellValue(existingCount + count);
                        found = true;
                        break;
                    }
                }
    
                if (!found) {
                    // 해당 검색어가 시트에 없는 경우 새로운 행을 생성하여 검색 횟수를 추가합니다.
                    int rowNum = sheet.getLastRowNum() + 1;
                    Row newRow = sheet.createRow(rowNum);
                    newRow.createCell(0).setCellValue(dateOrMonth);
                    newRow.createCell(1).setCellValue(query);
                    newRow.createCell(2).setCellValue(count);
                }
            }
        }
    }
}
