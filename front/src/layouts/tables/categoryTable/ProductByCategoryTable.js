import React from "react";

import PropTypes from "prop-types";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DataTable from "examples/Tables/DataTable";

import productByCategoryTableData from "layouts/tables/productTable/productAllTable/data/ProductAllData";

export const ProductByCategoryTable = ({ category }) => {
  const { columns: productsColumns, rows: productsRows } = productByCategoryTableData(category);

  return (
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
            <span>{category.name}</span>
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
        />
      </MDBox>
    </Card>
  );
};

ProductByCategoryTable.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
};
