function EmployeeList({
  employees,
  deleteEmployee,
  setEditingEmployee,
}) {
  return (
    <div className="employee-list">
      {employees.map((employee) => (
        <div className="employee-card" key={employee.id}>
          <div className="employee-header">
            <div>
              <h2>{employee.name}</h2>
              <span>{employee.employeeId}</span>
            </div>

            <span className="department">
              {employee.department}
            </span>
          </div>

          <div className="employee-details">
            <p>
              <strong>Gender:</strong> {employee.gender}
            </p>

            <p>
              <strong>Phone:</strong> {employee.phone}
            </p>

            <p>
              <strong>Local Address:</strong>{" "}
              {employee.localAddress}
            </p>

            <p>
              <strong>Permanent Address:</strong>{" "}
              {employee.permanentAddress}
            </p>
          </div>

          <div className="card-buttons">
            <button
              className="edit-btn"
              onClick={() => setEditingEmployee(employee)}
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => deleteEmployee(employee.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EmployeeList;
