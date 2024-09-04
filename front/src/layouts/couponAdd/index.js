import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Autocomplete, TextField, Button } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import MDInput from "components/MDInput";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDProgress from "components/MDProgress";

import DataTable from "examples/Tables/DataTable";
import { useDispatch } from "react-redux";
import { fetchUpdateCoupon } from "reducers/slices/couponSlice";
import { format, parseISO } from "date-fns";

export const CouponDialog = ({ rowData, setRowData, isOpen, onClose }) => {
  console.log(rowData);
  const dispatch = useDispatch();
  const [data, setData] = useState(rowData);
  const dataColumns = [
    { Header: "쿠폰코드", accessor: "couponCode", align: "left" },
    { Header: "쿠폰이름", accessor: "couponName", align: "left" },
    { Header: "할인가격", accessor: "discount", align: "left" },
    { Header: "시작날짜", accessor: "validFrom", align: "center" },
    { Header: "종료날짜", accessor: "validUntil", align: "center" },
    { Header: "최소주문금액", accessor: "minimumOrderAmount", align: "center" },
    { Header: "사용기간(일)", accessor: "expirationPeriod", align: "center" },
  ];

  useEffect(() => {
    console.log(rowData);
    setData(rowData);
  }, [rowData]);

  const handleSubmit = () => {
    const utcData = {
      ...data,
      // validFrom: data.validFrom ? new Date(data.validFrom).toISOString() : null,
      // validUntil: data.validUntil ? new Date(data.validUntil).toISOString() : null,
    };

    dispatch(fetchUpdateCoupon({ coupon: utcData }))
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
        <Card>
          <MDBox
            mx={2}
            py={3}
            px={2}
            variant="gradient"
            bgColor="error"
            borderRadius="lg"
            coloredShadow="error"
          >
            <MDTypography variant="h6" color="white">
              쿠폰 정보
            </MDTypography>
          </MDBox>
          <MDBox pt={3}>
            <DataTable
              table={{
                columns: dataColumns,
                rows: [
                  {
                    couponCode: (
                      <MDInput
                        type="text"
                        value={data?.couponCode}
                        onChange={(e) => {
                          setData((prevData) => ({
                            ...prevData,
                            couponCode: e.target.value,
                          }));
                        }}
                      />
                    ),
                    couponName: (
                      <MDInput
                        type="text"
                        value={data?.couponName}
                        onChange={(e) => {
                          setData((prevData) => ({
                            ...prevData,
                            couponName: e.target.value,
                          }));
                        }}
                      />
                    ),
                    discount: (
                      <MDInput
                        type="number"
                        value={data?.discount}
                        onChange={(e) => {
                          setData((prevData) => ({
                            ...prevData,
                            discount: e.target.value,
                          }));
                        }}
                      />
                    ),
                    validFrom: (
                      <MDInput
                        type="datetime-local" // datetime-local로 변경
                        value={
                          data?.validFrom
                            ? format(parseISO(data.validFrom), "yyyy-MM-dd'T'HH:mm")
                            : ""
                        }
                        onChange={(e) => {
                          setData((prevData) => ({
                            ...prevData,
                            validFrom: e.target.value,
                          }));
                        }}
                      />
                    ),
                    validUntil: (
                      <MDInput
                        type="datetime-local"
                        value={
                          data?.validUntil
                            ? format(parseISO(data.validUntil), "yyyy-MM-dd'T'HH:mm")
                            : ""
                        }
                        onChange={(e) => {
                          setData((prevData) => ({
                            ...prevData,
                            validUntil: e.target.value,
                          }));
                        }}
                      />
                    ),
                    minimumOrderAmount: (
                      <MDInput
                        type="number"
                        value={data?.minimumOrderAmount}
                        onChange={(e) => {
                          setData((prevData) => ({
                            ...prevData,
                            minimumOrderAmount: e.target.value,
                          }));
                        }}
                      />
                    ),
                    expirationPeriod: (
                      <MDInput
                        type="number"
                        value={data?.expirationPeriod}
                        onChange={(e) => {
                          setData((prevData) => ({
                            ...prevData,
                            expirationPeriod: e.target.value,
                          }));
                        }}
                      />
                    ),
                  },
                ],
              }}
              isSorted={false}
              entriesPerPage={false}
              showTotalEntries={false}
            />
          </MDBox>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={handleSubmit}>저장</Button>
      </DialogActions>
    </Dialog>
  );
};

CouponDialog.propTypes = {
  rowData: PropTypes.object,
  setRowData: PropTypes.func,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

CouponDialog.defaultProps = {
  rowData: null,
  setRowData: () => {},
};
