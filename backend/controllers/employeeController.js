const Employee = require("../models/Employee");
const Attendance = require("../models/Attendance");
// Add Employee
exports.createEmployee = async (req, res) => {
  try {
    const { employeeId, fullName, email, department, phoneNumber } = req.body;

    if (!employeeId || !fullName || !email || !department || !phoneNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingEmployee = await Employee.findOne({
      $or: [{ employeeId }, { email }],
    });

    if (existingEmployee) {
      return res.status(400).json({ message: "Employee already exists" });
    }

    const employee = await Employee.create({
      employeeId,
      fullName,
      email,
      department,
      phoneNumber,
    });

    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get All Employees
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete Employee
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    //  Delete related attendance records
    await Attendance.deleteMany({ employee: employee._id });

    await employee.deleteOne();

    res.status(200).json({
      message: "Employee and related attendance deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
