import { Link } from "react-router-dom";

function EmployeeActions({ employee, onDelete }) {
  return (
    <td>
      <Link
        to={`/employee/${employee.id}`}
        className="btn btn-info btn-sm me-2"
      >
        View
      </Link>
      <Link
        to={`/edit-employee/${employee.id}`}
        className="btn btn-warning btn-sm me-2"
      >
        Edit
      </Link>
      <button
        className="btn btn-danger btn-sm"
        onClick={() => onDelete(employee)}
      >
        Delete
      </button>
    </td>
  );
}

export default EmployeeActions;