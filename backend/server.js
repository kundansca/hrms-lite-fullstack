const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const connectDB = require("./config/database");
const employeeRoutes = require("./routes/employeeRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");

const {
  notFound,
  globalErrorHandler,
} = require("./middlewares/globalErrorHandler");

const app = express();
//! Establish connection to mongodb
connectDB();
// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/employees", employeeRoutes);
app.use("/api/attendance", attendanceRoutes);
//? Not found error handler
app.use(notFound);
//? Setup the global error handler
app.use(globalErrorHandler);
const PORT = process.env.PORT || 9080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
