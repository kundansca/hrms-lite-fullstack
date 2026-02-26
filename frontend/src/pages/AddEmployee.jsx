import React, { useState } from "react";
import axios from "axios";
const AddEmployeeForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    employeeId: "",
    department: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.Name]: "" });
  };

  // Validation
  const validate = () => {
    let newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter valid 10 digit number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter valid email";
    }

    if (!formData.employeeId.trim())
      newErrors.employeeId = "Employee ID is required";

    if (!formData.department.trim())
      newErrors.department = "Department is required";

    return newErrors;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      setSuccess("");
      setErrors({});

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/employees`,
        {
          ...formData,
          phone: "+91" + formData.phone,
        },
      );

      if (response.status === 200 || response.status === 201) {
        setSuccess("Employee added successfully ✅");
        setFormData({
          fullName: "",
          phone: "",
          email: "",
          employeeId: "",
          department: "",
        });
      }
    } catch (error) {
      if (error.response) {
        // Server responded with error
        setErrors({ api: error.response.data.message || "Server error" });
      } else if (error.request) {
        // No response received
        setErrors({ api: "Network error. Check your connection." });
      } else {
        // Other errors
        setErrors({ api: "Something went wrong." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#021624] grid place-items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#07253B] rounded-2xl p-8 grid gap-6"
      >
        <h2 className="text-white text-2xl font-medium text-center">
          Add Employee
        </h2>

        {/* Name */}
        <div className="grid gap-1">
          <label className="text-white text-sm">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter details"
            className="h-9 bg-[#021624] rounded-lg px-3 text-white text-sm placeholder:text-[#305570]"
          />
          {errors.name && (
            <p className="text-red-400 text-xs">{errors.fullName}</p>
          )}
        </div>

        {/* Phone */}
        <div className="grid gap-1">
          <label className="text-white text-sm">Phone Number</label>
          <div className="grid grid-cols-[70px_1fr] gap-2">
            <div className="h-9 bg-[#021624] rounded-lg text-white text-sm flex items-center justify-center">
              +91
            </div>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter details"
              className="h-9 bg-[#021624] rounded-lg px-3 text-white text-sm placeholder:text-[#305570]"
            />
          </div>
          {errors.phone && (
            <p className="text-red-400 text-xs">{errors.phone}</p>
          )}
        </div>

        {/* Email */}
        <div className="grid gap-1">
          <label className="text-white text-sm">E-mail ID</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter details"
            className="h-9 bg-[#021624] rounded-lg px-3 text-white text-sm placeholder:text-[#305570]"
          />
          {errors.email && (
            <p className="text-red-400 text-xs">{errors.email}</p>
          )}
        </div>

        {/* Employee ID */}
        <div className="grid gap-1">
          <label className="text-white text-sm">Employee ID</label>
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            placeholder="Enter details"
            className="h-9 bg-[#021624] rounded-lg px-3 text-white text-sm placeholder:text-[#305570]"
          />
          {errors.employeeId && (
            <p className="text-red-400 text-xs">{errors.employeeId}</p>
          )}
        </div>

        {/* Department */}
        <div className="grid gap-1">
          <label className="text-white text-sm">Department</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Enter details"
            className="h-9 bg-[#021624] rounded-lg px-3 text-white text-sm placeholder:text-[#305570]"
          />
          {errors.department && (
            <p className="text-red-400 text-xs">{errors.department}</p>
          )}
        </div>

        {/* API Error */}
        {errors.api && (
          <p className="text-red-500 text-center text-sm">{errors.api}</p>
        )}

        {/* Success Message */}
        {success && (
          <p className="text-green-400 text-center text-sm">{success}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-[#FFD230] text-[#070E13] text-sm font-medium py-2 px-6 rounded-full justify-self-center hover:scale-105 transition duration-300 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddEmployeeForm;
