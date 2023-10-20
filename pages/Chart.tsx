import React, { useState, useEffect } from 'react';
import { Pie, Scatter } from 'react-chartjs-2';
import { CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import Chart from 'chart.js/auto';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

interface Asset {
  id: string;
  abrand: string;
  status: string;
  // Add more properties as needed
}

interface Part {
  idp: string;
  quantity: number;
  // Add more properties as needed
}

const Charts = () => {
  // Function to generate a random RGB color
  const getRandomRGBColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 0.6)`;
  };

  const [statusPieChartData, setStatusPieChartData] = useState<{
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
    }[];
  }>({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ] as {
      data: number[];
      backgroundColor: string[];
    }[],
  });

  const [partPieChartData, setPartPieChartData] = useState<{
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
    }[];
  }>({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ] as {
      data: number[];
      backgroundColor: string[];
    }[],
  });

  useEffect(() => {
    async function fetchData() {
      try {
        // Make a GET request to fetch data from the "asset" table
        const assetResponse = await fetch('/api/getasset'); // Replace with your API endpoint

        if (assetResponse.ok) {
          const assetData: Asset[] = await assetResponse.json();

          const statusCounts: Record<string, number> = {};

          assetData.forEach((asset) => {
            const key = asset.status;
            if (statusCounts[key]) {
              statusCounts[key]++;
            } else {
              statusCounts[key] = 1;
            }
          });

          const labels = Object.keys(statusCounts);
          const data = labels.map((label) => statusCounts[label]);
          const backgroundColors = labels.map(getRandomRGBColor);

          setStatusPieChartData({
            labels: labels,
            datasets: [
              {
                data: data,
                backgroundColor: backgroundColors,
              },
            ] as {
              data: number[];
              backgroundColor: string[];
            }[],
          });
        } else {
          console.error('Failed to fetch asset data');
        }

        const partResponse = await fetch('/api/partidpq'); // Replace with your API endpoint

        if (partResponse.ok) {
          const partData: Part[] = await partResponse.json();

          const partLabels = partData.map((part: Part) => part.idp);
          const partQuantities = partData.map((part: Part) => part.quantity);
          const partBackgroundColors = partLabels.map(getRandomRGBColor);

          setPartPieChartData({
            labels: partLabels,
            datasets: [
              {
                data: partQuantities,
                backgroundColor: partBackgroundColors,
              },
            ] as {
              data: number[];
              backgroundColor: string[];
            }[],
          });
        } else {
          console.error('Failed to fetch part data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchData();
  }, []);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as 'bottom',
      },
    },
    backgroundColor: 'rgba(50, 70, 90, 0.8',
  };

// Generate data for the Scatter chart
const scatterData = {
  datasets: [
    {
      label: 'Scatter Chart',
      data: [] as { x: string; y: number }[],
      backgroundColor: 'rgba(255, 99, 132, 1',
    },
  ],
};

// Generate data for the Scatter chart representing days of the week (Monday to Sunday) and months from January to December
const daysOfWeek = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

let dayIndex = 0;

for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
  scatterData.datasets[0].data.push({
    x: daysOfWeek[dayIndex],  // Day of the week
    y: monthIndex,           // Month (0 to 11 for January to December)
  });

  // Increment the dayIndex, looping from Monday to Sunday and then back to Monday
  dayIndex = (dayIndex + 1) % 7;
}




  const scatterOptions = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="rounded-xl">
      <div className="max-w-md mx-auto bg-slate-950 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <h1 className="text-center p-2 text-gray-300">Status</h1>
        <div className="md:flex justify-center items-center">
          <Pie data={statusPieChartData} options={chartOptions} className="" />
        </div>
        <br />
        <h1 className="text-center p-2 text-gray-300">Part</h1>
        <div className="md:flex justify-center items-center">
          <Pie data={partPieChartData} options={chartOptions} className="" />
        </div>
        <br />
        <h1 className="text-center p-2 text-gray-300">Scatter Chart</h1>
        <div className="md:flex justify-center items-center">
          <Scatter data={scatterData} options={scatterOptions} className="" />
        </div>
      </div>
    </div>
  );
};

export default Charts;
