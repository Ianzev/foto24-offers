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

module.exports = router;
