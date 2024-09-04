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

// @mui material components
import React, { useState } from "react";
import * as XLSX from "xlsx";

import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Billing page components
import Bill from "layouts/billing/components/Bill";
import MDPagination from "components/MDPagination";
import Icon from "@mui/material/Icon";
import { Alert, Checkbox, FormControlLabel, FormGroup, IconButton, Snackbar } from "@mui/material";
import { useSelector } from "react-redux";
import Loading from "components/Loading";
import statusText from "layouts/billing/constants/statusText";
import MDButton from "components/MDButton";
import { refreshStatus } from "api/paymentDeatil/refreshStatus";
import store from "reducers/store";
import { fetchPaymentDetails } from "reducers/slices/paymentDetailSlice";
import { getBillingInfos } from "api/billing";

function BillingInformation() {
  const [currentPage, setCurrentPage] = useState(1);
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    color: "success",
  });

  const itemsPerPage = 5; // 한 페이지에 보여줄 항목 수

  const { paymentDetails, status } = useSelector((state) => state.paymentDetails);

  const statusKeys = Object.keys(statusText);
  const trackingOptions = [
    { value: true, label: "운송장 번호 등록" },
    { value: false, label: "운송장 번호 미등록" },
  ];

  const [filterOptions, setFilterOptions] = useState({
    status: statusKeys.reduce((acc, key) => ({ ...acc, [key]: true }), {}),
    tracking: trackingOptions.reduce((acc, option) => ({ ...acc, [option.value]: true }), {}),
  });

  const handleCheckboxChange = (category, value) => {
    setFilterOptions((prevState) => ({
      ...prevState,
      [category]: {
        ...prevState[category],
        [value]: !prevState[category][value],
      },
    }));
  };

  const filteredBillingInfos = paymentDetails.filter((info) => {
    const isMatchingStatus = filterOptions.status[info.status];
    const isMatchingTracking = filterOptions.tracking[info.trackingNumber !== null];
    return isMatchingStatus && isMatchingTracking;
  });

  // 현재 페이지의 데이터 계산
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = filteredBillingInfos.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(
      Math.max(1, Math.min(page, Math.ceil(filteredBillingInfos.length / itemsPerPage)))
    );
  };

  const getPaginationItems = () => {
    const totalPages = Math.ceil(filteredBillingInfos.length / itemsPerPage);
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);

    return [...Array(endPage - startPage + 1).keys()].map((index) => startPage + index);
  };

  const handleLastPageClick = () => {
    const totalPages = Math.ceil(filteredBillingInfos.length / itemsPerPage);
    setCurrentPage(totalPages);
  };

  const handleSnacbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarState({
      ...snackbarState,
      open: false,
    });
  };

  const handleRefreshStatus = async () => {
    let message = "";
    let color = "";
    try {
      await refreshStatus();
      store.dispatch(fetchPaymentDetails());
      message = "결제 상태 Refresh에 성공하였습니다!";
      color = "success";
    } catch (error) {
      console.error("Error refreshing payment status:", error);
      message = "결제 상태 Refresh에 실패하였습니다.";
      color = "error";
    } finally {
      setSnackbarState({
        open: true,
        message: message,
        color: color,
      });
    }
  };

  const handleExportToExcel = async () => {
    const impUids = filteredBillingInfos.map((info) => info.impUid);
    try {
      const data = await getBillingInfos(impUids);

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "결제 정보");

      // 엑셀 파일 다운로드
      XLSX.writeFile(workbook, "PaymentDetails.xlsx");
    } catch (error) {
      console.error("Error Export To Excel:", error);
    }
  };

  if (status === "loading") {
    console.log("paymentDetails is loading ...");
    return <Loading />;
  }

  return (
    <Card>
      <MDBox pt={3} px={2}>
        <MDBox display="flex" justifyContent="space-between">
          <MDTypography variant="h6" fontWeight="medium">
            결제 정보
          </MDTypography>
          <MDBox>
            <IconButton onClick={handleExportToExcel}>
              <Icon color="success">sim_card_download_icon</Icon>
            </IconButton>
            <MDButton variant="contained" color="light" onClick={handleRefreshStatus}>
              <Icon>refresh</Icon>&nbsp;결제 상태
            </MDButton>
          </MDBox>
          <Snackbar open={snackbarState.open} autoHideDuration={2000} onClose={handleSnacbarClose}>
            <Alert
              onClose={handleSnacbarClose}
              severity={snackbarState.color}
              variant="filled"
              sx={{ width: "100%", fontSize: "0.875rem", color: "#fff" }}
            >
              {snackbarState.message}
            </Alert>
          </Snackbar>
        </MDBox>
        <FormGroup row>
          {statusKeys.map((key) => (
            <FormControlLabel
              key={key}
              control={
                <Checkbox
                  color="primary"
                  checked={filterOptions.status[key]}
                  onChange={() => handleCheckboxChange("status", key)}
                />
              }
              label={statusText[key]}
            />
          ))}
        </FormGroup>
        <FormGroup row>
          {trackingOptions.map((option) => (
            <FormControlLabel
              key={option.value}
              control={
                <Checkbox
                  color="primary"
                  checked={filterOptions.tracking[option.value]}
                  onChange={() => handleCheckboxChange("tracking", option.value)}
                />
              }
              label={option.label}
            />
          ))}
        </FormGroup>
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {currentPageData.map((billingInfo, index) => (
            <Bill
              key={index}
              id={billingInfo.id}
              memberName={billingInfo.memberName}
              impUid={billingInfo.impUid}
              orderNumber={billingInfo.orderNumber}
              orderDate={billingInfo.orderDate}
              trackingNumber={billingInfo.trackingNumber}
              mid={billingInfo.mid}
              status={billingInfo.status}
            />
          ))}
        </MDBox>
      </MDBox>
      <MDPagination>
        <MDPagination item onClick={() => handlePageChange(1)}>
          <Icon>first_page</Icon>
        </MDPagination>
        <MDPagination item onClick={() => handlePageChange(currentPage - 1)}>
          <Icon>keyboard_arrow_left</Icon>
        </MDPagination>
        {getPaginationItems().map((page) => (
          <MDPagination
            key={page}
            item
            active={page === currentPage}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </MDPagination>
        ))}

        <MDPagination item onClick={() => handlePageChange(currentPage + 1)}>
          <Icon>keyboard_arrow_right</Icon>
        </MDPagination>
        <MDPagination item onClick={handleLastPageClick}>
          <Icon>last_page</Icon>
        </MDPagination>
      </MDPagination>
    </Card>
  );
}

export default BillingInformation;
