import { useEffect } from "react";

export function fetchAllProducts(products) {
  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((response) => response.json())
      .then((data) => {
        products(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);
}

export function fetchProductDetails(product, sku) {
  useEffect(() => {
    fetch(`http://localhost:3001/products/${sku}`)
      .then((response) => response.json())
      .then((data) => {
        product(data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [sku]);
}

export function fetchOfferProducts(products, id) {
  useEffect(() => {
    fetch(`http://localhost:3001/offers/${id}/products`)
      .then((response) => response.json())
      .then((productsData) => {
        products(productsData);
      })
      .catch((error) => {
        console.error("Error fetching offer products:", error);
      });
  }, [id]);
}

export const handleUpdateStock = async () => {
  try {
    await fetch("http://localhost:3001/products/updatestock", {
      method: "PUT",
    });
    // After updating stock, fetch products again to update the UI
    const response = await fetch("http://localhost:3001/products");
    const data = await response.json();
    setProducts(data);
  } catch (error) {
    console.error("Error updating stock:", error);
  }
};
