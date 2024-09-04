import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import reviewTableData from "layouts/tables/reviewTable/data/reviewTableData";
import datas from "../../data/datas";

export default function data() {
  const { reviews } = useSelector((state) => state.reviews);

  //   답변 등록이 완료된 데이터를 넣어줘야함.
  const customDatas = reviews.filter((data) => data.response.length === 0);

  const {
    columns: missingReviewColumns,
    rows: missingReviewRows,
    expanded: expanded,
  } = reviewTableData({ customDatas });

  return {
    columns: missingReviewColumns,
    rows: missingReviewRows,
    expanded: expanded,
  };
}
