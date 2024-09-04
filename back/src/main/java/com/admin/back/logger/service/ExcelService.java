package com.admin.back.logger.service;

import java.io.IOException;
import java.util.List;

import org.apache.poi.ss.usermodel.Workbook;

import com.admin.back.logger.dto.LogDataContainer;

public interface ExcelService {
    public Workbook readWorkbook(String filePath) throws IOException;
    public void writeWorkbook(Workbook workbook, String filePath) throws IOException;
    public void appendDataToSheet(Workbook workbook, LogDataContainer logData);
    public void processLogs(String path) throws IOException;
}
