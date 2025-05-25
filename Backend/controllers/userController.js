const pool = require("../Config/db");
const queries = require("../Config/queries");

const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query(queries.GET_ALL_USERS);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("❌ Error Fetching Users:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Ensure proper export
module.exports = {
  getAllUsers,
};
