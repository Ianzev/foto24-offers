import { useEffect } from "react";

export function fetchAllOffers(offers) {
  useEffect(() => {
    fetch("http://localhost:3001/offers")
      .then((response) => response.json())
      .then((data) => {
        offers(data);
      })
      .catch((error) => {
        console.error("Error fetching offers:", error);
      });
  }, []);
}

export function fetchOfferDetails(offer, id) {
  useEffect(() => {
    fetch(`http://localhost:3001/offers/${id}`)
      .then((response) => response.json())
      .then((data) => {
        offer(data);
      })
      .catch((error) => {
        console.error("Error fetching offer details:", error);
      });
  }, [id]);
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
