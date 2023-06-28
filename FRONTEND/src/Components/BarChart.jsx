import axios from "axios";
import React from "react";
import { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
export default function BarChart({ month, setMonth }) {
  const [barChartData, setBarChartData] = useState([]);
  const chartRef = useRef(null);
  // const [month, setmonth] = useState("march");
  useEffect(() => {
    fetchData();
  }, [month]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/barChart?month=${month}`
      );
      setBarChartData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (barChartData.length > 0) {
      createBarChart();
    }
  }, [barChartData]);
  const createBarChart = () => {
    const chartData = {
      labels: [],
      datasets: [
        {
          label: "Number of Items",
          data: [],
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          barThickness: 100,
        },
      ],
    };
    barChartData.forEach((dataPoint) => {
      chartData.labels.push(dataPoint._id);
      chartData.datasets[0].data.push(dataPoint.count);
    });
    const chartOptions = {
      scales: {
        y: {
          beginAtZero: true,
          stepSize: 1,
        },
      },
    };

    // Destroy the existing chart instance
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    // Get the chart canvas element
    const chartCanvas = document.getElementById("barChart");

    // Create the bar chart

    chartRef.current = new Chart(chartCanvas, {
      type: "bar",
      data: chartData,
      options: chartOptions,
    });
  };
  return (
    <div style={{ background: "#EDF7F7", padding: "5px" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>Bar Chart Status- {month.toUpperCase()}</h1>&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
      <div style={{ padding: "30px" }}>
        <canvas id="barChart" />;
      </div>
    </div>
  );
}
