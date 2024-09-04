/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import React from "react";
import Icon from "@mui/material/Icon";
import ThumbUpAltSharpIcon from "@mui/icons-material/ThumbUpAlt";

import { Menu, MenuItem, IconButton, Button } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { MoreVert } from "@mui/icons-material";

import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import EditNoteIcon from "@mui/icons-material/EditNote";

import { useState } from "react";
import { ReviewResponseDialog } from "../dialog/reviewResponseDialog";
import { ExpandedContent } from "../expanded/expandedContent";
import { ReviewDetailDialog } from "../dialog/reviewDetailDialog";
import { useDispatch } from "react-redux";
import { fetchUpdateBestReview } from "reducers/slices/reviewSlice";
import CheckIcon from "@mui/icons-material/Check";

export default function data({ customDatas }) {
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState(customDatas[0]);
  const [dialogAnchorEl, setDialogAnchorEl] = useState(0);
  const [anchorEls, setAnchorEls] = useState(Array(customDatas.length).fill(null));
  const [dialogs, setDialogs] = useState(Array(customDatas.length).fill(false));
  const [dialogType, setDialogType] = useState(null);

  const handleClick = (event, index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = event.currentTarget;
    setAnchorEls(newAnchorEls);
    setDialogAnchorEl(index);

    setRowData(customDatas[index]);
  };

  const handleClose = () => {
    setAnchorEls(Array(customDatas.length).fill(null));
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

  const handleToggleBestReview = () => {
    dispatch(fetchUpdateBestReview({ reviewId: rowData.reviewId }))
      .then(() => {
        console.log("저장 성공");
      })
      .catch((error) => {
        console.error("저장 실패:", error);
      });

    handleClose();
  };

  const ExpandableText = ({ text, maxLength }) => {
    const [expanded, setExpanded] = useState(false);

    return (
      <div>
        <span className={`flex ${expanded ? "flex-wrap max-w-96" : ""} text-left`}>
          {expanded ? text : text.length > maxLength ? text.slice(0, maxLength) + "..." : text}
        </span>
        {text.length > maxLength && (
          <button className="text-blue-500" onClick={() => setExpanded(!expanded)}>
            {expanded ? "간략히 보기" : "더 보기"}
          </button>
        )}
      </div>
    );
  };
  const dataColumns = [
    { Header: "작성자", accessor: "memberName", align: "left" },
    { Header: "상품명", accessor: "productName", align: "left" },
    { Header: "옵션명", accessor: "optionName", align: "center" },
    {
      Header: "리뷰",
      accessor: "contents",
      align: "center",
      Cell: ({ cell: { value } }) => <ExpandableText text={value} maxLength={32} />,
    },
    { Header: "별점", accessor: "score", align: "center" },
    { Header: "작성일", accessor: "reviewDate", align: "center" },
    { Header: "Best", accessor: "isBest", align: "center" },
    { Header: "orderNumber", accessor: "orderNumber", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ];

  const transformDataForReview = (customDatas) => {
    return customDatas.map((data, index) => ({
      reviewId: data.reviewId,
      memberId: data.memberId,
      memberName: data.memberName,
      productId: data.productId,
      productName: data.productName,
      optionName: data.optionName,
      contents: data.contents,
      score: data.score,
      reviewDate: new Date(data.reviewDate).toLocaleString(),
      isBest: Boolean(data.isBest) ? <CheckIcon /> : null,
      orderNumber: data.orderNumber,
      response: data.response,
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
            <MenuItem
              onClick={() => {
                handleDialog("response");
              }}
            >
              답변 달기
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleDialog("detail");
              }}
            >
              상세 정보
            </MenuItem>
            <MenuItem onClick={handleToggleBestReview}>
              {rowData.isBest ? "Best 리뷰 해제" : "Best 리뷰 등록"}
            </MenuItem>
          </Menu>
          {dialogType === "response" && dialogs[index] && rowData && (
            <ReviewResponseDialog
              rowData={rowData}
              setRowData={setRowData}
              isOpen={dialogs[index] && dialogType === "response"}
              onClose={handleDialogClose}
            />
          )}
          {dialogType === "detail" && dialogs[index] && rowData && (
            <ReviewDetailDialog
              rowData={rowData}
              isOpen={dialogs[index] && dialogType === "detail"}
              onClose={handleDialogClose}
            />
          )}
        </>
      ),
    }));
  };

  return {
    columns: dataColumns,

    rows: transformDataForReview(customDatas),
  };
}
