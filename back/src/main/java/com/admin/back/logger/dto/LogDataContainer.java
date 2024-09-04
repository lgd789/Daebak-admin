package com.admin.back.logger.dto;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class LogDataContainer {
    private List<LoginData> logins = new ArrayList<>();
    private List<LoginData> registrations = new ArrayList<>();
    private List<OrderItemData> orderItems = new ArrayList<>();
    private List<OrderItemData> cancelItems = new ArrayList<>();
    private List<OrderData> orders = new ArrayList<>();
    private List<OrderData> cancels = new ArrayList<>();
    private List<CouponData> coupns = new ArrayList<>();
    private List<PointData> points = new ArrayList<>();
    private List<ProductData> productClicks = new ArrayList<>();
    private List<SearchData> searchs = new ArrayList<>();
    private List<SearchData> categories = new ArrayList<>();
}
