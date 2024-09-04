import { React, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import RefreshIcon from "@mui/icons-material/Refresh";
import { IconButton } from "@mui/material";

import productBestData from "./data/productBestData";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "reducers/slices/productSlice";

export const ProductBestTable = () => {
  const dispatch = useDispatch();
  const [pageIndex, setPageIndex] = useState(0);

  const { columns: bestProductsColumns, rows: bestProductsRows } = productBestData();

  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  const handleRefresh = () => {
    dispatch(fetchProducts())
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
              <span>인기상품</span>
              <IconButton color="white" onClick={handleRefresh}>
                <RefreshIcon />
              </IconButton>
            </div>
          </MDTypography>
        </MDBox>
        <MDBox pt={3}>
          <DataTable
            table={{ columns: bestProductsColumns, rows: bestProductsRows }}
            isSorted={false}
            entriesPerPage={false}
            showTotalEntries={false}
            noEndBorder
            defaultPage={pageIndex}
            onPageChange={handlePageChange}
          />
        </MDBox>
      </Card>
    </Grid>
  );
};
