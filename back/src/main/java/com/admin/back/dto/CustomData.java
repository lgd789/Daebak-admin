package com.admin.back.dto;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomData {
    private List<OrderItem> orderItems;
    private int id;
    private String password;
    private int points;
    private Coupon coupon;

    @Getter
    @Setter
    public static class OrderItem {
        private int cartId;
        private CartItem cartItem;
    }

    @Getter
    @Setter
    public static class CartItem {
        private Product product;
        private Option option;
        private int quantity;
        private int boxCnt;
    }

    @Getter
    @Setter
    public static class Product {
        private int productId;
        private int category;
        private String name;
        private String imageUrl;
        private int stockQuantity;
        private int regularPrice;
        private int salePrice;
        private int shippingCost;
        private String description;
        private String arrivalDate;
        private Boolean recommended;
        private int maxQuantityPerDelivery;
        private String startDate;
        private String endDate;
    }

    @Getter
    @Setter
    public static class Option {
        private int optionId;
        private int productId;
        private String name;
        private int addPrice;
    }

    @Getter
    @Setter
    public static class Coupon {
        private int couponId;
        private String couponName;
        private int discount;
        private int minimumOrderAmount;
        private String issueDate;
        private String validUntil;
        private int id;
    }
}
