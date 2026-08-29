import { useCallback, useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../services/employeeService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

import { exportEmployeesToCSV } from "../utils/exportEmployees";
import EmployeeTable from "../components/EmployeeTable";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [sortField] = useState("");
  const [sortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 5;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const departments = [ ...new Set(employees.map((emp) => emp.department)),];
  
  useEffect(() => {
    let isMounted = true;

    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const data = await getEmployees();
        if (isMounted) setEmployees(data);
      } catch (err) {
        console.error(err);
        if (isMounted) setError("Unable to fetch employees.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchEmployees();

    return () => {
      isMounted = false;
    };
  }, []);

  const loadEmployees = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (err) {
      console.error(err);
      setError("Unable to fetch employees.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = async () => {
    if (!selectedEmployee) return;
    setDeleting(true);

    try {
      await deleteEmployee(selectedEmployee.id);
      toast.success("Employee deleted successfully");
      setSelectedEmployee(null);
      await loadEmployees();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  const openDeleteModal = (employee) => {
    setSelectedEmployee(employee);
  };

  const closeDeleteModal = () => {
    if (!deleting) {
      setSelectedEmployee(null);
    }
  };

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      departmentFilter === "All" ||
      employee.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (!sortField) return 0;
    if (sortField === "salary") {
      return sortOrder === "asc"
        ? a.salary - b.salary
        : b.salary - a.salary;
    }
    return sortOrder === "asc"
      ? a[sortField].localeCompare(b[sortField])
      : b[sortField].localeCompare(a[sortField]);
  });

  const totalPages = Math.ceil(
    sortedEmployees.length / employeesPerPage
  );

  const safeCurrentPage =
    totalPages === 0
      ? 1
      : Math.min(currentPage, totalPages);

  const indexOfLastEmployee = safeCurrentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = sortedEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <>
    <div className="container mt-4">
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-5">
          <label htmlFor="employeeSearch" className="visually-hidden">
            Search employees
          </label>
          <input
            id="employeeSearch"
            type="text"
            className="form-control"
            placeholder="🔍 Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-3">
          <label htmlFor="departmentFilter" className="visually-hidden">
            Filter by department
          </label>
          <select
            id="departmentFilter"
            className="form-select"
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
          >
            <option value="All">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>
      {searchTerm || departmentFilter !== "All" ? (
        <div className="mb-3">
          <button
            className="btn btn-outline-secondary"
            onClick={() => {
              setSearchTerm("");
              setDepartmentFilter("All");
            }}
          >
            Clear Filters
          </button>
        </div>
      ) : null}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-3">
        <h2 className="mb-0">Employees</h2>
        <div className="d-flex flex-column flex-sm-row gap-2">
          <button
            className="btn btn-success"
            onClick={() => exportEmployeesToCSV(employees)}
          >
            Export CSV
          </button>
          <Link
            to="/add-employee"
            className="btn btn-success"
          >
            Add Employee
          </Link>
        </div>
      </div>
      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}
      <EmployeeTable
        employees={currentEmployees}
        onDelete={openDeleteModal}
      />
      <div className="d-flex justify-content-center align-items-center mt-4">
        <button
          className="btn btn-outline-primary me-2"
          disabled={safeCurrentPage === 1}
          onClick={() => setCurrentPage(safeCurrentPage - 1)}
        >
          Previous
        </button>
        <span className="fw-bold">
          {totalPages > 0
            ? `Page ${safeCurrentPage} of ${totalPages}`
            : "No pages"
          }
        </span>
        <button
          className="btn btn-outline-primary ms-2"
          disabled={totalPages === 0 || safeCurrentPage === totalPages}
          onClick={() => setCurrentPage(safeCurrentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
    <DeleteConfirmModal
      employee={selectedEmployee}
      onConfirm={handleDelete}
      onCancel={closeDeleteModal}
      deleting={deleting}
    />
    </>
  );
}

export default Employees;