import React, { useEffect, useState } from "react";
import styles from "./filter.module.css";
import {
  filterProductsByBrand,
  filterProductsByAvailability,
} from "../utils/filteringProducts";

export default function Filter({
  entries,
  products,
  setCurrentPage,
  setProducts,
}) {
  const [formData, setFormData] = useState({
    brand: "", // Initial value for brand
    availability: "", // Initial value for availibility
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const filterProductsBrand = (brand) => {
    filterProductsByBrand(products, brand, setCurrentPage, setProducts);
  };

  const filterProductsAvailability = (availability) => {
    filterProductsByAvailability(
      products,
      availability,
      setCurrentPage,
      setProducts
    );
  };

  useEffect(() => {
    filterProductsBrand(formData.brand);
  }, [formData.brand]);

  useEffect(() => {
    filterProductsAvailability(formData.availability);
  }, [formData.availability]);

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
