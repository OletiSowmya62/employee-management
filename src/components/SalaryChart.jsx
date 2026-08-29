import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function SalaryChart({ employees }) {

  const salaryByDepartment = employees.reduce((acc, emp) => {
    const department = emp.department;
    const salary = Number(emp.salary);

    acc[department] = (acc[department] || 0) + salary;

    return acc;
  }, {});

  const data = {
    labels: Object.keys(salaryByDepartment),

    datasets: [
      {
        label: "Salary",
        data: Object.values(salaryByDepartment),
        backgroundColor: [
          "#4e79a7",
          "#f28e2b",
          "#59a14f",
          "#e15759",
          "#76b7b2",
          "#edc949",
        ],
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        position: "bottom",
      },

      title: {
        display: true,
        text: "Salary Distribution by Department",
      },
    },
  };

  return <Pie data={data} options={options} />;
}

export default SalaryChart;