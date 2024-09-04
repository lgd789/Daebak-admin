import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";

import { IconButton } from "@mui/material";
import { RemoveCircle } from "@mui/icons-material";

import { format, parseISO } from "date-fns";
import { AddCouponDialog } from "./addCouponDialog";

import { useDispatch } from "react-redux";
import { saveMemberCoupon } from "reducers/slices/memberSlice";

export const UserCouponDialog = ({ rowData, setRowData, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({ memberCoupons: [] });
  const [addCouponOpen, setAddCouponOpen] = useState(false);

  const handleDeleteRow = (index) => {
    const updatedCoupons = rowData.memberCoupons.filter((_, i) => i !== index);
    setRowData({ ...rowData, memberCoupons: updatedCoupons });
  };

  useEffect(() => {
    setData(rowData);
  }, [rowData]);

  const dataColumns = [
    { Header: "쿠폰명", accessor: "couponName", align: "left" },
    { Header: "할인가격", accessor: "discount", align: "left" },
    { Header: "시작날짜", accessor: "issueDate", align: "center" },
    { Header: "종료날짜", accessor: "validUntil", align: "center" },
    { Header: "최소주문금액", accessor: "minimumOrderAmount", align: "center" },
    { Header: "", accessor: "action", align: "center" },
  ];

  const dataRows = data.memberCoupons.map((myCoupon, index) => ({
    couponName: myCoupon.coupon.couponName,
    discount: myCoupon.coupon.discount,
    issueDate: format(new Date(myCoupon.issueDate), "yyyy-MM-dd"),
    validUntil: format(new Date(myCoupon.validUntil), "yyyy-MM-dd"),
    minimumOrderAmount: myCoupon.coupon.minimumOrderAmount,
    action: (
      <IconButton color="error" onClick={() => handleDeleteRow(index)}>
        <RemoveCircle />
      </IconButton>
    ),
  }));

  const handleSaveChanges = () => {
    dispatch(saveMemberCoupon(data))
      .then(() => {
        console.log("저장 성공");
      })
      .catch((error) => {
        console.error("저장 실패:", error);
      });
    console.log(data);
    onClose();
  };

  const handleAddCouponClose = () => {
    setAddCouponOpen(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth={"xl"}>
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
              보유 쿠폰
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
      <Button onClick={() => setAddCouponOpen(true)}>쿠폰 추가</Button>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={handleSaveChanges}>저장</Button>
      </DialogActions>
      <AddCouponDialog
        selectMembers={[rowData]}
        isOpen={addCouponOpen}
        onClose={handleAddCouponClose}
      />
    </Dialog>
  );
};

UserCouponDialog.propTypes = {
  rowData: PropTypes.object,
  setRowData: PropTypes.func,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

UserCouponDialog.defaultProps = {
  rowData: {},
  setRowData: () => {},
};
