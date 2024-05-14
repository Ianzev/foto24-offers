import React, { useState } from "react";

//COMPONENT
import GoBackArrow from "../components/ui/GoBackArrow";
import TitleHeader from "../components/ui/TitleHeader";
import TableHeader from "../components/TableHeader";
import TableData from "../components/TableData";
import Table from "../components/Table";

import { fetchAllOffers } from "../utils/fetching/fetchOffers";
import { offerColumns } from "../utils/tableColumnsData";

function Offers() {
  const [offers, setOffers] = useState([]);

  const allOffers = fetchAllOffers(setOffers);

  const columns = offerColumns;

  return (
    <>
      <TitleHeader text="Offers">
        <GoBackArrow text="Home Page" backTo="" />
      </TitleHeader>

      <Table>
        <TableHeader columns={columns} />
        <TableData entries={offers} columns={columns} />
      </Table>
    </>
  );
}

export default Offers;
