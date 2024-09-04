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
import { useState } from "react";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Data
import AuthorsTable from "./authorsTable";
import ProductTable from "./productTable";
import ReviewTable from "./reviewTable";
import CategoryTable from "./categoryTable";

// CheckBox
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel, FormGroup } from "@mui/material";
import QnaTable from "./qnaTable";
import { CouponTable } from "./couponTable";
import { useSelector } from "react-redux";
import couponSlice from "reducers/slices/couponSlice";
import Loading from "components/Loading";
import { ProductDealTable } from "./productDealTable";
import { BannerTable } from "./bannerTable";
import { CarouselTable } from "./bannerTable/carouselTable";
import { VideoTable } from "./bannerTable/videoTable";

const items = [
  { key: "users", label: "사용자", component: <AuthorsTable /> },
  { key: "categories", label: "카테고리", component: <CategoryTable /> },
  { key: "productDeals", label: "타임 특가", component: <ProductDealTable /> },
  { key: "products", label: "상품", component: <ProductTable /> },
  { key: "reviews", label: "상품 리뷰", component: <ReviewTable /> },
  { key: "qnas", label: "Q&A", component: <QnaTable /> },
  { key: "coupons", label: "쿠폰", component: <CouponTable /> },
  { key: "carousel", label: "캐러샐", component: <CarouselTable /> },
  { key: "video", label: "홍보 영상", component: <VideoTable /> },
];

const slice = ["categories", "coupons", "dealProducts", "members", "products", "qnas", "reviews"];
function Tables() {
  const categoriesStatus = useSelector((state) => state.categories.status);
  const couponsStatus = useSelector((state) => state.coupons.status);
  const dealProductsStatus = useSelector((state) => state.dealProducts.status);
  const membersStatus = useSelector((state) => state.members.status);
  const productsStatus = useSelector((state) => state.products.status);
  const qnasStatus = useSelector((state) => state.qnas.status);
  const reviewsStatus = useSelector((state) => state.reviews.status);
  const carouselStatus = useSelector((state) => state.carousel.status);
  const promotionalVideoStatus = useSelector((state) => state.promotionalVideo.status);

  const statusMap = {
    users: membersStatus,
    categories: categoriesStatus,
    productDeals: dealProductsStatus,
    products: productsStatus,
    reviews: reviewsStatus,
    qnas: qnasStatus,
    coupons: couponsStatus,
    carousel: carouselStatus,
    video: promotionalVideoStatus,
  };

  const [selectedItems, setSelectedItems] = useState(items.map((item) => item.key));

  const handleCheckboxClick = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map((item) => item.key));
    }
  };

  // const isLoading = [categories, coupons, dealProducts, members, products, qnas, reviews].includes(
  //   "loading"
  // );

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={selectedItems.length === items.length}
                onChange={handleSelectAll}
              />
            }
            label="모두 선택"
          />
          {items.map((item) => (
            <FormControlLabel
              key={item.key}
              control={
                <Checkbox
                  color="primary"
                  checked={selectedItems.includes(item.key)}
                  onChange={() => handleCheckboxClick(item.key)}
                />
              }
              label={item.label}
            />
          ))}
        </FormGroup>
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            {items.map((item) => {
              const isLoading = statusMap[item.key] === "loading";
              return (
                <>
                  {selectedItems.includes(item.key) &&
                    (isLoading ? (
                      <Grid item xs={12} key={item.key}>
                        <Loading />
                      </Grid>
                    ) : (
                      item.component
                    ))}
                </>
              );
            })}
          </Grid>
        </MDBox>
        <Footer />
      </DashboardLayout>
    </>
  );
}

export default Tables;
