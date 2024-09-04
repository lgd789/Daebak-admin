import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import qnaTableData from "layouts/tables/qnaTable/data/qnaTableData";

export default function data() {
  const { qnas } = useSelector((state) => state.qnas);

  const customDatas = qnas.filter((data) => data.answers.length > 0);

  const {
    columns: completedQnaColumns,
    rows: completedQnaRows,
    expanded: expanded,
  } = qnaTableData({ customDatas });

  return {
    columns: completedQnaColumns,
    rows: completedQnaRows,
    expanded: expanded,
  };
}
