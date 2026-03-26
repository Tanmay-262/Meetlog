require("dotenv").config();
console.log("DATABASE_URL:", process.env.DATABASE_URL);
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");

const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("MeetLog API running");
});

/* Test Database */
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    console.error("DATABASE ERROR:", err);
    res.status(500).send(err.message);
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000");
});