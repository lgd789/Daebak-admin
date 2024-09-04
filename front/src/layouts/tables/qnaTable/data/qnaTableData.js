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
import React, { useState } from "react";

import { Menu, MenuItem, IconButton, Button } from "@mui/material";
import { MoreVert } from "@mui/icons-material";

import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";

import EditNoteIcon from "@mui/icons-material/EditNote";
import { ResponseDialog } from "../dialog/responseDialog";
import { QnaDetailDialog } from "../dialog/qnaDetailDialog";

export default function data({ customDatas }) {
  console.log(customDatas);
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
    {
      Header: "질문",
      accessor: "question",
      align: "center",
      Cell: ({ cell: { value } }) => <ExpandableText text={value} maxLength={32} />,
    },
    { Header: "작성일", accessor: "qnaDate", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ];

  const transformDataForQna = (customDatas) => {
    return customDatas.map((data, index) => ({
      memberId: data.memberId,
      memberName: data.name,
      productName: data.productName,
      questionId: data.questionId,
      question: data.question,
      qnaDate: new Date(data.createdAt).toLocaleString(),
      answer: data.answers,
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
          </Menu>
          {dialogType === "response" && dialogs[index] && rowData && (
            <ResponseDialog
              rowData={rowData}
              setRowData={setRowData}
              isOpen={dialogs[index] && dialogType === "response"}
              onClose={handleDialogClose}
            />
          )}
          {dialogType === "detail" && dialogs[index] && rowData && (
            <QnaDetailDialog
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

    rows: transformDataForQna(customDatas),
  };
}
