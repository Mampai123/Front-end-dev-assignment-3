import { useState } from "react";
import Header from "./components/Header";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Rahul Das",
      employeeId: "EMP001",
      department: "Agriculture",
      gender: "Male",
      phone: "9876543210",
      localAddress: "Kolkata, West Bengal",
      permanentAddress: "Burdwan, West Bengal",
    },
    {
      id: 2,
      name: "Priya Roy",
      employeeId: "EMP002",
      department: "Accounts",
      gender: "Female",
      phone: "9123456780",
      localAddress: "Siliguri, West Bengal",
      permanentAddress: "Jalpaiguri, West Bengal",
    },
    {
      id: 3,
      name: "Amit Ghosh",
      employeeId: "EMP003",
      department: "Management",
      gender: "Male",
      phone: "9001234567",
      localAddress: "Howrah, West Bengal",
      permanentAddress: "Hooghly, West Bengal",
    },
  ]);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Delete Employee
  const deleteEmployee = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (confirmDelete) {
      setEmployees(
        employees.filter((employee) => employee.id !== id)
      );
    }
  };

  // Add Employee
  const addEmployee = (employee) => {
    const newEmployee = {
      ...employee,
      id: Date.now(),
    };

    setEmployees([...employees, newEmployee]);
  };

  // Update Employee
  const updateEmployee = (updatedEmployee) => {
    setEmployees(
      employees.map((employee) =>
        employee.id === updatedEmployee.id
          ? updatedEmployee
          : employee
      )
    );

    setEditingEmployee(null);
  };

  // Search and Department Filter
  const filteredEmployees = employees.filter((employee) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      employee.name.toLowerCase().includes(searchText) ||
      employee.employeeId.toLowerCase().includes(searchText) ||
      employee.department.toLowerCase().includes(searchText);

    const matchesDepartment =
      department === "All" ||
      employee.department === department;

    return matchesSearch && matchesDepartment;
  });

  // Get unique departments
  const departments = [
    "All",
    ...new Set(employees.map((employee) => employee.department)),
  ];

  return (
    <div className="app">
      <Header />

      <main>
        {/* Employee Count */}
        <div className="count-box">
          <h2>Total Employees: {employees.length}</h2>
        </div>

        {/* Employee Form */}
        <EmployeeForm
          addEmployee={addEmployee}
          updateEmployee={updateEmployee}
          editingEmployee={editingEmployee}
          setEditingEmployee={setEditingEmployee}
        />

        {/* Search and Filter */}
        <div className="filter-section">
          <input
            type="text"
            placeholder="Search employee..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Employee List */}
        {filteredEmployees.length > 0 ? (
          <EmployeeList
            employees={filteredEmployees}
            deleteEmployee={deleteEmployee}
            setEditingEmployee={setEditingEmployee}
          />
        ) : (
          <div className="no-employees">
            <h3>No Employees Found</h3>
            <p>Try changing your search or department filter.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
