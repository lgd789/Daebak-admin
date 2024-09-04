/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React, { useState } from "react";
import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { Box, Button } from "@mui/material";
import Card from "@mui/material/Card";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useMaterialUIController } from "context";
import BillingInfoPanel from "./panel/billingInfoPanel";
import statusStyles from "../../constants/statusStyles";
import statusText from "../../constants/statusText";

function Bill({
  id,
  memberName,
  impUid,
  orderNumber,
  orderDate,
  trackingNumber,
  mid,
  status,
  noGutter,
}) {
  const [showDetail, setShowDetail] = useState(false);
  const [showAllItems, setShowAllItems] = useState(false);

  const storeId = "store-a49dfa1c-73fe-40b5-996f-363d0b0fa9af";

  const toggleDetail = () => {
    setShowDetail(!showDetail);
  };

  const toggleAllItems = () => {
    setShowAllItems(!showAllItems);
  };

  const handleCancelPayment = () => {
    const url = `https://admin.portone.io/payments?paymentId=${mid}&storeId=${storeId}&tab=PAYMENT`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <>
      <MDBox
        component="li"
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        bgColor={darkMode ? "transparent" : "grey-100"}
        borderRadius="lg"
        p={3}
        mb={noGutter ? 0 : 1}
        mt={2}
      >
        <MDBox width="100%" display="flex" flexDirection="column">
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            flexDirection={{ xs: "column", sm: "row" }}
            mb={2}
          >
            <MDBox>
              <MDTypography variant="button" fontWeight="medium">
                {id}:&nbsp;&nbsp;&nbsp;
                {memberName}
              </MDTypography>
              <MDBox
                paddingX={1}
                marginX={2}
                borderRadius="lg"
                display={"inline-block"}
                bgColor={statusStyles[status].backgroundColor}
              >
                <MDTypography
                  variant="caption"
                  color={statusStyles[status].color}
                  fontWeight="bold"
                  verticalAlign="middle"
                >
                  {statusText[status]}
                </MDTypography>
              </MDBox>
            </MDBox>
            <MDBox
              display="flex"
              alignItems="center"
              mt={{ xs: 2, sm: 0 }}
              ml={{ xs: -1.5, sm: 0 }}
            >
              {!trackingNumber && status === "paid" && (
                <MDBox mr={1}>
                  <MDButton variant="text" color="info">
                    <Icon>local_shipping</Icon>&nbsp;운송장 번호 등록
                  </MDButton>
                </MDBox>
              )}
              <MDButton variant="text" color={darkMode ? "white" : "dark"} onClick={toggleDetail}>
                <Icon>edit</Icon>&nbsp;상세 정보 보기
              </MDButton>
              <MDBox mr={1}>
                <MDButton variant="text" color="error" onClick={handleCancelPayment}>
                  <Icon>delete</Icon>&nbsp;결제 취소
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
          <MDBox mb={2} lineHeight={0}>
            <MDTypography variant="caption" color="text">
              포트원 거래번호:&nbsp;&nbsp;&nbsp;
              <MDTypography variant="caption" fontWeight="medium">
                {impUid}
              </MDTypography>
            </MDTypography>
          </MDBox>
          <MDBox mb={1} lineHeight={0}>
            <MDTypography variant="caption" color="text">
              주문 번호:&nbsp;&nbsp;&nbsp;
              <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                {orderNumber}
              </MDTypography>
            </MDTypography>
          </MDBox>
          <MDBox mb={2} lineHeight={0}>
            <MDTypography variant="caption" color="text">
              주문 날짜:&nbsp;&nbsp;&nbsp;
              <MDTypography variant="caption" fontWeight="medium">
                {orderDate}
              </MDTypography>
            </MDTypography>
          </MDBox>
          {trackingNumber && (
            <MDBox mb={1} lineHeight={0}>
              <MDTypography variant="caption" color="text">
                운송장 번호:&nbsp;&nbsp;&nbsp;
                <MDTypography variant="caption" fontWeight="medium">
                  {trackingNumber}
                </MDTypography>
              </MDTypography>
            </MDBox>
          )}
        </MDBox>
      </MDBox>
      {showDetail && (
        <BillingInfoPanel showDetail={showDetail} toggleDetail={toggleDetail} impUid={impUid} />
      )}
    </>
  );
}

Bill.defaultProps = {
  noGutter: false,
};

Bill.propTypes = {
  id: PropTypes.string.isRequired,
  memberName: PropTypes.string.isRequired,
  impUid: PropTypes.string.isRequired,
  orderNumber: PropTypes.string.isRequired,
  orderDate: PropTypes.string.isRequired,
  trackingNumber: PropTypes.string,
  mid: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
};

export default Bill;
