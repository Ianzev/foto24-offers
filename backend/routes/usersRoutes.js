// Import necessary modules
const express = require("express");
const pool = require("./db");

// Create a router
const router = express.Router();

// Define the register endpoint
router.post("/register", async (req, res) => {
  const { name, lastname, email, password } = req.body;

  try {
    // Insert user data into the database
    const query = 'INSERT INTO users (name, lastname, email, password) VALUES ($1, $2, $3, $4)';
    const values = [name, lastname, email, password];
    await pool.query(query, values);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Export the router
module.exports = router;
