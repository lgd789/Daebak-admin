import React, { useState } from "react";

import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import DataTable from "examples/Tables/DataTable";

import RefreshIcon from "@mui/icons-material/Refresh";
import { IconButton } from "@mui/material";

import { couponTableData } from "./data/couponTableData";
import { CouponDialog } from "../../couponAdd";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoupons } from "reducers/slices/couponSlice";

export const CouponTable = () => {
  const dispatch = useDispatch();
  const [pageIndex, setPageIndex] = useState(0);
  const [showAddCoupon, setShowAddCoupon] = useState(false);

  const { columns: couponColumns, rows: couponRows } = couponTableData();

  const handleCloseDialog = () => {
    setShowAddCoupon(!showAddCoupon);
  };

  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  const handleRefresh = () => {
    dispatch(fetchCoupons())
      .then(() => {
        console.log("저장 성공");
      })
      .catch((error) => {
        console.error("저장 실패:", error);
      });
  };

  return (
    <Grid item xs={12}>
      <Card>
        <MDBox
          mx={2}
          mt={-3}
          py={3}
          px={2}
          variant="gradient"
          bgColor="error"
          borderRadius="lg"
          coloredShadow="error"
        >
          <MDTypography variant="h5" color="white">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>쿠폰</span>
              <div>
                <MDButton variant="h2" color="white" onClick={() => setShowAddCoupon(true)}>
                  추가
                </MDButton>
                <IconButton color="white" onClick={handleRefresh}>
                  <RefreshIcon />
                </IconButton>
              </div>
            </div>
          </MDTypography>
        </MDBox>
        <MDBox pt={3}>
          <DataTable
            table={{ columns: couponColumns, rows: couponRows }}
            isSorted={false}
            entriesPerPage={false}
            showTotalEntries={false}
            noEndBorder
            defaultPage={pageIndex}
            onPageChange={handlePageChange}
          />
        </MDBox>
      </Card>
      <CouponDialog isOpen={showAddCoupon} onClose={handleCloseDialog} />
    </Grid>
  );
};
