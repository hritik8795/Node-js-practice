const express = require("express");
require("./config/config"); // ✅ Must come before other imports that use env
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");
const photoRoutes = require("./routes/photoRoutes");

const path = require("path");
const app = express();

// Connect to DB after loading env
connectDB();

// Middlewares
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/photos", photoRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    `🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`
  )
);
