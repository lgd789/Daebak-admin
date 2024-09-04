import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CarouselEditDialog } from "../dialog/carouselEditDialog";
import { fetchDeleteCarousel } from "reducers/slices/carouselSlice";

export const carouselsTableData = () => {
  const dispatch = useDispatch();
  const { carouselItems } = useSelector((state) => state.carousel);

  const [rowData, setRowData] = useState(carouselItems[0]);
  const [dialogAnchorEl, setDialogAnchorEl] = useState(0);
  const [anchorEls, setAnchorEls] = useState(Array(carouselItems.length).fill(null));
  const [dialogs, setDialogs] = useState(Array(carouselItems.length).fill(false));
  const [dialogType, setDialogType] = useState(null);

  const handleClick = (event, index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = event.currentTarget;
    setAnchorEls(newAnchorEls);
    setDialogAnchorEl(index);

    setRowData(carouselItems[index]);
  };

  const handleClose = () => {
    setAnchorEls(Array(carouselItems.length).fill(null));
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

  const handleDelete = () => {
    const confirmDelete = window.confirm(`해당 캐러샐을 정말로 삭제하시겠습니까?`);
    if (confirmDelete) {
      dispatch(fetchDeleteCarousel(rowData.carouselId))
        .then(() => {
          console.log("저장 성공");
        })
        .catch((error) => {
          console.error("저장 실패:", error);
        });
    }
  };

  const dataColumns = [
    { Header: "이미지", accessor: "image", align: "left" },
    // { Header: "링크", accessor: "link", align: "left" },
    { Header: "action", accessor: "action", align: "left" },
  ];

  const dataRows = carouselItems.map((data, index) => ({
    image: (
      <>
        <img
          src={data.imageUrl}
          alt={data.carouselId}
          style={{ width: "900px", maxWidth: "100%" }}
        />
        {data.link && (
          <TextField margin="dense" label="링크" fullWidth value={data.link} readonly />
        )}
      </>
    ),
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
          <CarouselEditDialog
            rowData={rowData}
            isOpen={dialogType === "edit" && dialogs[index]}
            onClose={handleDialogClose}
          />
        )}
      </>
    ),
  }));

  return {
    dataColumns,
    dataRows,
  };
};
