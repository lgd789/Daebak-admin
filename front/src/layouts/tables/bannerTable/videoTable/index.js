import React, { useState } from "react";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import RefreshIcon from "@mui/icons-material/Refresh";
import { IconButton } from "@mui/material";

import DataTable from "examples/Tables/DataTable";
import { promotionalVideoTableData } from "./data/promotionalVideoTableData";
import { useDispatch } from "react-redux";
import { fetchPromotionalVideo } from "reducers/slices/promotionalVidoeSlice";

export const VideoTable = () => {
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState({
    carouselId: null,
    imageUrl: null,
    link: null,
  });
  const { dataColumns: columns, dataRows: rows } = promotionalVideoTableData();
  const [addVideo, setAddVideo] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);

  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  const handleShowAddVideo = () => {
    setAddVideo(!addCarousel);
  };

  const handleRefresh = () => {
    dispatch(fetchPromotionalVideo())
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
          bgColor="error"
          borderRadius="lg"
          coloredShadow="error"
        >
          <MDTypography variant="h5" color="white">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>홍보 영상</span>
              <IconButton color="white" onClick={handleRefresh}>
                <RefreshIcon />
              </IconButton>
            </div>
          </MDTypography>
        </MDBox>
        <MDBox pt={3}>
          <DataTable
            table={{ columns: columns, rows: rows }}
            isSorted={true}
            entriesPerPage={true}
            pagination={{ variant: "gradient", color: "info" }}
            showTotalEntries={true}
            canSearch={true}
            noEndBorder
            defaultPage={pageIndex}
            onPageChange={handlePageChange}
          />
        </MDBox>
      </Card>
    </Grid>
  );
};
