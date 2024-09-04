/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useSelector } from "react-redux";
import { CategoryEditDialog } from "../dialog/categoryEditDialog";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchDeleteCategory } from "reducers/slices/categorySlice";

export const CategoriesTableData = ({ clickedCategories, setClickedCategories }) => {
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState();

  const handleShowCategory = (category) => {
    setData(category);
    setShowPopup(true);
  };

  const handleDeleteCategory = (category) => {
    const confirmDelete = window.confirm(`"${category.name}" 카테고리를 정말로 삭제하시겠습니까?`);
    if (confirmDelete) {
      dispatch(fetchDeleteCategory(category.id))
        .then(() => {
          console.log("저장 성공");
        })
        .catch((error) => {
          console.error("저장 실패:", error);
        });
    }
  };

  const handleShowProduct = (subCategory) => {
    const isAlreadyClicked = clickedCategories.some(
      (clickedCategory) => clickedCategory.id === subCategory.id
    );
    console.log(isAlreadyClicked, subCategory);
    if (isAlreadyClicked) {
      const updatedClickedCategories = clickedCategories.filter(
        (clickedCategory) => clickedCategory.id !== subCategory.id
      );
      setClickedCategories(updatedClickedCategories);
    } else {
      setClickedCategories((prevClickedCategories) => [...prevClickedCategories, subCategory]);
    }
  };

  return (
    <div className="flex flex-wrap px-10 gap-20">
      {categories.map((category, index) => (
        <div key={index} className="rounded-md">
          <div key={index} className="flex gap-5 items-center border-b-4">
            <div className="flex items-center">
              {category.imageUrl ? (
                <img src={category.imageUrl} alt={category.name} width="40" />
              ) : (
                <img
                  src={`${process.env.PUBLIC_URL}/category/default.png`}
                  alt={category.name}
                  width="40"
                />
              )}
              <span className="font-semibold text-xl">{category.name}</span>
            </div>
            <div>
              <IconButton onClick={() => handleShowCategory(category)} size="medium">
                <EditIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => handleDeleteCategory(category)}
                size="medium"
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
          <ul className="mt-4 space-y-4">
            {category.subcategories.map((subCategory, subIndex) => (
              <li
                key={subIndex}
                className={`cursor-pointer text-sm border-b-[1px]${
                  clickedCategories.some((clickedCategory) => clickedCategory.id === subCategory.id)
                    ? " text-blue-500 font-bold"
                    : ""
                }`}
                onClick={() => handleShowProduct(subCategory)}
              >
                {subCategory.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
      {showPopup && (
        <CategoryEditDialog
          data={data}
          setData={setData}
          isOpen={showPopup}
          handleClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};
