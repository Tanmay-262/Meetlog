const express = require("express");
const pool = require("../db");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Get all interactions for the logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM interactions WHERE user_id = $1 ORDER BY created_at DESC",
      [req.user.id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("GET ALL INTERACTIONS ERROR:", error);
    res.status(500).json("Server error");
  }
});

// Get a single interaction
router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM interactions WHERE id = $1 AND user_id = $2",
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json("Interaction not found");
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("GET INTERACTION ERROR:", error);
    res.status(500).json("Server error");
  }
});

// Create a new interaction
router.post("/", auth, async (req, res) => {
  try {
    const { name, company, event, notes } = req.body;

    if (!name) {
      return res.status(400).json("Name is required");
    }

    const result = await pool.query(
      "INSERT INTO interactions (user_id, name, company, event, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [req.user.id, name, company, event, notes]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("CREATE INTERACTION ERROR:", error);
    res.status(500).json("Server error");
  }
});

// Update an interaction
router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, company, event, notes } = req.body;

    if (!name) {
      return res.status(400).json("Name is required");
    }

    const result = await pool.query(
      "UPDATE interactions SET name = $1, company = $2, event = $3, notes = $4 WHERE id = $5 AND user_id = $6 RETURNING *",
      [name, company, event, notes, id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json("Interaction not found or unauthorized");
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("UPDATE INTERACTION ERROR:", error);
    res.status(500).json("Server error");
  }
});

// Delete an interaction
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM interactions WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json("Interaction not found or unauthorized");
    }

    res.json({ message: "Interaction deleted successfully" });
  } catch (error) {
    console.error("DELETE INTERACTION ERROR:", error);
    res.status(500).json("Server error");
  }
});

module.exports = router;
