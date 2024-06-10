import React, { useEffect, useState } from "react";
import styles from "./filter.module.css";
import { filterProducts } from "../utils/filteringProducts";

export default function Filter({
  entries,
  products,
  setCurrentPage,
  setProducts,
}) {
  const [formData, setFormData] = useState({
    brand: "",
    availability: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const filterProductsAll = (brand, availability) => {
    filterProducts(products, brand, availability, setCurrentPage, setProducts);
  };

  useEffect(() => {
    filterProductsAll(formData.brand, formData.availability);
  }, [formData.brand, formData.availability]);

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
