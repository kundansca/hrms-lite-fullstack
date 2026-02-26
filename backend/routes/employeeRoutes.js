const express = require("express");
const router = express.Router();
const {
  createEmployee,
  getEmployees,
  deleteEmployee,
} = require("../controllers/employeeController");
const {
  getEmployeesWithTodayStatus,
} = require("../controllers/attendanceController");

router.post("/", createEmployee);
router.get("/", getEmployees);
router.delete("/:id", deleteEmployee);
router.get("/today-status", getEmployeesWithTodayStatus);

module.exports = router;
