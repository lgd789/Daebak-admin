import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";

import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Button } from "@mui/material";
import { ProductCategory } from "layouts/productAdd/component/productCategory";
import { fetchUpdateProduct } from "reducers/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";

export const ProductByCategoryEditDialog = ({ rowData, isOpen, onClose }) => {
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [data, setData] = useState();

  useEffect(() => {
    if (categories && rowData && rowData.category) {
      // Assuming rowData.category contains childId
      const childId = rowData.category;
      let parentId = null;

      categories.forEach((category) => {
        if (category.subcategories.some((sub) => sub.id === childId)) {
          parentId = category.id;
        }
      });
      console.log(parentId, childId);
      setData({ parentId, childId });
    }
  }, [categories, rowData]);

  const handleSubmit = () => {
    const updateRowData = { ...rowData, category: data.childId };

    dispatch(fetchUpdateProduct(updateRowData))
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
        <ProductCategory rowData={data} setRowData={setData} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={handleSubmit}>저장</Button>
      </DialogActions>
    </Dialog>
  );
};

ProductByCategoryEditDialog.propTypes = {
  rowData: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
