const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");
const path = require("path");
const photoRoutes = require("./routes/photoRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/todos", todoRoutes);

// Use photo routes
app.use("/api/photos", photoRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
