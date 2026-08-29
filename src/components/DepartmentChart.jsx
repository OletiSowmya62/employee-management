import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function DepartmentChart({ employees }) {
  // Count employees by department
  const departmentCounts = employees.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(departmentCounts),
    datasets: [
      {
        label: "Employees",
        data: Object.values(departmentCounts),
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
        display: false,
      },
      title: {
        display: true,
        text: "Employees by Department",
      },
    },
  };

  return <Bar data={data} options={options} />;
}

export default DepartmentChart;