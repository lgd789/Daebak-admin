import React, { useEffect, useState } from "react";
import axios from "axios";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import { CategoryAdd } from "layouts/categoryAdd";

import { ProductByCategoryTable } from "./ProductByCategoryTable";
import { CategoriesTableData } from "./data/categoriesTableData";
import RefreshIcon from "@mui/icons-material/Refresh";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchCategories } from "reducers/slices/categorySlice";

function CategoryTable() {
  const dispatch = useDispatch();
  const [clickedCategories, setClickedCategories] = useState([]);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const handleCloseCategory = () => {
    setShowAddCategory(!showAddCategory);
  };

  const handleRefresh = () => {
    dispatch(fetchCategories())
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
            <MDTypography variant="h6" color="white">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>상품 카테고리 ( 상위 )</span>
                <div>
                  <MDButton variant="h2" color="white" onClick={() => setShowAddCategory(true)}>
                    추가
                  </MDButton>
                  <IconButton color="white" onClick={handleRefresh}>
                    <RefreshIcon />
                  </IconButton>
                </div>
              </div>
            </MDTypography>
          </MDBox>
          <MDBox p={3}>
            <CategoriesTableData
              clickedCategories={clickedCategories}
              setClickedCategories={setClickedCategories}
            />
          </MDBox>
        </Card>
      </Grid>
      {clickedCategories.map((clickedCategory) => (
        <Grid key={clickedCategory.id} item xs={12}>
          <ProductByCategoryTable category={clickedCategory} />
        </Grid>
      ))}
      {showAddCategory && <CategoryAdd isOpen={true} onClose={handleCloseCategory} />}
    </>
  );
}

export default CategoryTable;
