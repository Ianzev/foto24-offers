import React from "react";
import styles from "../pages/styles/pages.module.css";

export default function TableHeader({ columns, action, sortBy, sortOrder }) {
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            className={`${sortBy == column.columnName ? styles["sorted"] : ""}`}
            key={column.columnName}
            onClick={() => action(column.columnName)}
          >
            {column.displayName}{" "}
            {sortBy === column.columnName && (sortOrder === "asc" ? "▲" : "▼")}
          </th>
        ))}
      </tr>
    </thead>
  );
}
