import React, { useState } from "react";

import { IconButton } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { Menu, MenuItem } from "@mui/material";
import { CouponDialog } from "../../../couponAdd";
import couponDatas from "./couponDatas";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeleteCoupon } from "reducers/slices/couponSlice";

export const couponTableData = () => {
  const { coupons } = useSelector((state) => state.coupons);
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState(coupons[0]);
  const [dialogAnchorEl, setDialogAnchorEl] = useState(0);
  const [anchorEls, setAnchorEls] = useState(Array(coupons.length).fill(null));
  const [editDialogs, setEditDialogs] = useState(Array(coupons.length).fill(false));
  const handleClick = (event, index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = event.currentTarget;
    setAnchorEls(newAnchorEls);
    setDialogAnchorEl(index);

    setRowData(coupons[index]);
  };

  const handleClose = () => {
    setAnchorEls(Array(coupons.length).fill(null));
  };

  const handleEdit = () => {
    setEditDialogs((prevState) => ({
      ...prevState,
      [dialogAnchorEl]: true,
    }));
    handleClose();
  };

  const handleDialogClose = () => {
    setEditDialogs((prevState) => ({
      ...prevState,
      [dialogAnchorEl]: false,
    }));
    setDialogAnchorEl(null);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(`"${rowData.couponName}" 쿠폰을 정말로 삭제하시겠습니까?`);
    if (confirmDelete) {
      dispatch(fetchDeleteCoupon({ couponId: rowData.couponId }))
        .then(() => {
          console.log("저장 성공");
        })
        .catch((error) => {
          console.error("저장 실패:", error);
        });
    }
  };

  const dataColumns = [
    { Header: "쿠폰코드", accessor: "couponCode", align: "left" },
    { Header: "쿠폰이름", accessor: "couponName", align: "left" },
    { Header: "할인가격", accessor: "discount", align: "left" },
    { Header: "시작날짜", accessor: "validFrom", align: "center" },
    { Header: "종료날짜", accessor: "validUntil", align: "center" },
    { Header: "최소주문금액", accessor: "minimumOrderAmount", align: "center" },
    { Header: "사용기간", accessor: "expirationPeriod", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ];

  const dataRows = coupons.map((data, index) => ({
    couponId: data.couponId,
    couponCode: data.couponCode,
    couponName: data.couponName,
    discount: `${data.discount.toLocaleString()}원`,
    validFrom: new Date(data.validFrom).toLocaleString(),
    validUntil: new Date(data.validUntil).toLocaleString(),
    minimumOrderAmount: `${data.minimumOrderAmount.toLocaleString()}원`,
    expirationPeriod: data.expirationPeriod ? `${data.expirationPeriod}일` : null,
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
          <MenuItem onClick={handleEdit}>수정</MenuItem>
          <MenuItem onClick={handleDelete}>삭제</MenuItem>
        </Menu>
        <CouponDialog
          rowData={rowData}
          setRowData={setRowData}
          isOpen={editDialogs[index]}
          onClose={handleDialogClose}
        />
      </>
    ),
  }));

  return {
    columns: dataColumns,
    rows: dataRows,
  };
};
