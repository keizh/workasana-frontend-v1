/* eslint-disable react/prop-types */
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register the required components
ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ completedTasks, pendingTasks, fallBack }) {
  console.log(completedTasks, pendingTasks, fallBack);
  const data = {
    labels: ["Completed Tasks", "Pending Tasks"],
    datasets: [
      {
        data: [completedTasks, pendingTasks],
        backgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  const tt = completedTasks + pendingTasks;

  return tt > 0 ? (
    <Pie
      data={data}
      options={{
        responsive: true,
        maintainAspectRatio: false,
      }}
    />
  ) : (
    <div className="whitespace-nowrap">
      <p>{fallBack}</p>
    </div>
  );
}

export default PieChart;
