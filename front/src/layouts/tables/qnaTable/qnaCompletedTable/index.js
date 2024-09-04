import { React, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import RefreshIcon from "@mui/icons-material/Refresh";
import { IconButton } from "@mui/material";

import qnaCompletedData from "./data/qnaCompletedData";
import { ExpandedContent } from "../expanded/expandedQna";
import { fetchQnas } from "reducers/slices/qnaSlice";
import { useDispatch } from "react-redux";

export const QnaCompletedTable = () => {
  const dispatch = useDispatch();
  const [pageIndex, setPageIndex] = useState(0);

  const {
    columns: completedQnaColumns,
    rows: completedQnaRows,
    expanded: expanded,
  } = qnaCompletedData();

  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  const handleRefresh = () => {
    dispatch(fetchQnas())
      .then(() => {
        console.log("저장 성공");
      })
      .catch((error) => {
        console.error("저장 실패:", error);
      });
  };

  return (
    <Grid item xs={12}>
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
          <MDTypography variant="h5" color="white">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>Q&A (답변 등록 완료)</span>
              <IconButton color="white" onClick={handleRefresh}>
                <RefreshIcon />
              </IconButton>
            </div>
          </MDTypography>
        </MDBox>
        <MDBox pt={3}>
          <DataTable
            canSearch={true}
            table={{ columns: completedQnaColumns, rows: completedQnaRows }}
            isSorted={true}
            entriesPerPage={true}
            showTotalEntries={true}
            noEndBorder
            defaultPage={pageIndex}
            onPageChange={handlePageChange}
            expanded={(rowData) => <ExpandedContent rowData={rowData} />}
          />
        </MDBox>
      </Card>
    </Grid>
  );
};
