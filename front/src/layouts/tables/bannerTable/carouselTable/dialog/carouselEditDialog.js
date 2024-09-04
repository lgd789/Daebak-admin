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

import { useDispatch } from "react-redux";
import MDInput from "components/MDInput";
import { fetchUpdateCarousel } from "reducers/slices/carouselSlice";
import { TextField } from "@mui/material";

export const CarouselEditDialog = ({ rowData, setRowData, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState(rowData);
  const [carouselImage, setCarouselImage] = useState();

  useEffect(() => {
    setData(rowData);
  }, [rowData]);

  const handleSaveChanges = () => {
    const formData = new FormData();

    if (carouselImage) {
      formData.append("image", carouselImage);
    }

    if (data.link) {
      formData.append("link", data.link);
    }

    if (data.carouselId) {
      formData.append("carouselId", data.carouselId);
    }

    dispatch(fetchUpdateCarousel(formData))
      .then(() => {
        console.log("저장 성공");
      })
      .catch((error) => {
        console.error("저장 실패:", error);
      });

    onClose();
  };

  const dataColumns = [
    { Header: "이미지", accessor: "image", align: "left" },
    { Header: "링크", accessor: "link", align: "left" },
  ];

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const dataRows = [
    {
      image: (
        <>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setCarouselImage(file);
              }
            }}
          />
          {carouselImage ? (
            <img src={URL.createObjectURL(carouselImage)} alt="Selected Image" width="900px" />
          ) : (
            data.imageUrl && <img src={data.imageUrl} alt="Existing Image" width="900px" />
          )}
        </>
      ),
      link: (
        <MDInput
          type="email"
          label="링크"
          value={data.link}
          onChange={(e) => handleInputChange(e, "link")}
        />
      ),
    },
  ];

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
              캐러샐
            </MDTypography>
          </MDBox>
          <MDBox pt={3}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setCarouselImage(file);
                }
              }}
            />
            {carouselImage ? (
              <img src={URL.createObjectURL(carouselImage)} alt="Selected Image" width="900px" />
            ) : (
              data.imageUrl && <img src={data.imageUrl} alt="Existing Image" width="900px" />
            )}
            <TextField
              margin="dense"
              label="링크"
              fullWidth
              value={data.link}
              onChange={(e) => handleInputChange(e, "link")}
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

CarouselEditDialog.propTypes = {
  rowData: PropTypes.object,
  setRowData: PropTypes.func,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

CarouselEditDialog.defaultProps = {
  rowData: {},
  setRowData: () => {},
};
