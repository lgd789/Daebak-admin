import React, { useState } from "react";
import PropTypes from "prop-types";
import { Autocomplete, TextField, Button } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import MDInput from "components/MDInput";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDProgress from "components/MDProgress";

import DataTable from "examples/Tables/DataTable";
import { ProductInfo } from "./component/productInfo";
import { ProductCategory } from "./component/productCategory";
import { ProductSubInfo } from "./component/productSubInfo";
import { fetchAddProduct } from "reducers/slices/productSlice";
import { useDispatch } from "react-redux";
import { ProductOption } from "./component/productOption";

export const ProductAdd = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [productCategory, setProductCategory] = useState("");
  const [productInfo, setProductInfo] = useState("");
  const [productSubInfo, setProductSubInfo] = useState("");
  const [options, setOptions] = useState([]);

  const handleDialogSubmit = () => {
    const formData = new FormData();
    formData.append("image", productInfo.image);
    formData.append("name", productInfo.name);
    formData.append("regularPrice", productInfo.regularPrice);
    formData.append("salePrice", productInfo.salePrice);
    formData.append("description", productInfo.description);
    formData.append("stockQuantity", productInfo.stockQuantity);
    formData.append("shippingCost", productInfo.shippingCost);
    formData.append("maxQuantityPerDelivery", productInfo.maxQuantityPerDelivery);
    formData.append("category", productCategory.childId);

    options.forEach((option, index) => {
      formData.append(`options[${index}].name`, option.name);
      formData.append(`options[${index}].addPrice`, option.addPrice);
    });

    formData.append("detailImage", productSubInfo);
    console.log(productSubInfo);
    console.log(productInfo.image);

    dispatch(fetchAddProduct(formData))
      .then(() => {
        console.log("저장 성공");
        onClose();
      })
      .catch((error) => {
        console.error("저장 실패:", error);
      });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth={true} maxWidth={"xl"}>
      <DialogTitle>상품 등록</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
        <ProductCategory setRowData={setProductCategory} />
        <ProductInfo rowData={productInfo} setRowData={setProductInfo} />
        <ProductOption rowData={options} setRowData={setOptions} />
        <ProductSubInfo rowData={productSubInfo} setRowData={setProductSubInfo} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={handleDialogSubmit}>저장</Button>
      </DialogActions>
    </Dialog>
  );
};

ProductAdd.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
