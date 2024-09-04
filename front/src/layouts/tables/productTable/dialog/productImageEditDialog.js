import React, { useState } from "react";

import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { Dialog, DialogContent, DialogActions } from "@mui/material";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DataTable from "examples/Tables/DataTable";
import { useDispatch } from "react-redux";
import { fetchUpdateProductImage } from "reducers/slices/productSlice";

export const ProductImageEditDialog = ({ rowData, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [productImage, setProductImage] = useState();
  const dataColumns = [
    { Header: "변경 전 이미지", accessor: "beforeImage", align: "left" },
    { Header: "변경 후 이미지", accessor: "afterImage", align: "left" },
  ];

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("image", productImage);
    formData.append("productId", rowData.productId);
    dispatch(fetchUpdateProductImage(formData))
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
              {rowData.name} 이미지 수정
            </MDTypography>
          </MDBox>
          <MDBox pt={3}>
            <DataTable
              table={{
                columns: dataColumns,
                rows: [
                  {
                    beforeImage: (
                      <img
                        src={rowData?.imageUrl}
                        alt="Selected Image"
                        className="w-[150px] h-auto object-cover rounded-md mt-2"
                      />
                    ),
                    afterImage: (
                      <>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              setProductImage(file);
                            }
                          }}
                        />
                        {productImage && (
                          <img
                            src={URL.createObjectURL(productImage)}
                            alt="Selected Image"
                            className="w-[150px] h-auto object-cover rounded-md mt-2"
                          />
                        )}
                      </>
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

ProductImageEditDialog.propTypes = {
  rowData: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
