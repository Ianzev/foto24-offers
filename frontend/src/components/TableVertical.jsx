import React from "react";
import { Link } from "react-router-dom";
import { ArrowBigRight } from "lucide-react";

export default function TableVertical({ entry, columns }) {
  return (
    <tbody>
      {columns.map((column) => (
        <tr key={column.displayName}>
          <th>{column.displayName}</th>
          <td>
            <ColumnData column={column} entry={entry[column.columnName]} />
          </td>
        </tr>
      ))}
    </tbody>
  );
}

function ColumnData({ column, entry }) {
  const specialCases = {
    urlfoto24: () => (
      <a className="link" href={entry}>
        <ArrowBigRight size={20} />
      </a>
    ),
    urlphoto24: () => (
      <a className="link" href={entry}>
        <ArrowBigRight size={20} />
      </a>
    ),
    id: () => (
      <Link className="link" to={`/offers/${entry}`}>
        {entry}
      </Link>
    ),
    start_date: () => new Date(entry).toLocaleDateString(),
    end_date: () => new Date(entry).toLocaleDateString(),
    products: () => entry.length,
  };

  const renderContent = specialCases[column.columnName] || (() => entry);

  return renderContent();
}
