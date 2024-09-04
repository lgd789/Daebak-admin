import { ProductAdd } from "layouts/productAdd";
import { React, useState } from "react";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";
import RefreshIcon from "@mui/icons-material/Refresh";
import { IconButton } from "@mui/material";

import ProductAllData from "./data/ProductAllData";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "reducers/slices/productSlice";

export const ProductAllTable = () => {
  const dispatch = useDispatch();
  const [pageIndex, setPageIndex] = useState(0);
  const [showProduct, setShowProduct] = useState(false);

  const { columns: productsColumns, rows: productsRows } = ProductAllData();

  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  const handleAddProduct = () => {
    setShowProduct(!showProduct);
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
    <>
      <Grid item xs={12}>
        <Card>
          <MDBox
            mx={2}
            mt={-3}
            py={3}
            px={2}
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
          >
            <MDTypography variant="h5" color="white">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>모든 상품</span>
                <div>
                  <MDButton variant="h2" color="white" onClick={handleAddProduct}>
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
              table={{ columns: productsColumns, rows: productsRows }}
              isSorted={true}
              entriesPerPage={true}
              pagination={{ variant: "gradient", color: "info" }}
              showTotalEntries={true}
              canSearch={true}
              noEndBorder
              defaultPage={pageIndex}
              onPageChange={handlePageChange}
            />
          </MDBox>
        </Card>
      </Grid>
      {showProduct && <ProductAdd isOpen={true} onClose={handleAddProduct} />}
    </>
  );
};
