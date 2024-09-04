import React, { useState } from "react";

import PropTypes from "prop-types";

import { Autocomplete, Button, TextField } from "@mui/material";
import { Dialog, DialogContent, DialogActions } from "@mui/material";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import { useDispatch } from "react-redux";
import { addMemberPoints } from "reducers/slices/memberSlice";

export const AddPointsDialog = ({ selectMembers, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [points, setPoints] = useState(0);
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    const pointsDto = {
      points,
      description,
    };

    dispatch(addMemberPoints({ members: selectMembers, points: pointsDto }))
      .then(() => {
        console.log("저장 성공");
      })
      .catch((error) => {
        console.error("저장 실패:", error);
      });
    console.log(selectMembers, points);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent>
        <Card>
          <MDBox
            mx={2}
            py={3}
            px={2}
            variant="gradient"
            bgColor="success"
            borderRadius="lg"
            coloredShadow="success"
          >
            <MDTypography variant="h6" color="white">
              적립금 추가
            </MDTypography>
          </MDBox>
          <MDBox p={3}>
            <MDInput
              type="number"
              label="적립금"
              value={points}
              onChange={(e) => {
                setPoints(e.target.value);
              }}
            />
            원
          </MDBox>
          <MDBox p={3}>
            <MDInput
              type="text"
              label="사유"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </MDBox>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={handleSubmit}>추가</Button>
      </DialogActions>
    </Dialog>
  );
};

AddPointsDialog.propTypes = {
  selectMembers: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
