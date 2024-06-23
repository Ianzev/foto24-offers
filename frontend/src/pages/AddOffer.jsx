import React, { useEffect, useState } from "react";

//COMPONENTS
import Pagination from "../components/Pagination/Pagination.jsx";
import Button from "../components/ui/Button.jsx";
import TitleHeader from "../components/ui/TitleHeader.jsx";
import TableHeader from "../components/TableHeader.jsx";
import TableData from "../components/TableData.jsx";
import Table from "../components/Table.jsx";
import GoBackArrow from "../components/ui/GoBackArrow.jsx";

import { fetchAllProducts } from "../utils/fetching/fetchProducts.js";

import { handleSort, sortProducts } from "./../utils/sortingMechanism";
import { productsColumnsAddOffer } from "../utils/tableColumnsData.js";
import { handleAddOfferToDB } from "../utils/fetching/fetchOffers.js";

function AddOffer() {
  const [products, setProducts] = useState([]);
  const [productsCopy, setProductsCopy] = useState([]);

  const [sortBy, setSortBy] = useState("id"); // Default sort by id
  const [sortOrder, setSortOrder] = useState("asc"); // Default sort order ascending

  const [currentPage, setCurrentPage] = useState(1); // page paginations
  const [productsPerPage, setProductsPerPage] = useState(50); // products per page

  const lastPostIndex = currentPage * productsPerPage;
  const firstPostIndex = lastPostIndex - productsPerPage;

  fetchAllProducts(setProducts);
  fetchAllProducts(setProductsCopy);

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

  const columns = productsColumnsAddOffer; // TABLE COLUMN HEADINGS

  const [selectedEntries, setSelectedEntries] = useState([]);

  // Callback function to update parent state
  const handleSelectedEntriesChange = (entries) => {
    setSelectedEntries(entries);
  };

  const handleAddOffer = () => {
    const offerData = {
      name: "Offer Name",
      start_date: "2024-06-21",
      end_date: "2024-06-30",
      products: selectedEntries,
    };
    handleAddOfferToDB(offerData);
  };

  return (
    <>
      <TitleHeader text="Add offer">
        <Button text="Add" action={handleAddOffer} />
        <GoBackArrow text="Home Page" backTo="" />
      </TitleHeader>

      <Table>
        <TableHeader
          columns={columns}
          action={handleSortClick}
          sortBy={sortBy}
          sortOrder={sortOrder}
        />
        <TableData
          entries={currentProducts}
          columns={columns}
          onSelectedEntriesChange={handleSelectedEntriesChange}
        />
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

export default AddOffer;
