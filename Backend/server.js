const authRoutes = require("./routes/authRoutes");
const tradeRoutes = require("./routes/tradeRoutes");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// LOGGING SETUP
// Creating a write stream (in append mode) for the log file
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "server.log"),
  { flags: "a" }
);

// Setting up the logger to write to file AND console
app.use(morgan("combined", { stream: accessLogStream })); // Write to file
app.use(morgan("dev")); // Write to console

app.use(cors());
app.use(express.json());
// Routes
app.use("/api/auth", authRoutes);
// Trade routes
app.use("/api/trades", tradeRoutes);;

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/primetrade_db";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Connection Error:", err));

app.get("/", (req, res) => {
  res.send("PrimeTrade API is running...");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Logs are being written to backend/server.log`);
});