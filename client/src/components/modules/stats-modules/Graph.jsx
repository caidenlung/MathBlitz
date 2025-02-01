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
    labels: scores.map((_, index) => `Game ${index + 1}`),
    datasets: [
      {
        label: "Score History",
        data: scores,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white",
        },
      },
      title: {
        display: true,
        text: "Your Score History",
        color: "white",
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Scores",
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "white",
          stepSize: 1,
          precision: 0,
        },
      },
      x: {
        title: {
          display: true,
          text: "Game Number",
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "white",
        },
      },
    },
  };

  return (
    <div className="flex justify-center items-center w-full">
      <Line data={data} options={options} />
    </div>
  );
};

export default Graph;
