const express = require("express");
const axios = require("axios");

const pool = require("./db");

const router = express.Router();

// Route for fetching products
router.get("/", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM products ORDER BY id");
    const products = result.rows;
    client.release();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/updatestock", async (req, res) => {
  let client;

  try {
    client = await pool.connect();
    const result = await client.query("SELECT * FROM products ORDER BY id");
    const products = result.rows;

    const totalProducts = products.length;
    let counter = 0;

    for (const product of products) {
      const sku = product.sku;

      try {
        const response = await axios.get(
          `https://cerebro.foto24.com/api/v2/products/${sku}`
        );
        const productData = response.data;

        const updatedStock = productData.qty_available || 0;
        const updatedStockQmedia = productData.suppliers_data?.qmedia?.qty || 0;
        const updatedName = productData.name || "";
        const sales1 = productData.stats_sold["1"]?.units_sold ?? 0;
        const sales10 = productData.stats_sold["10"]?.units_sold ?? 0;
        const sales30 = productData.stats_sold["30"]?.units_sold ?? 0;
        const sales90 = productData.stats_sold["90"]?.units_sold ?? 0;
        const sales180 = productData.stats_sold["180"]?.units_sold ?? 0;
        const sales365 = productData.stats_sold["365"]?.units_sold ?? 0;

        await client.query("BEGIN");

        await client.query(
          "UPDATE products SET stockmalaga = $1 WHERE sku = $2",
          [updatedStock, sku]
        );

        await client.query(
          "UPDATE products SET stockqmedia = $1 WHERE sku = $2",
          [updatedStockQmedia, sku]
        );

        await client.query("UPDATE products SET name = $1 WHERE sku = $2", [
          updatedName,
          sku,
        ]);

        await client.query(
          "UPDATE products SET sales1 = $1, sales10 = $2, sales30 = $3, sales90 = $4, sales180 = $5, sales365 = $6 WHERE sku = $7",
          [sales1, sales10, sales30, sales90, sales180, sales365, sku]
        );

        await client.query("COMMIT");

        counter++;
        console.log(`${counter}/${totalProducts} products updated`);
      } catch (error) {
        await client.query("ROLLBACK");
        console.error(
          `Error updating product with SKU ${sku}:`,
          error.response ? error.response.data : error.message
        );
      }
    }

    res.status(200).json({ message: "Stock updated successfully" });
  } catch (error) {
    console.error("Error updating stock for all products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (client) {
      client.release();
    }
  }
});

module.exports = router;

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
