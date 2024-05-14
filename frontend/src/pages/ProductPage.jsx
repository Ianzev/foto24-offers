import React, { useState } from "react";
import { useParams } from "react-router-dom";

//COMPONENT
import GoBackArrow from "../components/ui/GoBackArrow";
import TitleHeader from "../components/ui/TitleHeader";
import Table from "../components/Table";
import TableVertical from "../components/TableVertical";
import TableHeader from "../components/TableHeader";
import TableData from "../components/TableData";

import { fetchProductDetails } from "../utils/fetching/fetchProducts";
import {
  productPageSalesColumns,
  productPageVerticalColumns,
} from "../utils/tableColumnsData";

function ProductDetails() {
  const { sku } = useParams();
  const [product, setProduct] = useState(null);

  const productDetails = fetchProductDetails(setProduct, sku);
  const columnsVertical = productPageVerticalColumns;
  const columnsSales = productPageSalesColumns;

  if (!product) {
    return <div>Loading...</div>;
  }

  const productArray = [
    Object.keys(product).reduce(
      (acc, key) => ({ ...acc, [key]: product[key] }),
      {}
    ),
  ];

  return (
    <>
      <TitleHeader text={product.name}>
        <GoBackArrow text="Back to Products" backTo="products" />
      </TitleHeader>

      <Table>
        <TableVertical entry={product} columns={columnsVertical} />
      </Table>

      <TitleHeader text="Sales" />

      <Table>
        <TableHeader columns={columnsSales} />
        <TableData entries={productArray} columns={columnsSales} />
      </Table>
    </>
  );
}

export default ProductDetails;
