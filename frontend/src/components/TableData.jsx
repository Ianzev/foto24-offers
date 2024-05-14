import React from "react";
import { Link } from "react-router-dom";
import { ArrowBigRight } from "lucide-react";

export default function TableData({ entries, columns }) {
  return (
    <tbody>
      {entries.map((entry) => (
        <tr key={entry.name}>
          {columns.map((column) => (
            <td key={column.columnName}>
              <ColumnData column={column} entry={entry} />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

function ColumnData({ column, entry }) {
  const specialCases = {
    sku: () => (
      <Link className="link" to={`/products/${entry[column.columnName]}`}>
        {entry[column.columnName]}
      </Link>
    ),
    urlfoto24: () => (
      <a className="link" href={entry[column.columnName]}>
        <ArrowBigRight size={20} />
      </a>
    ),
    urlphoto24: () => (
      <a className="link" href={entry[column.columnName]}>
        <ArrowBigRight size={20} />
      </a>
    ),
    id: () => (
      <Link className="link" to={`/offers/${entry[column.columnName]}`}>
        {entry[column.columnName]}
      </Link>
    ),
    start_date: () => new Date(entry[column.columnName]).toLocaleDateString(),
    end_date: () => new Date(entry[column.columnName]).toLocaleDateString(),
    products: () => entry[column.columnName].length,
  };

  const renderContent =
    specialCases[column.columnName] || (() => entry[column.columnName]);

  return renderContent();
}
