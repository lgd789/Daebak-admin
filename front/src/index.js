import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";
import { Provider } from "react-redux";
import store from "reducers/store";
import { fetchProducts } from "reducers/slices/productSlice";
import { fetchMembers } from "reducers/slices/memberSlice";
import { fetchCoupons } from "reducers/slices/couponSlice";
import { fetchReviews } from "reducers/slices/reviewSlice";
import { fetchQnas } from "reducers/slices/qnaSlice";
import { fetchCategories } from "reducers/slices/categorySlice";
import { fetchPaymentDetails } from "reducers/slices/paymentDetailSlice";
import { fetchDealProducts } from "reducers/slices/dealProductSlice";
import { fetchCarousel } from "reducers/slices/carouselSlice";
import { fetchPromotionalVideo } from "reducers/slices/promotionalVidoeSlice";

const container = document.getElementById("app");
const root = createRoot(container);

store.dispatch(fetchProducts());
store.dispatch(fetchMembers());
store.dispatch(fetchCoupons());
store.dispatch(fetchReviews());
store.dispatch(fetchQnas());
store.dispatch(fetchCategories());
store.dispatch(fetchPaymentDetails());
store.dispatch(fetchDealProducts());
store.dispatch(fetchCarousel());
store.dispatch(fetchPromotionalVideo());

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <MaterialUIControllerProvider>
        <App />
      </MaterialUIControllerProvider>
    </Provider>
  </BrowserRouter>
);
