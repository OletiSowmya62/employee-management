import { useEffect, useState } from "react";
import { getEmployees } from "../services/employeeService";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import DepartmentChart from "../components/DepartmentChart";
import SalaryChart from "../components/SalaryChart";

function Dashboard() {

    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadEmployees = async () => {
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
        };
    
        loadEmployees();
    }, []);

    const totalEmployees = employees.length;

    const departments = [...new Set(
        employees.map(emp => emp.department)
    )];

    const totalDepartments = departments.length;

    const averageSalary =
        employees.length > 0
        ? Math.round(
            employees.reduce((sum, emp) => sum + Number(emp.salary), 0)
            / employees.length
        )
    : 0;

    const highestSalary = employees.length > 0
            ? Math.max(...employees.map(emp => Number(emp.salary)))
    : 0;

    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        navigate("/");
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <>
        <div className="container mt-5">
            <h1 className="mb-4">Dashboard</h1>
            <div className="row">
                <div className="col-12 col-sm-6 col-lg-3">
                    <div className="card shadow text-center p-3 h-100">
                        <h5>Total Employees</h5>
                        <h2>{totalEmployees}</h2>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                    <div className="card shadow text-center p-3 h-100">
                        <h5>Departments</h5>
                        <h2>{totalDepartments}</h2>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                    <div className="card shadow text-center p-3 h-100">
                        <h5>Average Salary</h5>
                        <h2>₹ {averageSalary}</h2>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                    <div className="card shadow text-center p-3 h-100">
                        <h5>Highest Salary</h5>
                        <h2>₹ {highestSalary}</h2>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-lg-6 mb-4">
                    <div className="card shadow p-3">
                        <DepartmentChart employees={employees} />
                    </div>
                </div>
                <div className="col-lg-6 mb-4">
                    <div className="card shadow p-3">
                        <SalaryChart employees={employees} />
                    </div>
                </div>
            </div>
            <h3 className="mt-5">Recent Employees</h3>
            {error && (<div className="alert alert-danger"> {error} </div> )}
            <table className="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Designation</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.length > 0 ? (
                        employees.slice(-5).reverse().map((emp) => (
                            <tr key={emp.id}>
                                <td>{emp.name}</td>
                                <td>{emp.department}</td>
                                <td>{emp.designation}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center py-4">
                                <h5>No employees available</h5>
                                <p className="text-secondary mb-3">
                                    Add an employee to see recent employees here.
                                </p>
                                <Link
                                    to="/add-employee"
                                    className="btn btn-primary"
                                >
                                    Add Employee
                                </Link>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="mt-4 d-flex column gap-2 align-items-center justify-content-center">
                <Link to="/employees" className="btn btn-primary">
                    Manage Employees
                </Link>
                <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
        </>
    );
}

export default Dashboard;