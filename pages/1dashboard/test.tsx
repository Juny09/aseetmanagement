import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

Chart.defaults.plugins.legend.display = false;

const Charts = () => {
  const [pieChartData, setPieChartData] = useState({
    labels: ['Assets', 'Brands', 'Parts'],
    datasets: [{
      data: [0, 0, 0], // Initialize with zeros, update with actual counts
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(255, 205, 86, 0.6)',
        'rgba(54, 162, 235, 0.6)',
      ],
    }],
  });

  const [partQuantityData, setPartQuantityData] = useState([]); // State for brand quantity data

  useEffect(() => {
    async function fetchData() {
      try {
        const assetResponse = await fetch('/api/DasAsset');
        const brandResponse = await fetch('/api/DasBrand');
        const partResponse = await fetch('/api/DasPart');
        const partquanResponse = await fetch('/api/totalPartQuan');
        const partQuantityResponse = await fetch('/api/totalPartQuan'); // New API endpoint

        if (
          assetResponse.ok &&
          brandResponse.ok &&
          partResponse.ok &&
          partquanResponse.ok &&
          partQuantityResponse.ok // Check for the new response
        ) {
          const assetData = await assetResponse.json();
          const brandData = await brandResponse.json();
          const partData = await partResponse.json();
          const partquanData = await partquanResponse.json();
          const partQuantityData = await partQuantityResponse.json(); // New data

          // Update the pie chart data with fetched counts
          setPieChartData({
            ...pieChartData,
            datasets: [{
              ...pieChartData.datasets[0],
              data: [assetData.totalAssetCount, brandData.totalBrandCount, partData.totalPartCount],
            }],
          });

          // Update the brand quantity data
          setPartQuantityData(partQuantityData);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-3 gap-8">
        <div className="alert is-info w-full">
          <Pie data={pieChartData} options={{}} />
        </div>
        <div className="alert is-info w-full">
          <Pie data={getPartQuantityChartData(partQuantityData)} options={{}} />
        </div>
      </div>
    </div>
  );
};

// Helper function to create data for brand quantity pie chart
function getPartQuantityChartData(partQuantityData) {
  return {
    labels: partQuantityData.map(part => part.brand),
    datasets: [{
      data: partQuantityData.map(part => part.quantity),
      backgroundColor: generateRandomColors(partQuantityData.length),
    }],
  };
}

// Helper function to generate random colors
function generateRandomColors(count) {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`;
    colors.push(color);
  }
  return colors;
}

export default Charts;
