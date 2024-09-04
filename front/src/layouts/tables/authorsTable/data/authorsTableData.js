import { useState } from "react";
import PropTypes from "prop-types";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { MoreVert } from "@mui/icons-material";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

import team2 from "assets/images/team-2.jpg";
import { UserInfoEditDialog } from "../dialog/userInfoEditDialog";
import { UserCouponDialog } from "../dialog/userCouponDialog";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { AddPointsDialog } from "../dialog/addPointsDialog";

export default function authorsTableData() {
  const { members } = useSelector((state) => state.members);

  const Author = ({ image, name, id }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{id}</MDTypography>
      </MDBox>
    </MDBox>
  );

  Author.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  };

  const [rowData, setRowData] = useState(members[0]);
  const [dialogAnchorEl, setDialogAnchorEl] = useState(0);
  const [anchorEls, setAnchorEls] = useState(Array(members.length).fill(null));
  const [dialogs, setDialogs] = useState(Array(members.length).fill(false));
  const [dialogType, setDialogType] = useState(null);

  const handleClick = (event, index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = event.currentTarget;
    setAnchorEls(newAnchorEls);
    setDialogAnchorEl(index);

    setRowData(members[index]);
  };

  const handleClose = () => {
    setAnchorEls(Array(members.length).fill(null));
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

  const dataColumns = [
    { Header: "사용자", accessor: "author", align: "left" },
    { Header: "이메일", accessor: "email", align: "left" },
    { Header: "휴대폰 번호", accessor: "phone", align: "left" },
    { Header: "기본 배송지", accessor: "address", align: "left" },
    { Header: "적립금", accessor: "points", align: "center" },
    { Header: "쿠폰", accessor: "coupons", align: "left" },
    { Header: "가입 일자", accessor: "employed", align: "left" },
    { Header: "Action", accessor: "action", align: "left" },
  ];

  console.log(rowData);
  const dataRows = members.map((data, index) => ({
    id: data.id,
    author: <Author image={team2} name={data.name} id={data.id} />,
    email: data.email,
    phone: data.phone,
    address: data.address,
    points: `${data.points.toLocaleString()}원`,
    coupons: `${data.memberCoupons.length}개`,
    employed: new Date(data.employed).toLocaleString(),
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
          <MenuItem onClick={() => handleDialog("coupon")}>보유 쿠폰</MenuItem>
          <MenuItem onClick={() => handleDialog("points")}>적립금 추가</MenuItem>
          <MenuItem onClick={() => handleDialog("delete")}>삭제</MenuItem>
        </Menu>
        {dialogType === "coupon" && dialogs[index] && rowData && (
          <UserCouponDialog
            rowData={rowData}
            setRowData={setRowData}
            isOpen={dialogType === "coupon" && dialogs[index]}
            onClose={handleDialogClose}
          />
        )}
        {dialogType === "edit" && dialogs[index] && rowData && (
          <UserInfoEditDialog
            rowData={rowData}
            setRowData={setRowData}
            isOpen={dialogType === "edit" && dialogs[index]}
            onClose={handleDialogClose}
          />
        )}
        {dialogType === "points" && dialogs[index] && rowData && (
          <AddPointsDialog
            selectMembers={[rowData]}
            isOpen={dialogType === "points" && dialogs[index]}
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
}
