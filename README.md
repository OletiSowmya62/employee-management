# Employee Management System

A responsive Employee Management System built with React.js that allows users to manage employee records through a clean and user-friendly interface.

## 🚀 Features

- 🔐 Login authentication
- 🛡️ Protected routes
- 📊 Dashboard with employee statistics
- 📈 Department-wise bar chart
- 🥧 Salary/employee data visualization with pie chart
- 👥 Employee listing
- 🔍 Search employees by name or email
- 🏢 Filter employees by department
- ↕️ Sort employees by name and salary
- 📄 Pagination
- ➕ Add new employees
- ✏️ Edit employee details
- 👁️ View employee details
- 🗑️ Delete employees with confirmation
- ✅ Form validation
- 🔔 Toast notifications
- ⏳ Loading states
- ⚠️ Error handling
- 📥 Export employee data to CSV
- 🌙 Dark/Light theme
- 💾 Theme persistence using localStorage
- 📱 Responsive design
- 🚫 404 Not Found page
- 🛡️ Error Boundary

## 🛠️ Technologies Used

- React.js
- JavaScript (ES6+)
- HTML5
- CSS3
- Bootstrap
- React Router
- Axios
- React Toastify
- Chart.js
- JSON Server
- Git & GitHub

## 📂 Project Structure

```text
src/
├── components/
│   ├── Loader.jsx
│   ├── Navbar.jsx
│   ├── ProtectedRoute.jsx
│   |── ErrorBoundary.jsx
│   ├── SalaryChart.jsx
│   ├── EmployeeTable.jsx
│   |── EmployeeForm.jsx
│   ├── EmployeeActions.jsx
│   ├── DepartmentChart.jsx
│   └── DeleteConfirmModal.jsx
│
├── context/
│   └── ThemeContext.jsx
│
├── layouts/
│   └── MainLayout.jsx
│
├── pages/
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── Employees.jsx
│   ├── AddEmployee.jsx
│   ├── EditEmployee.jsx
│   ├── EmployeeDetails.jsx
│   └── NotFound.jsx
│
├── services/
│   └── employeeService.js
│
├── utils/
│   └── exportEmployees.js
│
├── App.jsx
├── index.css
└── main.jsx

db.json
package.json
README.md