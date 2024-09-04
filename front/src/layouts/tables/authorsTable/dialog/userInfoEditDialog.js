import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import MDInput from "components/MDInput";
import { useDispatch } from "react-redux";
import { saveMember } from "reducers/slices/memberSlice";

export const UserInfoEditDialog = ({ rowData, setRowData, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState(rowData);

  useEffect(() => {
    setData(rowData);
  }, [rowData]);

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const dataColumns = [
    { Header: "ID", accessor: "id", align: "left" },
    { Header: "이름", accessor: "name", align: "left" },
    { Header: "이메일", accessor: "email", align: "left" },
    { Header: "휴대폰 번호", accessor: "phone", align: "left" },
    { Header: "기본 배송지", accessor: "address", align: "left" },
    { Header: "적립금", accessor: "points", align: "left" },
    { Header: "쿠폰", accessor: "coupons", align: "left" },
    { Header: "가입 일자", accessor: "employed", align: "left" },
  ];

  const dataRows = [
    {
      id: data.id,
      name: (
        <MDInput
          type="text"
          label="이름"
          value={data.name}
          onChange={(e) => handleInputChange(e, "name")}
        />
      ),
      email: (
        <MDInput
          type="email"
          label="이메일"
          value={data.email}
          onChange={(e) => handleInputChange(e, "email")}
        />
      ),
      phone: (
        <MDInput
          type="text"
          label="휴대폰 번호"
          value={data.phone}
          onChange={(e) => handleInputChange(e, "phone")}
        />
      ),
      address: (
        <MDInput
          type="text"
          label="기본 배송지"
          value={data.address}
          onChange={(e) => handleInputChange(e, "address")}
        />
      ),
      points: `${data.points.toLocaleString()}원`,
      coupons: `${data.memberCoupons.length}개`,
      employed: new Date(data.employed).toLocaleString(),
    },
  ];

  // const handleSaveChanges = () => {
  //   console.log(editedData);
  //   setRowData((row) =>
  //     row.id === editedData.id
  //       ? { ...row, author: { id: editedData.memberId, name: editedData.name }, ...editedData }
  //       : row
  //   );
  //   onClose();
  // };
  const handleSaveChanges = () => {
    dispatch(saveMember(data))
      .then(() => {
        console.log("저장 성공");
      })
      .catch((error) => {
        console.error("저장 실패:", error);
      });
    console.log(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth={true} maxWidth={"xl"}>
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
              사용자 정보
            </MDTypography>
          </MDBox>
          <MDBox pt={3}>
            <DataTable
              table={{ columns: dataColumns, rows: dataRows }}
              isSorted={false}
              entriesPerPage={false}
              showTotalEntries={false}
              noEndBorder
            />
          </MDBox>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={handleSaveChanges}>저장</Button>
      </DialogActions>
    </Dialog>
  );
};

UserInfoEditDialog.propTypes = {
  rowData: PropTypes.object.isRequired,
  setRowData: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

UserInfoEditDialog.defaultProps = {
  rowData: {},
  setRowData: () => {},
};
