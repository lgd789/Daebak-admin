/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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
import { Menu, MenuItem, IconButton, Button } from "@mui/material";

import { MoreVert } from "@mui/icons-material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Images
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ProductDealsEditDialog } from "../dialog/productDealsEditDialog";
import { fetchDeleteDealProduct } from "reducers/slices/dealProductSlice";

export default function data() {
  const { dealProducts } = useSelector((state) => state.dealProducts);
  const dispatch = useDispatch();
  const [dialogAnchorEl, setDialogAnchorEl] = useState(0);
  const [anchorEls, setAnchorEls] = useState(Array(dealProducts.length).fill(null));
  const [dialogs, setDialogs] = useState(Array(dealProducts.length).fill(false));
  const [dialogType, setDialogType] = useState(null);

  const [rowData, setRowData] = useState(dealProducts[0]);

  const handleClick = (event, index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = event.currentTarget;
    setAnchorEls(newAnchorEls);
    setDialogAnchorEl(index);

    setRowData(dealProducts[index]);
  };

  const handleClose = () => {
    setAnchorEls(Array(dealProducts.length).fill(null));
  };

  const handleDialog = (type) => {
    setDialogType(type);
    setDialogs((prevState) => ({
      ...prevState,
      [dialogAnchorEl]: true,
    }));
    handleClose();
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      `"${rowData.product.name}" 타임 특가를 정말로 삭제하시겠습니까?`
    );
    if (confirmDelete) {
      dispatch(fetchDeleteDealProduct(rowData))
        .then(() => {
          console.log("저장 성공");
        })
        .catch((error) => {
          console.error("저장 실패:", error);
        });
    }
  };

  const handleDialogClose = () => {
    setDialogType(null);
    setDialogs((prevState) => ({
      ...prevState,
      [dialogAnchorEl]: false,
    }));
    setDialogAnchorEl(null);
  };

  const Product = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" variant="rounded" />
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  const dataColumns = [
    { Header: "상품", accessor: "product", align: "left" },
    { Header: "현재가", accessor: "regularPrice", align: "center" },
    { Header: "추가 할인", accessor: "dealPrice", align: "center" },
    { Header: "최종가", accessor: "finalPrice", align: "center" },
    { Header: "시작 시간", accessor: "startDate", align: "center" },
    { Header: "종료 시간", accessor: "endDate", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ];

  const dataRows = dealProducts.map((data, index) => ({
    product: <Product image={data.product.imageUrl} name={data.product.name} />,
    regularPrice: `${(data.product.regularPrice - data.product.salePrice).toLocaleString()}원`,
    dealPrice: `${data.dealPrice.toLocaleString()}원`,
    finalPrice: `${(data.product.regularPrice - data.product.salePrice - data.dealPrice).toLocaleString()}원`,
    startDate: new Date(data.startDate).toLocaleString(),
    endDate: new Date(data.endDate).toLocaleString(),
    action: (
      <>
        <IconButton
          aria-label="more"
          onClick={(e) => {
            handleClick(e, index);
          }}
        >
          <MoreVert />
        </IconButton>
        <Menu anchorEl={anchorEls[index]} open={Boolean(anchorEls[index])} onClose={handleClose}>
          <MenuItem onClick={() => handleDialog("edit")}>수정</MenuItem>
          <MenuItem onClick={handleDelete}>삭제</MenuItem>
        </Menu>
        {dialogType === "edit" && dialogs[index] && rowData && (
          <ProductDealsEditDialog
            rowData={rowData}
            setRowData={setRowData}
            isOpen={dialogType === "edit" && dialogs[index]}
            onClose={handleDialogClose}
          />
        )}
      </>
    ),
  }));

  return {
    columns: dataColumns,

    rows: dataRows,
  };
}
