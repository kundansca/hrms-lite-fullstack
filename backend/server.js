const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/database");

const app = express();
//! Establish connection to mongodb
connectDB();
// Middleware
app.use(express.json());
app.use("/api/employees", employeeRoutes);
app.use("/api/attendance", attendanceRoutes);
const PORT = process.env.PORT || 9080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
