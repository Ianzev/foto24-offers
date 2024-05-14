import React, { useState } from "react";
import { useParams } from "react-router-dom";

//COMPONENT
import Button from "../components/ui/Button";
import GoBackArrow from "../components/ui/GoBackArrow";
import TitleHeader from "../components/ui/TitleHeader";
import TableData from "../components/TableData";
import Table from "../components/Table";
import TableVertical from "../components/TableVertical";

import csvFunctions from "../utils/arrayToCSV";
import {
  fetchOfferDetails,
  fetchOfferProducts,
} from "../utils/fetching/fetchOffers";
import {
  offerPageProductsColumns,
  offerPageVerticalColumns,
} from "../utils/tableColumnsData";

function OfferDetails() {
  const { id } = useParams();
  const [offer, setOffer] = useState(null);
  const [products, setProducts] = useState(null);

  const offerDetails = fetchOfferDetails(setOffer, id);
  const offerProducts = fetchOfferProducts(setProducts, id);

  const columnsVertical = offerPageVerticalColumns;
  const columnsProducts = offerPageProductsColumns;

  if (!offer) {
    return <div>Loading...</div>;
  }

  if (!products) {
    return <div>Loading...</div>;
  }
  const secondArrayMap = products.reduce((map, obj) => {
    map[obj.sku] = obj;
    return map;
  }, {});

  // Create the final array by combining data from both arrays
  const finalProductsArray = offer.products.map((item) => {
    const additionalInfo = secondArrayMap[item.sku];
    return {
      sku: item.sku,
      name: additionalInfo ? additionalInfo.name : "", // If additionalInfo exists, get the name, otherwise use an empty string
      price: additionalInfo ? additionalInfo.price : "", // If additionalInfo exists, get the price, otherwise use an empty string
      priceReduced: item.price,
      brand: additionalInfo ? additionalInfo.brand : "", // If additionalInfo exists
    };
  });

  return (
    <>
      <TitleHeader text={offer.name}>
        <GoBackArrow text="Back to Offers" backTo="offers" />
      </TitleHeader>

      <Table>
        <TableVertical entry={offer} columns={columnsVertical} />
      </Table>

      <TitleHeader text="Sales">
        <Button
          text="CSV"
          action={() => {
            const csvContent =
              csvFunctions.convertArrayOfObjectsToCSV(finalProductsArray);
            csvFunctions.downloadCSV(csvContent, `${offer.name}.csv`);
          }}
        />
      </TitleHeader>

      <Table>
        <TableData entries={finalProductsArray} columns={columnsProducts} />
      </Table>
    </>
  );
}

export default OfferDetails;
