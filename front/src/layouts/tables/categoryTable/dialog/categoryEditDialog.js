import React, { useState } from "react";
import PropTypes from "prop-types";
import { IconButton } from "@mui/material";
import { RemoveCircle, AddCircleOutline } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import MDInput from "components/MDInput";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { fetchUpdateCategories } from "reducers/slices/categorySlice";
import { useDispatch } from "react-redux";

export const CategoryEditDialog = ({ data, setData, isOpen, handleClose }) => {
  const dispatch = useDispatch();
  const [categoryImage, setCategoryImage] = useState();

  const handleAddSubcategory = () => {
    const newSubcategories = [...(data.subcategories || []), { id: null, name: "" }];
    const newData = { ...data, subcategories: newSubcategories };
    setData(newData);
  };

  const handleRemoveSubcategory = (indexToRemove) => {
    if (data.subcategories) {
      const newSubcategories = data.subcategories.filter((_, index) => index !== indexToRemove);
      const newData = { ...data, subcategories: newSubcategories };
      setData(newData);
    }
  };

  const handleSubmit = () => {
    if (data === null || data.name === "") {
      return;
    }

    const formData = new FormData();
    formData.append("id", data.id);
    formData.append("name", data.name);
    if (categoryImage) {
      formData.append("image", categoryImage);
    }
    if (data.subcategories) {
      formData.append("subcategories", JSON.stringify(data.subcategories));
    }

    dispatch(fetchUpdateCategories(formData))
      .then(() => {
        console.log("저장 성공");
      })
      .catch((error) => {
        console.error("저장 실패:", error);
      });
    handleClose();
    console.log(data);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth={"xl"}>
      <DialogTitle>카테고리 수정</DialogTitle>
      <DialogContent>
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
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setCategoryImage(file);
                  }
                }}
              />
              <div className="flex gap-5 mt-5">
                {categoryImage ? (
                  <img src={URL.createObjectURL(categoryImage)} alt="Selected Image" width="40" />
                ) : data.imageUrl ? (
                  <img src={data.imageUrl} alt={data.name} width="40" />
                ) : (
                  <img
                    src={`${process.env.PUBLIC_URL}/category/default.png`}
                    alt={data.name}
                    width="40"
                  />
                )}
                <MDInput
                  type="text"
                  label="상위 카테고리"
                  value={data?.name}
                  onChange={(e) => {
                    const newData = { ...data, name: e.target.value };
                    setData(newData);
                  }}
                  InputProps={{
                    inputProps: {
                      style: { color: "white" },
                    },
                  }}
                  InputLabelProps={{ style: { color: "white" } }}
                />
              </div>
            </MDTypography>
          </MDBox>
          <MDBox mx={2} py={3} px={2}>
            {data?.subcategories?.map((subcategory, index) => (
              <div key={index} className="mb-4">
                <MDInput
                  type="text"
                  label="하위 카테고리"
                  value={subcategory?.name}
                  onChange={(e) => {
                    const newSubcategories = [...(data.subcategories || [])];
                    newSubcategories[index] = { ...newSubcategories[index], name: e.target.value };
                    const newData = { ...data, subcategories: newSubcategories };
                    setData(newData);
                  }}
                />
                <IconButton color="error" onClick={() => handleRemoveSubcategory(index)}>
                  <RemoveCircle />
                </IconButton>
              </div>
            ))}
            <Button onClick={handleAddSubcategory}>추가</Button>
          </MDBox>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>취소</Button>
        <Button onClick={handleSubmit}>저장</Button>
      </DialogActions>
    </Dialog>
  );
};

CategoryEditDialog.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    subcategories: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
  }),
  setData: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
