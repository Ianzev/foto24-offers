export const filterProductsByBrand = (
  products,
  brand,
  setCurrentPage,
  setProducts
) => {
  const filteredBrand = products.filter((product) => product.brand === brand);
  setProducts(filteredBrand);
  setCurrentPage(1);
};

export const filterProductsByAvailability = (
  products,
  availability,
  setCurrentPage,
  setProducts
) => {
  const filteredAvailability = products.filter((product) =>
    availability === "Available"
      ? product.stockmalaga + product.stockqmedia > 0
      : availability === "Not available"
      ? product.stockmalaga + product.stockqmedia == 0
      : ""
  );
  setProducts(filteredAvailability);
  setCurrentPage(1);
};
