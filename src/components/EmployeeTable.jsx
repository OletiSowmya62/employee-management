import EmployeeActions from "./EmployeeActions";
function EmployeeTable({ employees, onDelete }) {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.department}</td>
                <td>{employee.designation}</td>
                <td>₹ {employee.salary}</td>
                <EmployeeActions
                  employee={employee}
                  onDelete={onDelete}
                />
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4">
                <h5>No employees found</h5>
                <p className="text-secondary mb-3">
                  No employees match your current search or filter.
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;