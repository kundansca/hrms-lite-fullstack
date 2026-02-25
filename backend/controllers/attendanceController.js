const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");

// Mark Attendance
exports.markAttendance = async (req, res) => {
  try {
    const { employeeId, date, status } = req.body;

    if (!employeeId || !date || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const employee = await Employee.findOne({ employeeId });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const attendance = await Attendance.create({
      employee: employee._id,
      date,
      status,
    });

    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get Attendance By Employee
exports.getAttendanceByEmployee = async (req, res) => {
  try {
    const employee = await Employee.findOne({
      employeeId: req.params.employeeId,
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const records = await Attendance.find({ employee: employee._id });

    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
