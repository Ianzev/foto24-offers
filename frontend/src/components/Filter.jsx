import React, { useEffect, useState } from "react";
import styles from "./filter.module.css";

export default function Filter({ entries }) {
  const [formData, setFormData] = useState({
    brand: "", // Initial value for brand
    availability: "", // Initial value for availibility
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className={styles["filter-bar"]}>
      <div id={styles["filter-bar-title"]}>
        <p>Filters</p>
      </div>
      <div className={styles["filter-selection"]}>
        {entries.map((entry) => (
          <section key={entry.displayName}>
            <h1>{entry.displayName}</h1>
            {entry.values.map((valuesSingle) => (
              <div key={valuesSingle}>
                <label htmlFor={valuesSingle}>
                  <input
                    name={entry.inputValue}
                    type={entry.type}
                    id={entry.inputValue}
                    value={valuesSingle} // Corrected here
                    onChange={handleInputChange}
                  />
                  {valuesSingle}
                </label>
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}

export const filterValuesData = [
  {
    displayName: "Brand",
    values: ["Godox", "Genesis", "Irix"],
    type: "checkbox",
    inputValue: "brand",
  },
  {
    displayName: "Availability",
    values: ["Available", "Not available"],
    type: "radio",
    inputValue: "availibility",
  },
];
