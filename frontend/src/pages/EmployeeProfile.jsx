import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function EmployeeProfile() {
  const { id } = useParams();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const today = new Date();
  const defaultMonth = `${today.getFullYear()}-${String(
    today.getMonth() + 1,
  ).padStart(2, "0")}`;

  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);
  const [dates, setDates] = useState([]);
  const [attendanceMap, setAttendanceMap] = useState({});
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  //Calculate Days + Fetch Attendance
  useEffect(() => {
    const [year, month] = selectedMonth.split("-");
    const totalDays = new Date(year, month, 0).getDate();

    const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);
    setDates(daysArray);

    fetchAttendance(selectedMonth);
  }, [selectedMonth]);

  // API Call
  const fetchAttendance = async (month) => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${baseUrl}/api/attendance/${id}?month=${month}`,
      );

      const map = {};
      let empData = null;

      res.data.forEach((item) => {
        const dateNumber = new Date(item.date).getDate();
        map[dateNumber] = item.status;

        if (!empData && item.employee) {
          empData = item.employee;
        }
      });

      setAttendanceMap(map);
      setEmployee(empData);
    } catch (error) {
      console.error("Attendance fetch error", error);
    } finally {
      setLoading(false);
    }
  };

  const getDateStyle = (date) => {
    const status = attendanceMap[date];

    if (status === "Present") return "bg-yellow-400 text-black";
    if (status === "Absent") return "bg-red-600/50 text-white";

    return "bg-[#305570]/30 text-white";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#021624] text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#021624] text-white py-10 px-4">
      <div className="max-w-5xl mx-auto flex flex-col gap-14">
        {/* ================= Employee Profile ================= */}
        <div className="flex flex-col items-center gap-8">
          <h2 className="text-lg text-white/20">Employee Profile</h2>

          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-24 h-24 bg-white rounded-full overflow-hidden">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="employee"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <InfoRow
                label="Employee ID"
                value={employee?.employeeId || "-"}
              />
              <InfoRow label="Name" value={employee?.fullName || "-"} />

              <InfoRow label="E-mail ID" value={employee?.email || "-"} />
              <InfoRow label="Phone" value={employee?.phoneNumber || "-"} />
              <InfoRow label="Department" value={employee?.department || "-"} />
            </div>
          </div>
        </div>

        {/* ================= Attendance Section ================= */}
        <div className="flex flex-col gap-8">
          <h2 className="text-lg text-white/20 text-center">Attendance</h2>

          <div className="flex justify-end">
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-[#305570]/30 px-4 py-2 rounded-md text-white outline-none"
            />
          </div>

          <div className="grid grid-cols-7 gap-5 justify-items-center">
            {dates.map((date) => (
              <div
                key={date}
                className={`w-12 h-12 flex items-center justify-center rounded-full text-sm font-light transition-all duration-200 hover:scale-110 ${getDateStyle(
                  date,
                )}`}
              >
                {date}
              </div>
            ))}
          </div>

          <div className="flex gap-6 justify-center text-sm mt-6">
            <Legend color="bg-yellow-400" label="Present" text="text-black" />
            <Legend color="bg-red-600/50" label="Absent" />
            <Legend color="bg-[#305570]/30" label="Not Marked" />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex gap-6">
      <span className="w-32 font-light text-white/60">{label}</span>
      <span className="font-light">{value}</span>
    </div>
  );
}

function Legend({ color, label, text = "text-white" }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-4 h-4 rounded-full ${color}`}></div>
      <span className={text}>{label}</span>
    </div>
  );
}
