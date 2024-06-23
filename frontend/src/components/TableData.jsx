import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowBigRight } from "lucide-react";

export default function TableData({
  entries,
  columns,
  onSelectedEntriesChange,
}) {
  const [selectedEntries, setSelectedEntries] = useState([]);

  useEffect(() => {
    const initialSelected = entries
      .filter((entry) => entry.selected)
      .map((entry) => ({ sku: entry.sku, price: 0 }));
    setSelectedEntries(initialSelected);
  }, [entries]);

  const handleCheckboxChange = (sku, checked) => {
    setSelectedEntries((prevSelected) => {
      if (checked) {
        return [...prevSelected, { sku, price: 0 }];
      } else {
        return prevSelected.filter((entry) => entry.sku !== sku);
      }
    });
  };

  const handlePriceChange = (sku, price) => {
    setSelectedEntries((prevSelected) =>
      prevSelected.map((entry) =>
        entry.sku === sku ? { ...entry, price: parseFloat(price) || 0 } : entry
      )
    );
  };

  return (
    <tbody>
      {entries.map((entry) => (
        <tr key={entry.sku}>
          {columns.map((column) => (
            <td key={column.columnName}>
              <ColumnData
                column={column}
                entry={entry}
                selected={selectedEntries.some(
                  (selectedEntry) => selectedEntry.sku === entry.sku
                )}
                onCheckboxChange={(checked) =>
                  handleCheckboxChange(entry.sku, checked)
                }
                onPriceChange={(price) => handlePriceChange(entry.sku, price)}
              />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

function ColumnData({
  column,
  entry,
  selected,
  onCheckboxChange,
  onPriceChange,
}) {
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
    select: () => (
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onCheckboxChange(e.target.checked)}
      />
    ),
    addPrice: () => (
      <input type="text" onChange={(e) => onPriceChange(e.target.value)} />
    ),
  };

  const renderContent =
    specialCases[column.columnName] || (() => entry[column.columnName]);

  return renderContent();
}
