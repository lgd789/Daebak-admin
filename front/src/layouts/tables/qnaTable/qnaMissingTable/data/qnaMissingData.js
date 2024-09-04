import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import qnaTableData from "layouts/tables/qnaTable/data/qnaTableData";

export default function data() {
  const { qnas } = useSelector((state) => state.qnas);

  const customDatas = qnas.filter((data) => data.answers.length === 0);

  const {
    columns: missingQnaColumns,
    rows: missingQnaRows,
    expanded: expanded,
  } = qnaTableData({ customDatas });

  return {
    columns: missingQnaColumns,
    rows: missingQnaRows,
    expanded: expanded,
  };
}
