export const exportEmployeesToCSV = (employees) => {
  if (!employees || employees.length === 0) {
    alert("No employee data available to export");
    return;
  }

  const headers = [
    "Name",
    "Email",
    "Phone",
    "Department",
    "Designation",
    "Salary"
  ];

  const rows = employees.map((employee) => [
    employee.name,
    employee.email,
    employee.phone,
    employee.department,
    employee.designation,
    employee.salary
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) =>
      row
        .map((value) => `"${value ?? ""}"`)
        .join(",")
    )
  ].join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;"
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "employees.csv";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};