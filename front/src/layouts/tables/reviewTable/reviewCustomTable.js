import React, { useState } from "react";

import PropTypes from "prop-types";
import CustomDataTable from "examples/CustomTable/CustomDataTable";
import { ExpandedContent } from "./expanded/expandedContent";

export const ReviewCustomTable = ({ columns, rows, expanded }) => {
  const [data, setData] = useState();
  const handleSubmit = () => {
    console.log(data);
  };
  const handleDataChange = (event) => {
    setData(event.target.value); // 입력한 답변 텍스트 업데이트
  };
  return (
    <CustomDataTable
      canSearch={true}
      table={{ columns: columns, rows: rows }}
      isSorted={false}
      entriesPerPage={false}
      showTotalEntries={false}
      noEndBorder
      handleDataChange={handleDataChange}
      handleSubmit={handleSubmit}
      expanded={(rowData) => <ExpandedContent rowData={rowData} />}
    />
  );
};

ReviewCustomTable.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  expanded: PropTypes.element,
};

ReviewCustomTable.defaultType = {
  expanded: null,
};
