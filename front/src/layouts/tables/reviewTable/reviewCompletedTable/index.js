import { React, useState } from "react";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import DataTable from "examples/Tables/DataTable";
import RefreshIcon from "@mui/icons-material/Refresh";
import { IconButton } from "@mui/material";

import reviewCompletedData from "./data/reviewCompletedData";
import { ExpandedContent } from "../expanded/expandedContent";
import { fetchReviews } from "reducers/slices/reviewSlice";
import { useDispatch } from "react-redux";

export const ReviewCompletedTable = () => {
  const dispatch = useDispatch();
  const [pageIndex, setPageIndex] = useState(0);

  const { columns: completedReviewColumns, rows: completedReviewRows } = reviewCompletedData();

  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  const handleRefresh = () => {
    dispatch(fetchReviews())
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
              <span>상품 후기 (답변 등록 완료)</span>
              <IconButton color="white" onClick={handleRefresh}>
                <RefreshIcon />
              </IconButton>
            </div>
          </MDTypography>
        </MDBox>
        <MDBox pt={3}>
          <DataTable
            canSearch={true}
            table={{ columns: completedReviewColumns, rows: completedReviewRows }}
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
