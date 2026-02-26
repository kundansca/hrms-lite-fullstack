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

    // Normalize date (important)
    const attendanceDate = new Date(date);
    attendanceDate.setHours(0, 0, 0, 0);

    // Check if already exists
    const existing = await Attendance.findOne({
      employee: employee._id,
      date: attendanceDate,
    });

    if (existing) {
      // Update instead of create
      existing.status = status;
      await existing.save();

      return res.status(200).json(existing);
    }

    // Create new record
    const attendance = await Attendance.create({
      employee: employee._id,
      date: attendanceDate,
      status,
    });

    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getAttendanceByEmployee = async (req, res) => {
  try {
    const employee = await Employee.findOne({
      employeeId: req.params.employeeId,
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const records = await Attendance.find({
      employee: employee._id,
    })
      .sort({ date: -1 }) // latest first
      .populate("employee", "fullName employeeId department");

    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getEmployeesWithTodayStatus = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const employees = await Employee.find();

    const attendance = await Attendance.find({ date: today });

    const attendanceMap = {};
    attendance.forEach((item) => {
      attendanceMap[item.employee.toString()] = item.status;
    });

    const result = employees.map((emp) => ({
      _id: emp._id,
      employeeId: emp.employeeId,
      fullName: emp.fullName,
      email: emp.email,
      department: emp.department,
      status: attendanceMap[emp._id.toString()] || "Pending",
    }));

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
