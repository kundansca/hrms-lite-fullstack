import React, { useState } from "react";

export default function EmployeeProfile() {
  const [activeMonth, setActiveMonth] = useState("February 2026");

  const months = ["January 2026", "February 2026", "March 2026"];

  const dates = Array.from({ length: 28 }, (_, i) => i + 1);

  const presentDates = [19]; // yellow
  const absentDates = [3, 6, 10, 11, 16]; // red

  const getDateStyle = (date) => {
    if (presentDates.includes(date)) return "bg-yellow-400 text-black";
    if (absentDates.includes(date)) return "bg-red-700/40 text-white";
    return "bg-[#305570]/30 text-white";
  };

  return (
    <div className="absolute left-[29px] top-[102px] w-[1223px] flex flex-col items-center gap-12 text-white">
      {/* Header */}
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white rounded-full"></div>
          <h1 className="text-2xl font-bold">Astra</h1>
        </div>
        <div className="w-6 h-6 bg-white rounded-sm"></div>
      </div>

      {/* Employee Profile */}
      <div className="flex flex-col items-center gap-8 w-[705px]">
        <h2 className="text-lg text-white/20">Employee Profile</h2>

        <div className="flex gap-9">
          {/* Image */}
          <div className="w-[89px] h-[89px] bg-white rounded-full overflow-hidden">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="employee"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info Left */}
          <div className="flex flex-col gap-4 text-sm">
            <InfoRow label="Name" value="Ronald Richards" />
            <InfoRow label="Phone Number" value="+91 9876543210" />
            <InfoRow label="E-mail ID" value="ronald@email.com" />
          </div>

          {/* Info Right */}
          <div className="flex flex-col gap-4 text-sm">
            <InfoRow label="Address" value="New York, USA" />
            <InfoRow label="Department" value="Development" />
          </div>
        </div>
      </div>

      {/* Attendance Section */}
      <div className="flex flex-col items-center gap-6 w-[666px]">
        <h2 className="text-lg text-white/20">Attendance</h2>

        {/* Month Tabs */}
        <div className="flex justify-between w-full">
          {months.map((month) => (
            <button
              key={month}
              onClick={() => setActiveMonth(month)}
              className={`text-lg ${
                activeMonth === month ? "text-white" : "text-white/30"
              }`}
            >
              {month}
            </button>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-6 w-full">
          {dates.map((date) => (
            <div
              key={date}
              className={`w-12 h-12 flex items-center justify-center rounded-full text-sm font-light ${getDateStyle(
                date,
              )}`}
            >
              {date}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex gap-6">
      <span className="w-28 font-light">{label}</span>
      <span className="font-light">{value}</span>
    </div>
  );
}
