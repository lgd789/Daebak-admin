import React from "react";

import PropTypes from "prop-types";

import MDInput from "components/MDInput";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";

export const ProductInfo = ({ rowData, setRowData }) => {
  const dataColumns = [
    { Header: "이미지", accessor: "image", align: "left" },
    { Header: "상품", accessor: "product", align: "left" },
    { Header: "정상가", accessor: "regularPrice", align: "center" },
    { Header: "할인", accessor: "salePrice", align: "center" },
    { Header: "최종가", accessor: "finalPrice", align: "center" },
    { Header: "설명", accessor: "description", align: "center" },
    { Header: "재고", accessor: "stockQuantity", align: "center" },
    { Header: "배송비", accessor: "shippingCost", align: "center" },
    { Header: "배송비 당 최대 허용 수", accessor: "maxQuantityPerDelivery", align: "center" },
  ];
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
          상품 상세 정보
        </MDTypography>
      </MDBox>
      <MDBox pt={3}>
        <DataTable
          table={{
            columns: dataColumns,
            rows: [
              {
                image: (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const newData = { ...rowData, image: file };
                          setRowData(newData);
                        }
                      }}
                    />
                    {rowData.image && (
                      <img
                        src={URL.createObjectURL(rowData.image)}
                        alt="Selected Image"
                        className="w-[150px] h-auto object-cover rounded-md mt-2"
                      />
                    )}
                  </>
                ),
                product: (
                  <MDInput
                    type="text"
                    label="상품명"
                    value={rowData.name}
                    onChange={(e) => {
                      const newData = { ...rowData, name: e.target.value };
                      setRowData(newData);
                    }}
                  />
                ),
                regularPrice: (
                  <MDInput
                    type="number"
                    label="정상가"
                    value={rowData.regularPrice}
                    onChange={(e) => {
                      const newData = { ...rowData, regularPrice: e.target.value };
                      setRowData(newData);
                    }}
                  />
                ),
                salePrice: (
                  <MDInput
                    type="number"
                    label="할인"
                    value={rowData.salePrice}
                    onChange={(e) => {
                      let salePrice = parseFloat(e.target.value);
                      if (rowData.regularPrice === null) return;
                      if (salePrice > rowData.regularPrice) {
                        salePrice = rowData.regularPrice;
                      }
                      const newData = { ...rowData, salePrice: salePrice };
                      setRowData(newData);
                    }}
                  />
                ),
                finalPrice: [rowData.regularPrice] - [rowData.salePrice],
                description: (
                  <MDInput
                    type="text"
                    label="설명"
                    value={rowData.description}
                    onChange={(e) => {
                      const newData = { ...rowData, description: e.target.value };
                      setRowData(newData);
                    }}
                  />
                ),
                stockQuantity: (
                  <MDInput
                    type="number"
                    label="재고"
                    value={rowData.stockQuantity}
                    onChange={(e) => {
                      const newData = { ...rowData, stockQuantity: e.target.value };
                      setRowData(newData);
                    }}
                  />
                ),
                shippingCost: (
                  <MDInput
                    type="number"
                    label="배송비"
                    value={rowData.shippingCost}
                    onChange={(e) => {
                      const newData = { ...rowData, shippingCost: e.target.value };
                      setRowData(newData);
                    }}
                  />
                ),
                maxQuantityPerDelivery: (
                  <MDInput
                    type="number"
                    label="배송비 당 최대 허용 수"
                    value={rowData.maxQuantityPerDelivery}
                    onChange={(e) => {
                      const newData = {
                        ...rowData,
                        maxQuantityPerDelivery: e.target.value,
                      };
                      setRowData(newData);
                    }}
                  />
                ),
              },
            ],
          }}
          isSorted={false}
          entriesPerPage={false}
          showTotalEntries={false}
        />
      </MDBox>
    </Card>
  );
};

ProductInfo.propTypes = {
  rowData: PropTypes.arrayOf(
    PropTypes.shape({
      productId: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      regularPrice: PropTypes.number.isRequired,
      salePrice: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      stockQuantity: PropTypes.number.isRequired,
      recommended: PropTypes.number.isRequired,
      maxQuantityPerDelivery: PropTypes.number.isRequired,
    })
  ),
  setRowData: PropTypes.func.isRequired,
};
