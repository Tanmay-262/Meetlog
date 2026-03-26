const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../db");

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING id, name, email",
      [name, email, hashedPassword]
    );

    res.json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).send("Signup failed");
  }
});

module.exports = router;