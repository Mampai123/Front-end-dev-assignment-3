import { useEffect, useState } from "react";

function EmployeeForm({
  addEmployee,
  updateEmployee,
  editingEmployee,
  setEditingEmployee,
}) {
  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    department: "",
    gender: "",
    phone: "",
    localAddress: "",
    permanentAddress: "",
  });

  // Load employee data when Edit button is clicked
  useEffect(() => {
    if (editingEmployee) {
      setFormData({
        name: editingEmployee.name,
        employeeId: editingEmployee.employeeId,
        department: editingEmployee.department,
        gender: editingEmployee.gender,
        phone: editingEmployee.phone,
        localAddress: editingEmployee.localAddress,
        permanentAddress: editingEmployee.permanentAddress,
      });
    }
  }, [editingEmployee]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.employeeId ||
      !formData.department ||
      !formData.gender ||
      !formData.phone ||
      !formData.localAddress ||
      !formData.permanentAddress
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (editingEmployee) {
      updateEmployee({
        ...formData,
        id: editingEmployee.id,
      });
    } else {
      addEmployee(formData);
    }

    setFormData({
      name: "",
      employeeId: "",
      department: "",
      gender: "",
      phone: "",
      localAddress: "",
      permanentAddress: "",
    });
  };

  // Cancel edit
  const handleCancel = () => {
    setEditingEmployee(null);

    setFormData({
      name: "",
      employeeId: "",
      department: "",
      gender: "",
      phone: "",
      localAddress: "",
      permanentAddress: "",
    });
  };

  return (
    <div className="form-container">
      <h2>{editingEmployee ? "Edit Employee" : "Add Employee"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <input
            type="text"
            name="name"
            placeholder="Employee Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="text"
            name="employeeId"
            placeholder="Employee ID"
            value={formData.employeeId}
            onChange={handleChange}
          />

          <input
            type="text"
            name="department"
            placeholder="Department Name"
            value={formData.department}
            onChange={handleChange}
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />

          <textarea
            name="localAddress"
            placeholder="Local Address"
            value={formData.localAddress}
            onChange={handleChange}
          />

          <textarea
            name="permanentAddress"
            placeholder="Permanent Address"
            value={formData.permanentAddress}
            onChange={handleChange}
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="save-btn">
            {editingEmployee ? "Update Employee" : "Add Employee"}
          </button>

          {editingEmployee && (
            <button
              type="button"
              className="cancel-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default EmployeeForm;
