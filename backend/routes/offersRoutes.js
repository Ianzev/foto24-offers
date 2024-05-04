const express = require("express");

const pool = require("./db");

const router = express.Router();

// Route for fetching products
router.get("/", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM offers");
    const offers = result.rows;
    client.release();
    res.json(offers);
  } catch (error) {
    console.error("Error fetching offers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  const offerId = req.params.id;
  try {
    const client = await pool.connect();
    const query = `
      SELECT * FROM offers WHERE id = $1;
    `;
    const result = await client.query(query, [offerId]);
    const offer = result.rows[0];
    client.release();
    if (offer) {
      res.json(offer);
    } else {
      res.status(404).json({ error: "Offer not found" });
    }
  } catch (error) {
    console.error("Error fetching offer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id/products", async (req, res) => {
  const offerId = req.params.id;
  try {
    // Step 1: Fetch the offer details
    const offerResponse = await fetch(
      `http://localhost:3001/offers/${offerId}`
    );
    const offer = await offerResponse.json();
    const products = offer.products;

    // Step 2: Extract the SKUs from the offer's products
    const skus = products.map((product) => product.sku);

    if (skus.length === 0) {
      return res
        .status(404)
        .json({ error: "No products found for this offer" });
    }

    // Step 3: Construct and execute the query to fetch the corresponding products
    const placeholders = skus.map((sku, index) => `$${index + 1}`).join(",");
    const query = `
      SELECT *
      FROM products
      WHERE sku IN (${placeholders});
    `;
    const client = await pool.connect();
    const result = await client.query(query, skus);
    const matchingProducts = result.rows;
    client.release();

    res.json(matchingProducts);
  } catch (error) {
    console.error("Error fetching products for offer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
