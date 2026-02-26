import { useState, useEffect } from "react";
import { MoreVertical } from "lucide-react";

export default function EmployeeTable() {
  const [employees, setEmployees] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [loading, setLoading] = useState(true);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  //  Fetch Employees with Today Status
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/employees/today-status`);
        const data = await res.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Status Color
  const getStatusColor = (status) => {
    if (status === "Present") return "text-green-400";
    if (status === "Absent") return "text-red-400";
    return "text-yellow-400";
  };

  const handleStatusChange = async (emp, newStatus) => {
    try {
      const response = await fetch(`${baseUrl}/api/attendance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employeeId: emp.employeeId,
          date: new Date(),
          status: newStatus,
        }),
      });
      if (!response.ok) {
        throw new Error("API failed");
      }

      const updated = employees.map((e) =>
        e._id === emp._id ? { ...e, status: newStatus } : e,
      );
      setEmployees(updated);
    } catch (error) {
      console.error("Failed to update attendance", error);
      alert("Failed to update attendance. Please try again.");
    }
  };

  //  Delete (Frontend Only)
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?",
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`${baseUrl}/api/employees/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      //  Remove from UI after success
      setEmployees((prev) => prev.filter((emp) => emp._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete employee");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#021624] text-white">
        Loading employees...
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto bg-[#021624] min-h-screen p-4 mt-8 sm:mt-0">
      <div className="bg-[#0E2A38] rounded-xl px-2">
        <h1 className="text-white text-center mt-5 mb-3">All Employee</h1>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-white min-w-[700px]">
            <thead className="border-b border-white/20 bg-[#305570]">
              <tr className="text-sm font-light">
                <th className="py-3">ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Email</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {employees.map((emp) => (
                <tr key={emp._id} className="border-b border-white/10 text-sm">
                  {/* ID column me employeeId show hoga */}
                  <td className="py-4">{emp.employeeId}</td>
                  <td>{emp.fullName}</td>
                  <td>{emp.department}</td>
                  <td>{emp.email}</td>

                  {/* STATUS DROPDOWN */}
                  <td>
                    <select
                      value={emp.status}
                      onChange={(e) => handleStatusChange(emp, e.target.value)}
                      className={`bg-transparent border border-white/20 rounded px-2 py-1 ${getStatusColor(
                        emp.status,
                      )}`}
                    >
                      <option value="Pending" className="text-black">
                        Pending
                      </option>
                      <option value="Present" className="text-black">
                        Present
                      </option>
                      <option value="Absent" className="text-black">
                        Absent
                      </option>
                    </select>
                  </td>

                  {/*  3 DOT ACTION MENU */}
                  <td className="relative">
                    <button
                      onClick={() =>
                        setOpenMenuId(openMenuId === emp._id ? null : emp._id)
                      }
                      className="p-1 hover:bg-white/10 rounded"
                    >
                      <MoreVertical size={18} />
                    </button>

                    {openMenuId === emp._id && (
                      <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded shadow-lg z-10">
                        <button
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          onClick={() => alert(`Viewing ${emp.fullName}`)}
                        >
                          View More
                        </button>

                        <button
                          className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
                          onClick={() => handleDelete(emp._id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {employees.length === 0 && (
          <div className="text-center py-6 text-gray-400">
            No employees found
          </div>
        )}
      </div>
    </div>
  );
}
