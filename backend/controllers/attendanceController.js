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

    const attendanceDate = new Date(date);
    attendanceDate.setHours(0, 0, 0, 0);

    // 🔥 Upsert (No duplicate issue)
    const attendance = await Attendance.findOneAndUpdate(
      { employee: employee._id, date: attendanceDate },
      { status },
      { new: true, upsert: true },
    );

    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getAttendanceByEmployee = async (req, res) => {
  try {
    const { month } = req.query;

    const employee = await Employee.findOne({
      employeeId: req.params.employeeId,
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    if (!month) {
      return res.status(400).json({ message: "Month is required" });
    }

    const [year, monthNumber] = month.split("-");

    const startDate = new Date(year, monthNumber - 1, 1);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(year, monthNumber, 0);
    endDate.setHours(23, 59, 59, 999);

    const records = await Attendance.find({
      employee: employee._id,
      date: { $gte: startDate, $lte: endDate },
    })
      .populate("employee", "fullName employeeId email department phoneNumber")
      .sort({ date: 1 })
      .lean();

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
      phoneNumber: emp.phoneNumber,

      status: attendanceMap[emp._id.toString()] || "Pending",
    }));

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
