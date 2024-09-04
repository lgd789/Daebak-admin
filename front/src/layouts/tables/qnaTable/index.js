import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { QnaCompletedTable } from "./qnaCompletedTable";
import { QnaMissingTable } from "./qnaMissingTable";

function QnaTable() {
  const { status } = useSelector((state) => state.qnas);
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  return (
    <>
      <QnaMissingTable />
      <QnaCompletedTable />
    </>
  );
}
export default QnaTable;
