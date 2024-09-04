package com.admin.back.logger.service;

import java.util.List;
import org.apache.poi.ss.usermodel.Workbook;

import com.admin.back.logger.dto.ProductData;

public interface ProductLogService {
    public void appendInfoProductData(Workbook workbook, List<ProductData> products, String sheetName);
    public ProductData findInfo(String logMessage, String messageIdentifier);
    public void updateProductStatistics(Workbook workbook, Workbook workbookMonthlyStatistic, List<ProductData> products, String sheetName);
}