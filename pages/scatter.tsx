import React from 'react';
import { Scatter } from 'react-chartjs-2';

// Define options for the scatter chart
const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

// Generate data manually for the scatter chart
const data = {
  datasets: [
    {
      label: 'A dataset',
      data: Array.from({ length: 100 }, () => ({
        x: getRandomNumber(-100, 100),
        y: getRandomNumber(-100, 100),
      })),
      backgroundColor: 'rgba(255, 99, 132, 1',
    },
  ],
};

// Function to generate a random number within a range
function getRandomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function ScatterChart() {
  return (
    <div className="rounded-xl">
      <div className="max-w-md mx-auto bg-slate-950 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <h1 className="text-center p-2 text-gray-300">Scatter</h1>
        <div className="md:flex justify-center items-center">
          <Scatter data={data} options={options} className="" />
        </div>
      </div>
    </div>
  );
}

export default ScatterChart;
