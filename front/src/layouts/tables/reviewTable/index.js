import { useState } from "react";
import { useSelector } from "react-redux";
import { ReviewCompletedTable } from "./reviewCompletedTable";
import { ReviewMissingTable } from "./reviewMissingTable";

function ReviewTable() {
  const { status } = useSelector((state) => state.reviews);
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  return (
    <>
      <ReviewMissingTable />
      <ReviewCompletedTable />
    </>
  );
}
export default ReviewTable;
