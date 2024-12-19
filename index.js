require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");

const app = express();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Endpoint to fetch data by ID
app.get("/data/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const query = "SELECT * FROM bank WHERE idstatementnav = $1";
    const result = await pool.query(query, [id]);

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
