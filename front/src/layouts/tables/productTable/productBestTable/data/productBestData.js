/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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
import ProductsTableData from "../../data/productsTableData";
import { useSelector } from "react-redux";

export default function data() {
  const { products } = useSelector((state) => state.products);
  console.log(products);
  const { customDatas } = products.reduce(
    (acc, data) => {
      if (data.popularity === true) {
        acc.customDatas.push(data);
      }
      return acc;
    },
    { customDatas: [] }
  );

  const { columns, rows } = ProductsTableData({ customDatas });

  return {
    columns: columns,

    rows: rows,
  };
}
