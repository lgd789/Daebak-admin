import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { DataGrid } from "@mui/x-data-grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import authorsTableData from "layouts/tables/authorsTable/data/authorsTableData";
import { AddCouponDialog } from "./dialog/addCouponDialog";
import { AddPointsDialog } from "./dialog/addPointsDialog";
import DataTable from "examples/Tables/DataTable";
import { useDispatch, useSelector } from "react-redux";

import RefreshIcon from "@mui/icons-material/Refresh";
import { IconButton } from "@mui/material";
import { fetchMembers } from "reducers/slices/memberSlice";

function AuthorsTable() {
  const dispatch = useDispatch();
  const { dataColumns: columns, dataRows: rows } = authorsTableData();
  const [addPointsSelectRows, setAddPointsSelectRows] = useState(false);
  const [addCouponSelectRows, setAddCouponSelectRows] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedMembers, setSelectMembers] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const { members } = useSelector((state) => state.members);

  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  const handleShowAddPointsDialog = () => {
    setAddPointsSelectRows(!addPointsSelectRows);
  };

  const handleShowAddCouponDialog = () => {
    setAddCouponSelectRows(!addCouponSelectRows);
  };

  const handleSelectedRows = (selectedRows) => {
    const selectedRowData = selectedRows.map((id) => members.find((member) => member.id === id));
    setSelectMembers(selectedRowData);
  };

  const handleRefresh = () => {
    dispatch(fetchMembers())
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
          bgColor="success"
          borderRadius="lg"
          coloredShadow="success"
        >
          <MDTypography variant="h5" color="white">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>사용자</span>
              <div>
                <MDButton variant="h2" color="white" onClick={handleShowAddPointsDialog}>
                  적립금 추가
                </MDButton>
                <MDButton variant="h2" color="white" onClick={handleShowAddCouponDialog}>
                  쿠폰 추가
                </MDButton>
                <IconButton color="white" onClick={handleRefresh}>
                  <RefreshIcon />
                </IconButton>
              </div>
            </div>
          </MDTypography>
        </MDBox>
        <MDBox p={3}>
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
            isCheckBox={true}
            onSelectedRows={handleSelectedRows}
          />
        </MDBox>
      </Card>
      <AddCouponDialog
        selectMembers={selectedMembers}
        isOpen={addCouponSelectRows}
        onClose={() => setAddCouponSelectRows(!addCouponSelectRows)}
      />
      <AddPointsDialog
        selectMembers={selectedMembers}
        isOpen={addPointsSelectRows}
        onClose={() => setAddPointsSelectRows(!addPointsSelectRows)}
      />
    </Grid>
  );
}

export default AuthorsTable;
