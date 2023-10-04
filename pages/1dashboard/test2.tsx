import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';

Chart.register(CategoryScale);

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

  

  const [pieData, setPieData] = useState({
    labels: ['Assets', 'Brands', 'Parts'],
    datasets: [{
      data: [0, 0, 0], // Initialize with zeros, update with actual counts
      backgroundColor: [
        getRandomRGBColor(),
        getRandomRGBColor(),
        getRandomRGBColor(),
        getRandomRGBColor(),
        getRandomRGBColor(),
        getRandomRGBColor(),
        getRandomRGBColor(),
        getRandomRGBColor(),
        getRandomRGBColor(),
        getRandomRGBColor(),
        getRandomRGBColor(),
        getRandomRGBColor(),
        getRandomRGBColor(),
        getRandomRGBColor(),
        getRandomRGBColor(),
        getRandomRGBColor(),
        getRandomRGBColor(),
        getRandomRGBColor(),

      ],
    }],
  });

  const [pieChartData, setPieChartData] = useState<{
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
    }[];
  }>({
    labels: [], // Initialize with an empty array for labels
    datasets: [
      {
        data: [], // Initialize with an empty array for data
        backgroundColor: [
          getRandomRGBColor(),
          getRandomRGBColor(),
          getRandomRGBColor(),
          getRandomRGBColor(),
          getRandomRGBColor(),
          getRandomRGBColor(),
          getRandomRGBColor(),
          getRandomRGBColor(),
          getRandomRGBColor(),
          getRandomRGBColor(),
          getRandomRGBColor(),
          getRandomRGBColor(),
          getRandomRGBColor(),
          getRandomRGBColor(),
          getRandomRGBColor(),
          getRandomRGBColor(),
          getRandomRGBColor(),
          getRandomRGBColor(),
        ],
      },
    ],
  });

  // Fetch total counts for assets, brands, types, and parts
  useEffect(() => {
    async function fetchData() {
      try {
        const assetResponse = await fetch('/api/DasAsset');
        const brandResponse = await fetch('/api/DasAsset');
        const partResponse = await fetch('/api/DasAsset');
        const partquanResponse = await fetch('/api/partidpq');

        // Make a GET request to fetch all data from the "part" table
        const response = await fetch('/api/partidpq');
    
        if (assetResponse.ok && brandResponse.ok && partResponse.ok && partquanResponse.ok && response.ok) {
          const assetData = await assetResponse.json();
          const brandData = await brandResponse.json();
          const partData = await partResponse.json();
          // const partquanData = await partquanResponse.json();

          // Update the pie chart data with fetched counts and random colors
          setPieData({
            ...pieData,
            datasets: [{
              ...pieData.datasets[0],
              data: [assetData.totalAssetCount, brandData.totalBrandCount, partData.totalPartCount],
              backgroundColor: [
                getRandomRGBColor(),
                getRandomRGBColor(),
                getRandomRGBColor(),
                getRandomRGBColor(),
                getRandomRGBColor(),
                getRandomRGBColor(),
                getRandomRGBColor(),
                getRandomRGBColor(),
                getRandomRGBColor(),
                getRandomRGBColor(),
                getRandomRGBColor(),
                getRandomRGBColor(),
                getRandomRGBColor(),
                getRandomRGBColor(),
                getRandomRGBColor(),

              ],
            }],
          });

          const data: Part[] = await response.json(); // Specify the data type as Part[]
    
          // Extract the necessary data for the Pie chart
          const labels = data.map((part: Part) => part.idp); // Specify the type of 'part'
          const quantities = data.map((part: Part) => part.quantity); // Specify the type of 'part'
    
          // Update the Pie chart data with fetched data and random colors
          setPieChartData({
            ...pieChartData,
            labels,
            datasets: [
              {
                ...pieChartData.datasets[0],
                data: quantities,
                backgroundColor: [
                  getRandomRGBColor(),
                  getRandomRGBColor(),
                  getRandomRGBColor(),
                  getRandomRGBColor(),
                  getRandomRGBColor(),
                  getRandomRGBColor(),
                  getRandomRGBColor(),
                  getRandomRGBColor(),
                  getRandomRGBColor(),
                  getRandomRGBColor(),
                  getRandomRGBColor(),
                  getRandomRGBColor(),
                  getRandomRGBColor(),
                  getRandomRGBColor(),
                  getRandomRGBColor(),
                  getRandomRGBColor(),
                  getRandomRGBColor(),
                  getRandomRGBColor(),
                ],
              },
            ],
          });

        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchData();
  }, []); // Empty dependency array ensures fetching data only once

  return (
    <div className="rounded-xl">
    <br />
    <div className="grid grid-cols-2 grid-rows-2 gap-4">
      <div className="bg-gray-200 p-4 border border-gray-300 rounded-lg shadow-lg">
        <h1 className="text-center p-4">Data</h1>
        <Pie data={pieData} options={{}} />
      </div>
      <div className="bg-gray-200 p-4 border border-gray-300 rounded-lg shadow-lg">
        <h1 className="text-center p-4">Part</h1>
        <Pie data={pieChartData} options={{}} />
      </div>

    </div>
  </div>
  );
};

export default Charts;
