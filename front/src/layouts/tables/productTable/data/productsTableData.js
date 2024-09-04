import PropTypes from "prop-types";
import { Menu, MenuItem, IconButton, Button } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import { useEffect, useState } from "react";
import { ProductEditDialog } from "../dialog/productEditDialog";
import { ProductByCategoryEditDialog } from "../dialog/productByCategoryEditDialog";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeleteProduct } from "reducers/slices/productSlice";
import { fetchUpdateProduct } from "reducers/slices/productSlice";
import { ProductImageEditDialog } from "../dialog/productImageEditDialog";
import { OptionEditDialog } from "../dialog/optionEditDialog";
import CheckIcon from "@mui/icons-material/Check";
import { ProductSubInfo } from "layouts/productAdd/component/productSubInfo";

const ProductsTableData = ({ customDatas }) => {
  const dispatch = useDispatch();
  const dataColumns = [
    { Header: "상품", accessor: "product", align: "left" },
    { Header: "정상가", accessor: "regularPrice", align: "center" },
    { Header: "할인", accessor: "salePrice", align: "center" },
    { Header: "최종가", accessor: "finalPrice", align: "center" },
    { Header: "설명", accessor: "description", align: "center" },
    { Header: "재고", accessor: "stockQuantity", align: "center" },
    { Header: "재고 위험도", accessor: "risk", align: "center" },
    { Header: "추천 상품 여부", accessor: "recommended", align: "center" },
    { Header: "인기 상품 여부", accessor: "popularity", align: "center" },
    { Header: "배송비 당 최대 허용 수", accessor: "maxQuantityPerDelivery", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ];

  const [rowData, setRowData] = useState(customDatas[0]);
  const [dialogAnchorEl, setDialogAnchorEl] = useState(0);
  const [anchorEls, setAnchorEls] = useState(Array(customDatas.length).fill(null));
  const [dialogs, setDialogs] = useState(Array(customDatas.length).fill(false));
  const [dialogType, setDialogType] = useState(null);

  const handleClick = (event, index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = event.currentTarget;
    setAnchorEls(newAnchorEls);
    setDialogAnchorEl(index);

    setRowData(customDatas[index]);
  };

  const handleClose = () => {
    setAnchorEls(Array(customDatas.length).fill(null));
  };

  const handleDialog = (type) => {
    setDialogType(type);
    setDialogs((prevState) => ({
      ...prevState,
      [dialogAnchorEl]: true,
    }));
    handleClose();
  };

  const handleDialogClose = () => {
    setDialogType(null);
    setDialogs((prevState) => ({
      ...prevState,
      [dialogAnchorEl]: false,
    }));
    setDialogAnchorEl(null);
  };

  const handleToggle = (type) => {
    const updateRowData = { ...rowData, [type]: !rowData[type] };
    dispatch(fetchUpdateProduct(updateRowData))
      .then(() => {
        console.log("저장 성공");
      })
      .catch((error) => {
        console.error("저장 실패:", error);
      });
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(`"${rowData.name}" 상품을 정말로 삭제하겠습니까?`);
    if (confirmDelete) {
      dispatch(fetchDeleteProduct(rowData.productId))
        .then(() => {
          console.log("저장 성공");
        })
        .catch((error) => {
          console.error("저장 실패:", error);
        });
    }
  };

  const Product = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" variant="rounded" />
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );
  Product.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  };

  const Progress = ({ value }) => {
    let color;
    if (value >= 100) {
      color = "info";
      value = 100;
    } else if (value >= 60) {
      color = "info";
    } else if (value >= 40) {
      color = "warning";
    } else if (value >= 10) {
      color = "error";
    } else {
      color = "error";
      value = 5;
    }

    return (
      <MDBox display="flex" alignItems="center">
        <MDBox ml={0.5} width="9rem">
          <MDProgress variant="gradient" color={color} value={value} />
        </MDBox>
      </MDBox>
    );
  };
  Progress.propTypes = {
    value: PropTypes.number.isRequired,
  };

  const transformDataForProduct = (customDatas) => {
    return customDatas.map((data, index) => ({
      product: <Product image={data.imageUrl} name={data.name} />,
      regularPrice: `${data.regularPrice.toLocaleString()}원`,
      salePrice: `${data.salePrice.toLocaleString()}원`,
      finalPrice: `${(data.regularPrice - data.salePrice).toLocaleString()}원`,
      description: data.description,
      stockQuantity: data.stockQuantity,
      risk: <Progress value={(data.stockQuantity / 100) * 100} />,
      recommended: Boolean(data.recommended) ? <CheckIcon /> : null,
      popularity: Boolean(data.popularity) ? <CheckIcon /> : null,
      shippingCost: data.shippingCost,
      maxQuantityPerDelivery: data.maxQuantityPerDelivery,
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
          <Menu
            // adsf
            anchorEl={anchorEls[index]}
            open={Boolean(anchorEls[index])}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleDialog("edit")}>상품 수정</MenuItem>
            <MenuItem onClick={() => handleDialog("categoryEdit")}>카테고리 수정</MenuItem>
            <MenuItem onClick={() => handleDialog("imageEdit")}>이미지 수정</MenuItem>
            <MenuItem onClick={() => handleDialog("optionEdit")}>상품 옵션 수정</MenuItem>
            <MenuItem onClick={() => handleToggle("recommended")}>
              {rowData?.recommended ? "추천 상품 해제" : "추천 상품 등록"}
            </MenuItem>
            <MenuItem onClick={() => handleToggle("popularity")}>
              {rowData?.popularity ? "인기 상품 해제" : "인기 상품 등록"}
            </MenuItem>
            <MenuItem onClick={handleDelete}>삭제</MenuItem>
          </Menu>
          {dialogType === "edit" && dialogs[index] && rowData && (
            <ProductEditDialog
              rowData={rowData}
              setRowData={setRowData}
              isOpen={dialogType === "edit" && dialogs[index]}
              onClose={handleDialogClose}
            />
          )}
          {dialogType === "categoryEdit" && dialogs[index] && rowData && (
            <ProductByCategoryEditDialog
              rowData={rowData}
              isOpen={dialogType === "categoryEdit" && dialogs[index]}
              onClose={handleDialogClose}
            />
          )}
          {dialogType === "imageEdit" && dialogs[index] && rowData && (
            <ProductImageEditDialog
              rowData={rowData}
              isOpen={dialogType === "imageEdit" && dialogs[index]}
              onClose={handleDialogClose}
            />
          )}
          {dialogType === "optionEdit" && dialogs[index] && rowData && (
            <OptionEditDialog
              rowData={rowData}
              isOpen={dialogType === "optionEdit" && dialogs[index]}
              onClose={handleDialogClose}
            />
          )}
        </>
      ),
    }));
  };

  return {
    columns: dataColumns,
    rows: transformDataForProduct(customDatas),
  };
};

ProductsTableData.propTypes = {
  customDatas: PropTypes.array.isRequired,
};

export default ProductsTableData;
