import React from "react";

import PropTypes from "prop-types";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { RenderTextLines } from "util/renderTextLines";
import { useSelector } from "react-redux";

export const QnaDetailDialog = ({ rowData, setRowData, isOpen, onClose }) => {
  const products = useSelector((state) => state.products.products);
  const members = useSelector((state) => state.members.members);

  const reviewProduct = products.find((product) => product.productId === rowData.productId);
  const reviewMember = members.find((member) => member.memberId === rowData.memberId);
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth={true} maxWidth={"xl"}>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
        <Card>
          <MDBox
            mx={2}
            py={3}
            px={2}
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
          >
            <MDTypography variant="h6" color="white">
              상품정보
            </MDTypography>
          </MDBox>
          <MDBox p={3} display="flex" flexDirection="column" gap={3}>
            {reviewProduct ? (
              <MDBox display="flex" gap={10}>
                <img
                  src={reviewProduct.imageUrl}
                  alt={reviewProduct.name}
                  style={{ width: "300px", height: "300px", objectFit: "cover" }}
                />
                <MDBox>
                  <MDTypography variant="body2">
                    <strong>상품명:</strong> {reviewProduct.name}
                  </MDTypography>
                  <MDTypography variant="body2">
                    <strong>설명:</strong> {reviewProduct.description}
                  </MDTypography>
                  <MDTypography variant="body2" color="textSecondary">
                    <strong>가격:</strong> {reviewProduct.regularPrice - reviewProduct.salePrice}원
                  </MDTypography>
                </MDBox>
              </MDBox>
            ) : (
              <MDTypography variant="body2">상품 정보를 찾을 수 없습니다.</MDTypography>
            )}
          </MDBox>
        </Card>
        <Card>
          <MDBox
            mx={2}
            py={3}
            px={2}
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
          >
            <MDTypography variant="h6" color="white">
              회원정보
            </MDTypography>
          </MDBox>
          <MDBox p={3} display="flex" flexDirection="column" gap={3}>
            {reviewMember ? (
              <>
                <MDTypography variant="body2">
                  <strong>아이디:</strong> {reviewMember.id}
                </MDTypography>
                <MDTypography variant="body2">
                  <strong>이름:</strong> {reviewMember.name}
                </MDTypography>
              </>
            ) : (
              <MDTypography variant="body2">회원 정보를 찾을 수 없습니다.</MDTypography>
            )}
          </MDBox>
        </Card>
        <Card>
          <MDBox
            mx={2}
            py={3}
            px={2}
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
          >
            <MDTypography variant="h6" color="white">
              질문
            </MDTypography>
          </MDBox>
          <MDBox m={4} px={1} pb={3} style={{ maxHeight: "400px", overflowY: "auto" }}>
            <MDTypography variant="h6" mb={2}>
              {RenderTextLines(rowData.question)}
            </MDTypography>
          </MDBox>
          <MDBox px={5} pb={3} sx={{ maxHeight: "400px", overflowY: "auto" }}>
            {rowData.answers.map((response) => (
              <MDBox display="flex" key={response.answerId} gap={2}>
                <MDTypography>⤷</MDTypography>
                <MDTypography width={"100%"}>
                  <span className="text-sm">
                    {new Date(response.responseDate).toLocaleString()}
                  </span>
                  <MDInput
                    value={response.responseText}
                    multiline
                    rows={3}
                    fullWidth
                    maxWidth={"xl"}
                    readOnly
                  />
                </MDTypography>
              </MDBox>
            ))}
          </MDBox>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>닫기</Button>
      </DialogActions>
    </Dialog>
  );
};

QnaDetailDialog.propTypes = {
  rowData: PropTypes.object,
  setRowData: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

QnaDetailDialog.defaultProps = {
  rowData: null,
  setRowData: () => {},
};
