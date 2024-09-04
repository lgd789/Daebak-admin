package com.admin.back.logger.service;

import java.util.List;
import org.apache.poi.ss.usermodel.Workbook;

import com.admin.back.logger.dto.SearchData;

public interface SearchLogService {
    public void appendInfoSearchData(Workbook workbook, List<SearchData> searchs, String sheetName);
    public SearchData findInfo(String logMessage, String messageIdentifier);
    public void updateSearchStatistics(Workbook workbook, Workbook workbookMonthlyStatistic, List<SearchData> searches, String sheetName);
}
