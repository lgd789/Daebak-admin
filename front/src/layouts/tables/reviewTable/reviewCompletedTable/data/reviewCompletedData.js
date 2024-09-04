import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import reviewTableData from "layouts/tables/reviewTable/data/reviewTableData";
import datas from "../../data/datas";

export default function data() {
  const { reviews } = useSelector((state) => state.reviews);

  const customDatas = reviews.filter((data) => data.response.length > 0);

  const {
    columns: completedReviewColumns,
    rows: completedReviewRows,
    expanded: expanded,
  } = reviewTableData({ customDatas });

  return {
    columns: completedReviewColumns,
    rows: completedReviewRows,
    expanded: expanded,
  };
}
