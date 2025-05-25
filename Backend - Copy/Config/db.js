require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch(err => console.error("Connection error", err.stack));

module.exports = pool;

// Corrected Query Execution
// pool.query(`SELECT * FROM auth.users`, (err, res) => {
//   if (!err) {
//     console.log("This is the output of query:", res.rows);
//   } else {
//     console.error("Query Error:", err.message);
//   }
//   pool.end();  // Close connection properly
// });
