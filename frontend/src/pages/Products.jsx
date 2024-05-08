import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Pagination from "../components/Pagination/Pagination.jsx"; //COMPONENT
import Button from "../components/ui/Button.jsx"; //COMPONENT
import Header from "../components/ui/Header.jsx"; //COMPONENT

import { ArrowBigRight } from "lucide-react";
import styles from "./styles/pages.module.css";

import {
  fetchAllProducts,
  handleUpdateStock,
} from "../utils/fetching/fetchProducts.js";
import {
  handleSort,
  sortedProducts,
} from "../utils/fetching/sortingMechanism.js";

function ProductsTable() {
  const [products, setProducts] = useState([]);

  const [sortBy, setSortBy] = useState("id"); // Default sort by id
  const [sortOrder, setSortOrder] = useState("asc"); // Default sort order ascending

  const [currentPage, setCurrentPage] = useState(1); // page paginations
  const [productsPerPage, setProductsPerPage] = useState(50); // products per page

  const lastPostIndex = currentPage * productsPerPage;
  const firstPostIndex = lastPostIndex - productsPerPage;

  const allProducts = fetchAllProducts(setProducts);

  // const handleSort = handleSort(criteria, setSortBy, setSortOrder)
  // const sortedProducts = sortedProducts(products)

  const handleSort = (criteria) => {
    if (sortBy === criteria) {
      // If already sorted by the same criteria, toggle the order
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // If sorting by a new criteria, set the new criteria and default to ascending order
      setSortBy(criteria);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  const sortedProducts = products.slice().sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];

    // Convert price values to numbers for correct sorting
    if (sortBy === "price") {
      aValue = parseFloat(aValue.replace(/[^\d.-]/g, ""));
      bValue = parseFloat(bValue.replace(/[^\d.-]/g, ""));
    }

    if (sortOrder === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const currentProducts = sortedProducts.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      <Header text="Products">
        <Button text="Update" action={handleUpdateStock} />
      </Header>

      <table className={styles["items-table"]}>
        <thead>
          <tr>
            <th onClick={() => handleSort("id")}>
              ID {sortBy === "id" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("sku")}>
              SKU {sortBy === "sku" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("name")}>
              Name {sortBy === "name" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("price")}>
              Price {sortBy === "price" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("foto24")}>
              Foto24 {sortBy === "foto24" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("photo24")}>
              Photo24{" "}
              {sortBy === "photo24" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("stockmalaga")}>
              Malaga{" "}
              {sortBy === "stockmalaga" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("stockqmedia")}>
              Qmedia{" "}
              {sortBy === "stockqmedia" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("sales1")}>
              1 day {sortBy === "sales1" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("sales10")}>
              10 days{" "}
              {sortBy === "sales10" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("sales30")}>
              30 days{" "}
              {sortBy === "sales30" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("sales90")}>
              90 days{" "}
              {sortBy === "sales90" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("sales180")}>
              180 days{" "}
              {sortBy === "sales180" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("sales365")}>
              365 days{" "}
              {sortBy === "sales365" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("brand")}>
              Brand {sortBy === "brand" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.sku}>
              <td>{product.idnext}</td>
              <td>
                <Link className="link" to={`/products/${product.sku}`}>
                  {product.sku}
                </Link>
              </td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td className="link">
                <a className="link" href={product.urlfoto24}>
                  {<ArrowBigRight size={20} />}
                </a>
              </td>
              <td>
                <a className="link" href={product.urlphoto24}>
                  {<ArrowBigRight size={20} />}
                </a>
              </td>
              <td>{product.stockmalaga}</td>
              <td>{product.stockqmedia}</td>
              <td>{product.sales1}</td>
              <td>{product.sales10}</td>
              <td>{product.sales30}</td>
              <td>{product.sales90}</td>
              <td>{product.sales180}</td>
              <td>{product.sales365}</td>
              <td>{product.brand}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
