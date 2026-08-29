import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployeeById, updateEmployee } from "../services/employeeService";
import { toast } from "react-toastify";
import EmployeeForm from "../components/EmployeeForm";

function EditEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [submitting, setSubmitting] = useState(false);
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    salary: "",
  });

  useEffect(() => {
    const loadEmployee = async () => {
      try {
        const data = await getEmployeeById(id);
        setEmployee(data);
      } catch {
        toast.error("Unable to fetch employee");
      }
    };

    loadEmployee();
  }, [id]);

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await updateEmployee(id, employee);
      toast.success("Employee Updated");
      navigate("/employees");
    } catch {
      toast.error("Update failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/employees");
  };

  return (
    <>
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Edit Employee</h2>
        <button
          onClick={handleCancel}
          className="btn btn-secondary"
          type="button"
        >
          ← Back to Employees
        </button>
      </div>
      <div className="card shadow p-4">
        <EmployeeForm
          employee={employee}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          buttonText={submitting ? "Updating..." : "Update Employee"}
          buttonClass="btn btn-warning"
          disabled={submitting}
          onCancel={handleCancel}
          cancelButtonText="Cancel"
        />
      </div>
    </div>
    </>
  );
}

export default EditEmployee;