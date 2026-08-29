import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addEmployee } from "../services/employeeService";
import { toast } from "react-toastify";
import EmployeeForm from "../components/EmployeeForm";

function AddEmployee() {
  const navigate = useNavigate();
  const [errors, setErrors] =useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    salary: ""
  });
  const validate = () => {
    let newErrors = {};

    if (!employee.name.trim()) {
      newErrors.name = "Name is required";
    } else if (employee.name.length < 3) {
      newErrors.name = "Minimum 3 characters";
    }

    if (!employee.email) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(employee.email)
    ) {
      newErrors.email = "Invalid email";
    }

    if (!employee.phone) {
      newErrors.phone = "Phone is required";
    } else if (!/^[0-9]{10}$/.test(employee.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    if (!employee.department) {
      newErrors.department = "Department is required";
    }

    if (!employee.designation) {
      newErrors.designation = "Designation is required";
    }

    if (!employee.salary) {
      newErrors.salary = "Salary is required";
    } else if (employee.salary <= 0) {
      newErrors.salary = "Salary must be greater than 0";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value
    });

    if (hasSubmitted) {
      const fieldErrors = {};

      if (name === "name") {
        if (!value.trim()) fieldErrors.name = "Name is required";
        else if (value.length < 3) fieldErrors.name = "Minimum 3 characters";
      } else if (name === "email") {
        if (!value) fieldErrors.email = "Email is required";
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
          fieldErrors.email = "Invalid email";
        }
      } else if (name === "phone") {
        if (!value) fieldErrors.phone = "Phone is required";
        else if (!/^[0-9]{10}$/.test(value)) {
          fieldErrors.phone = "Phone must be 10 digits";
        }
      } else if (name === "department" && !value) {
        fieldErrors.department = "Department is required";
      } else if (name === "designation" && !value) {
        fieldErrors.designation = "Designation is required";
      } else if (name === "salary") {
        if (!value) fieldErrors.salary = "Salary is required";
        else if (value <= 0) fieldErrors.salary = "Salary must be greater than 0";
      }

      setErrors((currentErrors) => ({
        ...currentErrors,
        ...(fieldErrors[name]
          ? { [name]: fieldErrors[name] }
          : { [name]: undefined })
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (!validate()) return;
    setSubmitting(true);
    try {
      await addEmployee(employee);
      toast.success("Employee Added");
      navigate("/employees");
    } catch {
      toast.error("Failed to add employee");
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
        <h2>Add Employee</h2>
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
          errors={errors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          buttonText={submitting ? "Saving..." : "Save Employee"}
          buttonClass="btn btn-success"
          disabled={submitting}
          onCancel={handleCancel}
          cancelButtonText="Cancel"
        />
      </div>
    </div>
    </>
  );
}

export default AddEmployee;