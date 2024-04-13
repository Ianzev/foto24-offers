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

module.exports = router;
