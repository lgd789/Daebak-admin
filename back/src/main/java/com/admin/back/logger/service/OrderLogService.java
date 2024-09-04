package com.admin.back.logger.service;

import java.util.List;

import org.apache.poi.ss.usermodel.Workbook;

import com.admin.back.logger.dto.OrderData;
import com.admin.back.logger.dto.OrderErrorData;

public interface OrderLogService {
    public void appendInfoOrderData(Workbook workbook, List<OrderData> orderItems, String sheetName);
    public void appendErrorOrderData(Workbook workbook, List<OrderErrorData> orderItems, String sheetName);
    public OrderData find(String logMessage, String messageIdentifier);
    public OrderErrorData findError(String logMessage, String messageIdentifier);
}
