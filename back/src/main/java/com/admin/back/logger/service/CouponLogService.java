package com.admin.back.logger.service;

import java.util.List;

import org.apache.poi.ss.usermodel.Workbook;

import com.admin.back.logger.dto.CouponData;
import com.admin.back.logger.dto.CouponErrorData;

public interface CouponLogService {
    public void appendInfoCouponData(Workbook workbook, List<CouponData> coupons, String sheetName);
    public void appendErrorCouponData(Workbook workbook, List<CouponErrorData> coupons, String sheetName);
    public CouponData findInfo(String logMessage, String messageIdentifier);
    public CouponErrorData findError(String logMessage, String messageIdentifier);
}
