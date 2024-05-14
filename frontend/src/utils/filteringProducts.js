export const filterProductsByBrand = (
  products,
  brand,
  setCurrentPage,
  setProducts,
  stockMin,
  stockMax
) => {
  const filteredBrand = products.filter((product) => product.brand === brand);

  const filteredStock = filteredBrand.filter(
    (product) =>
      stockMin < product.stockmalaga + product.stockqmedia &&
      product.stockmalaga + product.stockqmedia < stockMax
  );
  setProducts(filteredStock);
  setCurrentPage(1);
};
