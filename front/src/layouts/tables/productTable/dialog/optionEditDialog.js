import { ProductOption } from "layouts/productAdd/component/productOption";
import React, { useState } from "react";

import PropTypes from "prop-types";

import { Dialog, DialogContent, DialogActions } from "@mui/material";
import { Button } from "@mui/material";
import { fetchUpdateOption } from "reducers/slices/productSlice";
import { useDispatch } from "react-redux";

export const OptionEditDialog = ({ rowData, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [options, setOptions] = useState(rowData.options || []);

  const handleSubmit = () => {
    console.log(rowData);
    dispatch(fetchUpdateOption({ productId: rowData.productId, options }))
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
        <ProductOption rowData={options} setRowData={setOptions} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={handleSubmit}>저장</Button>
      </DialogActions>
    </Dialog>
  );
};

OptionEditDialog.propTypes = {
  rowData: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
