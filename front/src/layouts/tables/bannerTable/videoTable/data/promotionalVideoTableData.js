import React, { useState } from "react";

import PropTypes from "prop-types";

import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { PromotionalVideoEditDialog } from "../dialog/promotionalVideoEditDialog";
import MDBox from "components/MDBox";
import MDAvatar from "components/MDAvatar";
import MDTypography from "components/MDTypography";

export const promotionalVideoTableData = () => {
  const dispatch = useDispatch();
  const { promotionalVideos } = useSelector((state) => state.promotionalVideo);

  const [rowData, setRowData] = useState(promotionalVideos[0]);
  const [dialogAnchorEl, setDialogAnchorEl] = useState(0);
  const [anchorEls, setAnchorEls] = useState(Array(promotionalVideos.length).fill(null));
  const [dialogs, setDialogs] = useState(Array(promotionalVideos.length).fill(false));
  const [dialogType, setDialogType] = useState(null);

  const handleClick = (event, index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = event.currentTarget;
    setAnchorEls(newAnchorEls);
    setDialogAnchorEl(index);

    setRowData(promotionalVideos[index]);
  };

  const handleClose = () => {
    setAnchorEls(Array(promotionalVideos.length).fill(null));
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

  const dataColumns = [
    { Header: "영상", accessor: "video", align: "left" },
    { Header: "상품", accessor: "product", align: "left" },
    { Header: "action", accessor: "action", align: "left" },
  ];

  const dataRows = promotionalVideos.map((data, index) => ({
    video: (
      <>
        <div style={{ maxWidth: "900px" }}>
          <video width="100%" src={data.videoUrl} controls style={{ maxWidth: "100%" }} />,
        </div>
        {data.link && (
          <TextField margin="dense" label="링크" fullWidth value={data.link} readonly />
        )}
      </>
    ),
    product: (
      <ul className="gap-4 grid">
        {data.products.map((product, index) => (
          <li key={index}>
            <Product image={product.imageUrl} name={product.name} />
          </li>
        ))}
      </ul>
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
          <PromotionalVideoEditDialog
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
