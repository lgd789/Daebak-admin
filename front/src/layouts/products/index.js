// /**
// =========================================================
// * Material Dashboard 2 React - v2.2.0
// =========================================================

// * Product Page: https://www.creative-tim.com/product/material-dashboard-react
// * Copyright 2023 Creative Tim (https://www.creative-tim.com)

// Coded by www.creative-tim.com

//  =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// */

// // @mui material components
// import { useState } from "react";

// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";

// // Material Dashboard 2 React components
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";

// // Material Dashboard 2 React example components
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
// import DataTable from "examples/Tables/DataTable";

// // Data
// import productsTableData from "layouts/products/data/productsTableData";
// import productDealsTableData from "layouts/products/data/productDealsTableData";
// import MDButton from "components/MDButton";

// import { ProductDealsTable } from "../tables/productDealsTable";
// import { ProductTable } from "../tables/productTable";

// function Products() {
//   const {
//     columns: productsColumns,
//     rows: productsRows,
//     recommendedRows: recommendedProductsRows,
//   } = productsTableData();
//   const { columns: productDealsColumns, rows: productDealsRows } = productDealsTableData();
//   const [showProductDeal, setShowProductDeal] = useState(false);
//   const [showProduct, setShowProduct] = useState(false);
//   const [rowData, setRowData] = useState();
//   const handleAddProductDeal = () => {
//     setRowData("");
//     setShowProductDeal(!showProductDeal);
//     console.log(rowData);
//   };
//   const handleAddProduct = () => {
//     setRowData("");
//     setShowProduct(!showProduct);
//     console.log(rowData);
//   };

//   console.log("index");
//   return (
//     <>
//       <DashboardLayout>
//         <DashboardNavbar />
//         <MDBox pt={6} pb={3}>
//           <Grid container spacing={6}>
//             <Grid item xs={12}>
//               <Card>
//                 <MDBox
//                   mx={2}
//                   mt={-3}
//                   py={3}
//                   px={2}
//                   variant="gradient"
//                   bgColor="error"
//                   borderRadius="lg"
//                   coloredShadow="error"
//                 >
//                   <MDTypography variant="h5" color="white">
//                     <div
//                       style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                       }}
//                     >
//                       <span>타임 특가 상품</span>
//                       <MDButton variant="h2" color="white" onClick={handleAddProductDeal}>
//                         추가
//                       </MDButton>
//                     </div>
//                   </MDTypography>
//                 </MDBox>
//                 <MDBox pt={3}>
//                   <DataTable
//                     table={{ columns: productDealsColumns, rows: productDealsRows }}
//                     isSorted={false}
//                     entriesPerPage={false}
//                     showTotalEntries={false}
//                     noEndBorder
//                   />
//                 </MDBox>
//               </Card>
//             </Grid>
//             <Grid item xs={12}>
//               <Card>
//                 <MDBox
//                   mx={2}
//                   mt={-3}
//                   py={3}
//                   px={2}
//                   variant="gradient"
//                   bgColor="error"
//                   borderRadius="lg"
//                   coloredShadow="error"
//                 >
//                   <MDTypography variant="h5" color="white">
//                     추천 상품
//                   </MDTypography>
//                 </MDBox>
//                 <MDBox pt={3}>
//                   <DataTable
//                     table={{ columns: productsColumns, rows: recommendedProductsRows }}
//                     isSorted={false}
//                     entriesPerPage={false}
//                     showTotalEntries={false}
//                     noEndBorder
//                   />
//                 </MDBox>
//               </Card>
//             </Grid>
//             <Grid item xs={12}>
//               <Card>
//                 <MDBox
//                   mx={2}
//                   mt={-3}
//                   py={3}
//                   px={2}
//                   variant="gradient"
//                   bgColor="info"
//                   borderRadius="lg"
//                   coloredShadow="info"
//                 >
//                   <MDTypography variant="h5" color="white">
//                     <div
//                       style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                       }}
//                     >
//                       <span>모든 상품</span>
//                       <MDButton variant="h2" color="white" onClick={handleAddProduct}>
//                         추가
//                       </MDButton>
//                     </div>
//                   </MDTypography>
//                 </MDBox>
//                 <MDBox pt={3}>
//                   <DataTable
//                     table={{ columns: productsColumns, rows: productsRows }}
//                     isSorted={true}
//                     entriesPerPage={true}
//                     showTotalEntries={true}
//                     canSearch={true}
//                     noEndBorder
//                   />
//                 </MDBox>
//               </Card>
//             </Grid>
//           </Grid>
//         </MDBox>
//         <Footer />
//       </DashboardLayout>

//       {showProductDeal && (
//         <ProductDealsTable
//           rowData={rowData}
//           setRowData={setRowData}
//           isOpen={true}
//           handleEditDialogClose={handleAddProductDeal}
//           handleEditDialogSubmit={handleAddProductDeal}
//         />
//       )}

//       {showProduct && (
//         <ProductTable
//           rowData={rowData}
//           setRowData={setRowData}
//           isOpen={true}
//           handleEditDialogClose={handleAddProduct}
//           handleEditDialogSubmit={handleAddProduct}
//         />
//       )}
//     </>
//   );
// }

// export default Products;
