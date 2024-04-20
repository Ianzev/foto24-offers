// Import necessary modules
const express = require("express");
const pool = require("./db");
const bcrypt = require("bcrypt");

// Create a router
const router = express.Router();

// Define the register endpoint
router.post("/register", async (req, res) => {
  const { name, lastname, email, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
    console.log(hashedPassword);

    // Insert user data into the database with hashed password
    const query =
      "INSERT INTO users (name, lastname, email, password) VALUES ($1, $2, $3, $4)";
    const values = [name, lastname, email, hashedPassword];
    await pool.query(query, values);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user with the provided email exists in the database
    const userQuery = "SELECT * FROM users WHERE email = $1";
    const userResult = await pool.query(userQuery, [email]);
    const user = userResult.rows[0];

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the provided password matches the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Password is correct, user is authenticated
    res.status(200).json({
      message: "Login successful",
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Export the router
module.exports = router;
