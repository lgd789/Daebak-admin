import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import memberReducer from "./slices/memberSlice";
import couponReducer from "./slices/couponSlice";
import reviewReducer from "./slices/reviewSlice";
import qnaReducer from "./slices/qnaSlice";
import categoryReducer from "./slices/categorySlice";
import paymentDetailReducer from "./slices/paymentDetailSlice";
import dealProductReducer from "./slices/dealProductSlice";
import carouselReducer from "./slices/carouselSlice";
import promotionalVideoReducer from "./slices/promotionalVidoeSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    members: memberReducer,
    coupons: couponReducer,
    reviews: reviewReducer,
    qnas: qnaReducer,
    categories: categoryReducer,
    paymentDetails: paymentDetailReducer,
    dealProducts: dealProductReducer,
    carousel: carouselReducer,
    promotionalVideo: promotionalVideoReducer,
  },
});

export default store;
