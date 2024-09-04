import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Button, Drawer, Grid, Paper, styled, Typography } from "@mui/material";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { getBillingInfo } from "api/billing";
import statusText from "../../../constants/statusText";
import statusStyles from "layouts/billing/constants/statusStyles";

const InfoBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#fbfbfb",
  height: 45,
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  borderBottom: `2px solid ${theme.palette.grey[100]}`,
}));

const Label = styled(Typography)(({ theme }) => ({
  fontSize: "0.75rem", // 14px
  color: "#8c8c8c",
  fontWeight: "bold",
}));

const Value = styled(Typography)(({ theme }) => ({
  fontSize: "0.75rem", // 14px
}));

const InfoRow = ({ label, value, labelXs, valueXs, color }) => (
  <>
    <Grid item xs={labelXs}>
      <InfoBox>
        <Label>{label}</Label>
      </InfoBox>
    </Grid>
    <Grid item xs={valueXs}>
      <InfoBox sx={{ backgroundColor: "#fff" }}>
        <Value color={color}>{value}</Value>
      </InfoBox>
    </Grid>
  </>
);

const BillingInfoPanel = ({ showDetail, toggleDetail, impUid }) => {
  const [billingInfo, setBillingInfo] = useState(null);
  const [discountPoints, setDiscountPoints] = useState(0);
  const [discountCoupon, setDiscountCoupon] = useState(0);

  useEffect(() => {
    const fetchBillingInfo = async () => {
      try {
        const data = await getBillingInfo(impUid);

        setBillingInfo(data);
        if (data?.customData?.coupon?.discount) {
          setDiscountPoints(data.customData?.coupon?.discount);
        }
        if (data?.customData?.points) {
          setDiscountCoupon(data.customData?.points);
        }
      } catch (error) {
        console.error("Error fetching billing info:", error);
      }
    };

    if (impUid) {
      fetchBillingInfo();
    }
  }, [impUid]);

  return (
    <Drawer
      anchor="right"
      open={showDetail}
      onClose={toggleDetail}
      PaperProps={{
        sx: {
          width: 650, // 패널의 가로 크기
          backgroundColor: "#fff", // 배경색
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", // 그림자
        },
      }}
    >
      <Box px={5} pt={5} borderBottom={1} borderColor={"grey.300"}>
        <MDTypography variant="h5" color="inherit">
          결제 내역 상세
        </MDTypography>
        <Box mt={2} borderBottom={2} width={"10%"}>
          <MDTypography variant="button" color="inherit" fontWeight="bold">
            상세정보
          </MDTypography>
        </Box>
      </Box>
      <Box px={5} pb={5} pt={2}>
        <MDTypography variant="button" color="inherit" fontWeight="bold">
          고객정보
        </MDTypography>
        <Grid container>
          <InfoRow label="이름" value={billingInfo?.buyerName} labelXs={3} valueXs={3} />
          <InfoRow label="전화번호" value={billingInfo?.buyerTel} labelXs={3} valueXs={3} />
          <InfoRow label="이메일" value={billingInfo?.buyerEmail} labelXs={3} valueXs={9} />
          <InfoRow label="주소" value={billingInfo?.buyerAddr} labelXs={3} valueXs={9} />
        </Grid>
        <Box py={2}>
          <MDTypography variant="button" color="inherit" fontWeight="bold">
            결제정보
          </MDTypography>
        </Box>
        <Box p={2} border={1} borderColor={"grey.300"} borderRadius={2}>
          <MDTypography variant="body2" color="inherit" fontWeight="bold">
            {billingInfo?.itemName}
          </MDTypography>
          <Typography variant="caption" display="block" color={"#bfbfbf"} fontWeight="bold">
            {new Date(billingInfo?.paymentTime * 1000).toLocaleString()}
          </Typography>
          {billingInfo?.status === "cancelled" && (
            <Typography variant="caption" display="block" color={"#ff0000"} fontWeight="bold">
              취소 시간: {billingInfo?.cancelledTime}
            </Typography>
          )}
          <Grid container py={1}>
            <InfoRow
              label="상세상태"
              value={statusText[billingInfo?.status] || billingInfo?.status}
              labelXs={3}
              valueXs={9}
              color={statusStyles[billingInfo?.status]?.colorHex || "#16b079"}
            />
            <InfoRow label="포트원 거래번호	" value={impUid} labelXs={3} valueXs={9} />
            <InfoRow label="결제수단" value={billingInfo?.paymentMethod} labelXs={3} valueXs={9} />
            <InfoRow
              label="총 결제금액"
              value={`${billingInfo?.amount.toLocaleString()}원`}
              labelXs={3}
              valueXs={9}
              color={"#1A73E8"}
            />
            <InfoRow
              label="주문금액"
              value={`${(billingInfo?.amount + (discountCoupon + discountPoints)).toLocaleString()}원`}
              labelXs={3}
              valueXs={9}
            />
            <InfoRow
              label="할인금액"
              value={`-${(discountCoupon + discountPoints).toLocaleString()}원`}
              labelXs={3}
              valueXs={9}
              color={"#f44335"}
            />
            <InfoRow label="상점아이디" value={billingInfo?.storeId} labelXs={3} valueXs={9} />
            <InfoRow label="결제대행사" value={billingInfo?.pgProvider} labelXs={3} valueXs={9} />
            <InfoRow
              label="결제대행사 승인번호"
              value={billingInfo?.pgApprovalNumber}
              labelXs={3}
              valueXs={9}
            />
            <InfoRow
              label="결제환경"
              value={billingInfo?.paymentEnvironment}
              labelXs={3}
              valueXs={9}
            />
          </Grid>
        </Box>
        <Box py={2}>
          <MDTypography variant="button" color="inherit" fontWeight="bold">
            상세 품목
          </MDTypography>
        </Box>
        <Box p={2} border={1} borderColor={"grey.300"} borderRadius={2}>
          {billingInfo?.customData?.orderItems.map((item, index) => {
            const regularPrice = item.cartItem.product.regularPrice * item.cartItem.quantity;
            const salePrice = item.cartItem.product.salePrice * item.cartItem.quantity;
            const shippingCost = item.cartItem.product.shippingCost * item.cartItem.boxCnt;
            const totalPrice = regularPrice - salePrice + shippingCost;

            return (
              <Box key={index} py={1}>
                <MDTypography variant="caption" color="inherit" fontWeight="bold">
                  품목 {index + 1}
                </MDTypography>
                <Grid container py={1}>
                  <InfoRow
                    label="품목 명"
                    value={`${item.cartItem.product.name} ${item.cartItem.option.name} * ${item.cartItem.quantity}`}
                    labelXs={3}
                    valueXs={9}
                  />
                  <InfoRow
                    label="총 금액"
                    value={`${totalPrice.toLocaleString()}원`}
                    labelXs={3}
                    valueXs={9}
                    color={"#4CAF50"}
                  />
                  <InfoRow
                    label="소비자 가격"
                    value={`${regularPrice.toLocaleString()}원`}
                    labelXs={3}
                    valueXs={9}
                  />
                  <InfoRow
                    label="할인"
                    value={`-${salePrice.toLocaleString()}원`}
                    labelXs={3}
                    valueXs={9}
                  />
                  <InfoRow
                    label="배송 비"
                    value={`${shippingCost.toLocaleString()}원`}
                    labelXs={3}
                    valueXs={9}
                  />
                </Grid>
              </Box>
            );
          })}
        </Box>
        {discountCoupon || discountPoints ? (
          <>
            <Box py={2}>
              <MDTypography variant="button" color="inherit" fontWeight="bold">
                할인 ( 포인트 및 쿠폰 ) 정보
              </MDTypography>
            </Box>
            <Box p={2} border={1} borderColor={"grey.300"} borderRadius={2}>
              <Grid container py={1}>
                {discountCoupon && (
                  <InfoRow
                    label="쿠폰 할인"
                    value={`-${discountCoupon}`}
                    labelXs={3}
                    valueXs={9}
                    color={"#f44335"}
                  />
                )}
                {discountPoints && (
                  <InfoRow
                    label="포인트 할인"
                    value={`-${discountPoints}`}
                    labelXs={3}
                    valueXs={9}
                    color={"#f44335"}
                  />
                )}
              </Grid>
            </Box>
          </>
        ) : (
          <></>
        )}
        <Box py={2} display={"flex"} justifyContent={"space-between"}>
          <MDButton variant="contained" color="light">
            새로고침
          </MDButton>
          <MDButton variant="contained" color="info" onClick={toggleDetail}>
            확인
          </MDButton>
        </Box>
      </Box>
    </Drawer>
  );
};

BillingInfoPanel.propTypes = {
  showDetail: PropTypes.bool.isRequired,
  toggleDetail: PropTypes.func.isRequired,
  impUid: PropTypes.string.isRequired,
};

InfoRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  labelXs: PropTypes.number.isRequired,
  valueXs: PropTypes.number.isRequired,
  color: PropTypes.string,
};

export default BillingInfoPanel;
