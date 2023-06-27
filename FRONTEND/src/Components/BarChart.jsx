import axios from "axios";
import React from "react";
import { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
export default function BarChart() {
  const [barChartData, setBarChartData] = useState([]);
  const chartRef = useRef(null);
  const [month, setmonth] = useState(3);
  useEffect(() => {
    fetchData();
  }, [month]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/bar-chart/${month}`
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
  const changeMonth = (e) => {
    setmonth(e.target.value);
  };

  return (
    <div style={{ background: "#EDF7F7", padding: "5px" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>Bar Chart Status-</h1>&nbsp;&nbsp;&nbsp;&nbsp;
        <select
          onChange={changeMonth}
          style={{ height: "50px", background: "#FFFFFF", marginTop: "16px" }}
        >
          <option value={3}>March</option>
          <option value={1}>January</option>
          <option value={2}>February</option>
          <option value={4}>April</option>
          <option value={5}>May</option>
          <option value={6}>June</option>
          <option value={7}>July</option>
          <option value={8}>August</option>
          <option value={9}>September</option>
          <option value={10}>October</option>
          <option value={11}>November</option>
          <option value={12}>December</option>
        </select>
      </div>
      <div style={{ padding: "30px" }}>
        <canvas id="barChart" />;
      </div>
    </div>
  );
}
