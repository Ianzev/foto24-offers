export const filterProductsByBrand = (products, brand) => {
  const filteredBrand = products.filter((product) => product.brand === brand);
  return filteredBrand;
};

export const filterProductsByAvailability = (products, availability) => {
  const filteredAvailability = products.filter((product) =>
    availability === "Available"
      ? product.stockmalaga + product.stockqmedia > 0
      : availability === "Not available"
      ? product.stockmalaga + product.stockqmedia == 0
      : ""
  );
  return filteredAvailability;
};

export const filterProducts = (
  products,
  brand,
  availability,
  setCurrentPage,
  setProducts
) => {
  let products1 = products;
  if (availability !== "") {
    products1 = filterProductsByAvailability(products1, availability);
  }
  if (brand !== "") {
    products1 = filterProductsByBrand(products1, brand);
  }
  setProducts(products1);
  setCurrentPage(1);
};
