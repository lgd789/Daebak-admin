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
import { fetchUpdateProduct } from "reducers/slices/productSlice";
import { useDispatch } from "react-redux";

export const ProductEditDialog = ({ rowData, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const dataColumns = [
    { Header: "상품", accessor: "product", align: "left" },
    { Header: "정상가", accessor: "regularPrice", align: "center" },
    { Header: "할인", accessor: "salePrice", align: "center" },
    { Header: "최종가", accessor: "finalPrice", align: "center" },
    { Header: "설명", accessor: "description", align: "center" },
    { Header: "재고", accessor: "stockQuantity", align: "center" },
    { Header: "배송비", accessor: "shippingCost", align: "center" },
    { Header: "배송비 당 최대 허용 수", accessor: "maxQuantityPerDelivery", align: "center" },
  ];
  const [data, setData] = useState(rowData);

  const handleSubmit = () => {
    console.log(data);

    dispatch(fetchUpdateProduct(data))
      .then(() => {
        console.log("저장 성공");
      })
      .catch((error) => {
        console.error("저장 실패:", error);
      });
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth={true} maxWidth={"xl"}>
      <DialogContent>
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
              상품 상세 정보
            </MDTypography>
          </MDBox>
          <MDBox pt={3}>
            <DataTable
              table={{
                columns: dataColumns,
                rows: [
                  {
                    product: (
                      <MDInput
                        type="text"
                        label="상품명"
                        value={data?.name}
                        onChange={(e) => {
                          const newData = { ...data, name: e.target.value };
                          setData(newData);
                        }}
                      />
                    ),
                    regularPrice: (
                      <MDInput
                        type="number"
                        label="정상가"
                        value={data?.regularPrice}
                        onChange={(e) => {
                          const newData = { ...data, regularPrice: e.target.value };
                          setData(newData);
                        }}
                      />
                    ),
                    salePrice: (
                      <MDInput
                        type="number"
                        label="할인"
                        value={data?.salePrice}
                        onChange={(e) => {
                          let salePrice = e.target.value;
                          if (data?.regularPrice === null) return;
                          if (salePrice > data?.regularPrice) {
                            salePrice = data?.regularPrice;
                          }
                          const newData = { ...data, salePrice: salePrice };
                          setData(newData);
                        }}
                      />
                    ),
                    finalPrice: [data?.regularPrice] - [data?.salePrice],
                    description: (
                      <MDInput
                        type="text"
                        label="설명"
                        value={data?.description}
                        onChange={(e) => {
                          const newData = { ...data, description: e.target.value };
                          setData(newData);
                        }}
                      />
                    ),
                    stockQuantity: (
                      <MDInput
                        type="number"
                        label="재고"
                        value={data?.stockQuantity}
                        onChange={(e) => {
                          const newData = { ...data, stockQuantity: e.target.value };
                          setData(newData);
                        }}
                      />
                    ),
                    shippingCost: (
                      <MDInput
                        type="number"
                        label="배송비"
                        value={data?.shippingCost}
                        onChange={(e) => {
                          const newData = { ...rowData, shippingCost: e.target.value };
                          setData(newData);
                        }}
                      />
                    ),
                    maxQuantityPerDelivery: (
                      <MDInput
                        type="number"
                        label="배송비 당 최대 허용 수"
                        value={data?.maxQuantityPerDelivery}
                        onChange={(e) => {
                          const newData = {
                            ...data,
                            maxQuantityPerDelivery: e.target.value,
                          };
                          setData(newData);
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={handleSubmit}>저장</Button>
      </DialogActions>
    </Dialog>
  );
};

ProductEditDialog.propTypes = {
  rowData: PropTypes.arrayOf(
    PropTypes.shape({
      productId: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      regularPrice: PropTypes.number.isRequired,
      salePrice: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      stockQuantity: PropTypes.number.isRequired,
      recommended: PropTypes.number.isRequired,
      shippingCost: PropTypes.number.isRequired,
      maxQuantityPerDelivery: PropTypes.number.isRequired,
    })
  ),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
