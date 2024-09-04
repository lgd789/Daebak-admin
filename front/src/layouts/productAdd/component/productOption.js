import React, { useState } from "react";

import PropTypes from "prop-types";

import Card from "@mui/material/Card";
import { IconButton } from "@mui/material";
import { RemoveCircle } from "@mui/icons-material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";

export const ProductOption = ({ rowData, setRowData }) => {
  const handleAddRow = () => {
    setRowData([...rowData, { name: "", addPrice: "" }]);
  };

  const handleDeleteRow = (index) => {
    const newOptions = [...rowData];
    newOptions.splice(index, 1);
    setRowData(newOptions);
  };

  const handleInputChange = (index, field, value) => {
    const newOptions = [...rowData];
    newOptions[index] = { ...newOptions[index], [field]: value };
    setRowData(newOptions);
  };

  const dataColumns = [
    { Header: "옵션명", accessor: "name", align: "left" },
    { Header: "추가 가격", accessor: "addPrice", align: "left" },
    { Header: "", accessor: "actions", align: "center" },
  ];

  const renderRows = () => {
    return rowData.map((row, index) => ({
      name: (
        <TextField
          value={row.name}
          onChange={(e) => handleInputChange(index, "name", e.target.value)}
          variant="outlined"
          fullWidth
        />
      ),
      addPrice: (
        <TextField
          type="number"
          value={row.addPrice}
          onChange={(e) => handleInputChange(index, "addPrice", e.target.value)}
          variant="outlined"
          fullWidth
        />
      ),
      actions: (
        <IconButton color="error" onClick={() => handleDeleteRow(index)}>
          <RemoveCircle />
        </IconButton>
      ),
    }));
  };

  return (
    <Card>
      <MDBox
        mx={2}
        py={3}
        px={2}
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="info"
      >
        <MDTypography variant="h6" color="white">
          상품 옵션
        </MDTypography>
      </MDBox>
      <MDBox pt={3}>
        <DataTable
          table={{
            columns: dataColumns,
            rows: renderRows(),
          }}
          isSorted={false}
          entriesPerPage={false}
          showTotalEntries={false}
        />
      </MDBox>
      <MDBox m={2} align="center">
        <Button onClick={handleAddRow}>옵션 추가</Button>
      </MDBox>
    </Card>
  );
};

ProductOption.propTypes = {
  rowData: PropTypes.array,
  setRowData: PropTypes.func.isRequired,
};
