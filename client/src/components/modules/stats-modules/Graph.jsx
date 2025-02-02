import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { get } from "../../../utilities";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Graph = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    getScores();
  }, []);

  const getScores = async () => {
    try {
      const response = await get("/api/scores");
      setScores(response.scores);
    } catch (err) {
      console.log("Failed to get scores:", err);
    }
  };

  const data = {
    labels: scores.map((_, index) => `${index + 1}`),
    datasets: [
      {
        label: "Score",
        data: scores,
        fill: false,
        borderColor: "rgb(52, 211, 153)",
        backgroundColor: "rgba(52, 211, 153, 0.1)",
        tension: 0.1,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: "rgb(52, 211, 153)",
        pointHoverBackgroundColor: "rgb(52, 211, 153)",
        pointBorderColor: "rgb(24, 24, 27)",
        pointHoverBorderColor: "rgb(24, 24, 27)",
        pointBorderWidth: 2,
        pointHoverBorderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "rgb(161, 161, 170)",
          font: {
            family: "monospace",
          },
        },
      },
      title: {
        display: true,
        text: "score history",
        color: "rgb(161, 161, 170)",
        font: {
          size: 14,
          family: "monospace",
          weight: "500",
        },
      },
      tooltip: {
        backgroundColor: "rgb(39, 39, 42)",
        titleColor: "rgb(161, 161, 170)",
        bodyColor: "rgb(52, 211, 153)",
        titleFont: {
          family: "monospace",
          size: 12,
        },
        bodyFont: {
          family: "monospace",
          size: 14,
          weight: "bold",
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          title: (context) => context[0].label,
          label: (context) => `Score: ${context.raw}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "scores",
          color: "rgb(161, 161, 170)",
          font: {
            family: "monospace",
          },
        },
        grid: {
          color: "rgba(161, 161, 170, 0.1)",
          borderColor: "rgb(63, 63, 70)",
        },
        ticks: {
          color: "rgb(161, 161, 170)",
          font: {
            family: "monospace",
          },
          stepSize: 1,
          precision: 0,
        },
      },
      x: {
        title: {
          display: true,
          text: "game number",
          color: "rgb(161, 161, 170)",
          font: {
            family: "monospace",
          },
        },
        grid: {
          display: false,
        },
        ticks: {
          color: "rgb(161, 161, 170)",
          font: {
            family: "monospace",
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'nearest',
    },
  };

  return (
    <div className="flex justify-center items-center w-full">
      <Line data={data} options={options} />
    </div>
  );
};

export default Graph;
