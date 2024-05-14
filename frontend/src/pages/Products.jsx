import React, { useState } from "react";

//COMPONENTS
import Pagination from "../components/Pagination/Pagination.jsx";
import Button from "../components/ui/Button.jsx";
import TitleHeader from "../components/ui/TitleHeader.jsx";
import TableHeader from "../components/TableHeader.jsx";
import TableData from "../components/TableData.jsx";
import Table from "../components/Table.jsx";
import GoBackArrow from "../components/ui/GoBackArrow.jsx";
import Filter, { filterValuesData } from "../components/Filter.jsx";

import {
  fetchAllProducts,
  handleUpdateStock,
} from "../utils/fetching/fetchProducts.js";
import { filterProductsByBrand } from "../utils/filteringProducts.js";

import { handleSort, sortProducts } from "./../utils/sortingMechanism";
import { productsColumns } from "../utils/tableColumnsData.js";

function ProductsTable() {
  const [products, setProducts] = useState([]);

  const [sortBy, setSortBy] = useState("id"); // Default sort by id
  const [sortOrder, setSortOrder] = useState("asc"); // Default sort order ascending

  const [currentPage, setCurrentPage] = useState(1); // page paginations
  const [productsPerPage, setProductsPerPage] = useState(50); // products per page

  const lastPostIndex = currentPage * productsPerPage;
  const firstPostIndex = lastPostIndex - productsPerPage;

  const allProducts = fetchAllProducts(setProducts);

  const handleSortClick = (criteria) => {
    handleSort(
      criteria,
      sortBy,
      setSortBy,
      sortOrder,
      setSortOrder,
      setCurrentPage
    );
  };

  const sortedProducts = sortProducts(products, sortBy, sortOrder);

  const currentProducts = sortedProducts.slice(firstPostIndex, lastPostIndex); //PAGINATION

  const columns = productsColumns; // TABLE COLUMN HEADINGS

  const filterValues = filterValuesData;

  // const filterProducts = () => {
  //   filterProductsByBrand(products, "", setCurrentPage, setProducts, 900, 1300);
  // };

  return (
    <>
      <TitleHeader text="Products">
        {/* <Button text="GODOX" action={filterProducts} /> */}
        <Button text="Update" action={handleUpdateStock} />
        <GoBackArrow text="Home Page" backTo="" />
      </TitleHeader>
      <Filter entries={filterValues} />
      <Table>
        <TableHeader
          columns={columns}
          action={handleSortClick}
          sortBy={sortBy}
          sortOrder={sortOrder}
        />
        <TableData entries={currentProducts} columns={columns} />
      </Table>

      <Pagination
        postPerPage={productsPerPage}
        totalPosts={products.length}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
}

export default ProductsTable;
