export function handleSort(criteria, setSortBy, setSortOrder) {
  if (sortBy === criteria) {
    // If already sorted by the same criteria, toggle the order
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  } else {
    // If sorting by a new criteria, set the new criteria and default to ascending order
    setSortBy(criteria);
    setSortOrder("asc");
  }
  setCurrentPage(1);
}

export function sortedProducts(products) {
  products.slice().sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];

    // Convert price values to numbers for correct sorting
    if (sortBy === "price") {
      aValue = parseFloat(aValue.replace(/[^\d.-]/g, ""));
      bValue = parseFloat(bValue.replace(/[^\d.-]/g, ""));
    }

    if (sortOrder === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });
}
