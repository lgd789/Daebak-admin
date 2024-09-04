import React from "react";

import PropTypes from "prop-types";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { RenderTextLines } from "util/renderTextLines";

export const ResponseDialog = ({ rowData, setRowData, isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth={true} maxWidth={"xl"}>
      <DialogContent>
        <Card>
          <MDBox
            mx={2}
            mt={-3}
            py={3}
            px={2}
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
          >
            <MDTypography variant="h6" color="white">
              관리자 답변 등록
            </MDTypography>
          </MDBox>
          <MDBox pt={3} gap={3}>
            <MDBox px={1} pb={3} style={{ maxHeight: "200px", overflowY: "auto" }}>
              <MDTypography variant="h6" m={2}>
                {RenderTextLines(rowData.question)}
              </MDTypography>
            </MDBox>
            <MDBox px={5} pb={3}>
              {rowData.answers.map((answer) => (
                <MDBox display="flex" key={answer.answerId} gap={2}>
                  <MDTypography>⤷</MDTypography>
                  <MDTypography width={"100%"}>
                    <span className="text-sm">
                      {new Date(answer.responseDate).toLocaleString()}
                    </span>
                    <MDInput
                      value={answer.responseText}
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
            <MDInput label="관리자 답변" multiline rows={5} fullWidth={true} maxWidth={"xl"} />
          </MDBox>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={onClose}>등록</Button>
      </DialogActions>
    </Dialog>
  );
};

ResponseDialog.propTypes = {
  rowData: PropTypes.object,
  setRowData: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

ResponseDialog.defaultProps = {
  rowData: null,
  setRowData: () => {},
};
