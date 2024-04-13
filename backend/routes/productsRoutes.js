const express = require("express");

const pool = require("./db");

const router = express.Router();

// Route for fetching products
router.get("/", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM products");
    const products = result.rows;
    client.release();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM products WHERE sku = $1", [
      productId,
    ]);
    const product = result.rows[0]; // Assuming the query returns only one product
    client.release();
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

module.exports = router;
