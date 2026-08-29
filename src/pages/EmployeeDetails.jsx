import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEmployeeById } from "../services/employeeService";
import Loader from "../components/Loader";

function EmployeeDetails() {
  const { id } = useParams();

  const [employee, setEmployee] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEmployee = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getEmployeeById(id);
        setEmployee(data);
      } catch(err) {
        console.error(err);
        setError("Unable to fetch employee details.");
      } finally {
        setLoading(false);
      }
    };

    loadEmployee();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">
          {error}
        </div>
        <Link
          to="/employees"
          className="btn btn-secondary"
        >
          ← Back to Employees
        </Link>
      </div>
    );
  }

  if (!employee || !employee.id) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning">
          Employee not found.
        </div>
        <Link
          to="/employees"
          className="btn btn-secondary"
        >
          ← Back to Employees
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Employee Details</h2>
        <Link
          to="/employees"
          className="btn btn-secondary"
        >
          ← Back to Employees
        </Link>
      </div>
      <div className="card shadow">
        <div className="card-header">
          <h4 className="mb-0">
            👤 {employee.name}
          </h4>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-4">
              <small className="text-secondary">
                Email
              </small>
              <h5>{employee.email}</h5>
            </div>
            <div className="col-md-6 mb-4">
              <small className="text-secondary">
                Phone
              </small>
              <h5>{employee.phone}</h5>
            </div>
            <div className="col-md-6 mb-4">
              <small className="text-secondary">
                Department
              </small>
              <h5>{employee.department}</h5>
            </div>
            <div className="col-md-6 mb-4">
              <small className="text-secondary">
                Designation
              </small>
              <h5>{employee.designation}</h5>
            </div>
            <div className="col-md-6 mb-4">
              <small className="text-secondary">
                Salary
              </small>
              <h5>₹ {employee.salary}</h5>
            </div>
          </div>
          <div className="mt-2">
            <Link
              to={`/edit-employee/${employee.id}`}
              className="btn btn-warning me-2"
            >
              ✏️ Edit Employee
            </Link>
            <Link
              to="/employees"
              className="btn btn-outline-secondary"
            >
              Back to Employees
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;