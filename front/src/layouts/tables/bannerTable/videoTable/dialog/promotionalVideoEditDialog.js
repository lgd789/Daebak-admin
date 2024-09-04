import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, Card, Dialog, DialogActions, DialogContent } from "@mui/material";
import { Button, TextField } from "@mui/material";
import { fetchUpdatePromotionalVideo } from "reducers/slices/promotionalVidoeSlice";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import { IconButton } from "@mui/material";
import { RemoveCircle } from "@mui/icons-material";

export const PromotionalVideoEditDialog = ({ rowData, setRowData, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [data, setData] = useState(rowData);
  const [promotionalVideo, setPromotionalVideo] = useState(null);

  useEffect(() => {
    setData(rowData);
  }, [rowData]);

  const handleSaveChanges = () => {
    const filteredProducts = data.products.filter((product) => product !== "");
    const updatedData = { ...data, products: filteredProducts };

    const formData = new FormData();

    if (promotionalVideo) {
      formData.append("video", promotionalVideo);
    }

    formData.append("promotionalVideo", JSON.stringify(updatedData));

    console.log(data);
    dispatch(fetchUpdatePromotionalVideo(formData))
      .then(() => {
        console.log("저장 성공");
      })
      .catch((error) => {
        console.error("저장 실패:", error);
      });

    onClose();
  };

  const handleInputChange = (e, field) => {
    setData({ ...data, [field]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log(file);
      setPromotionalVideo(file);
    }
  };

  const handleProductChange = (event, value, index) => {
    const updatedProducts = [...data.products];
    updatedProducts[index] = value;
    setData({ ...data, products: updatedProducts });
  };

  const handleAddProduct = () => {
    console.log(data.products.length);
    if (data.products.length >= 3) return;
    setData({ ...data, products: [...data.products, ""] });
  };

  const handleDeleteRow = (indexToDelete) => {
    setData((prevData) => {
      const updatedProducts = prevData.products.filter((_, index) => index !== indexToDelete);
      return { ...prevData, products: updatedProducts };
    });
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent>
        <Card>
          <MDBox
            mx={2}
            mb={2}
            py={3}
            px={2}
            variant="gradient"
            bgColor="error"
            borderRadius="lg"
            coloredShadow="error"
          >
            <MDTypography variant="h6" color="white">
              홍보 영상
            </MDTypography>
          </MDBox>
          <MDBox p={3}>
            <input type="file" accept="video/*" onChange={handleFileChange} />
            {promotionalVideo ? (
              <video
                width="900"
                src={URL.createObjectURL(promotionalVideo)}
                controls
                style={{ maxWidth: "100%" }}
              />
            ) : (
              data.videoUrl && (
                <video width="900" src={data.videoUrl} controls style={{ maxWidth: "100%" }} />
              )
            )}
            <TextField
              margin="dense"
              label="링크"
              fullWidth
              value={data.link}
              onChange={(e) => handleInputChange(e, "link")}
            />
          </MDBox>
        </Card>
        <Card>
          <MDBox
            mx={2}
            mb={2}
            py={3}
            px={2}
            variant="gradient"
            bgColor="error"
            borderRadius="lg"
            coloredShadow="error"
          >
            <MDTypography variant="h6" color="white">
              홍보 상품
            </MDTypography>
          </MDBox>
          {data.products.map((product, index) => (
            <MDBox p={3} key={index} sx={{ display: "flex", alignItems: "center" }}>
              <Autocomplete
                options={products}
                sx={{ width: 500 }}
                getOptionLabel={(option) => option?.name || ""}
                value={product}
                onChange={(event, newValue) => {
                  handleProductChange(event, newValue, index);
                }}
                renderInput={(params) => <TextField {...params} label="상품" />}
              />
              <IconButton color="error" onClick={() => handleDeleteRow(index)}>
                <RemoveCircle />
              </IconButton>
            </MDBox>
          ))}
          <Button onClick={handleAddProduct}>상품 추가</Button>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          취소
        </Button>
        <Button onClick={handleSaveChanges} color="primary">
          저장
        </Button>
      </DialogActions>
    </Dialog>
  );
};

PromotionalVideoEditDialog.propTypes = {
  rowData: PropTypes.object,
  setRowData: PropTypes.func,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

PromotionalVideoEditDialog.defaultProps = {
  rowData: {},
  setRowData: () => {},
};
