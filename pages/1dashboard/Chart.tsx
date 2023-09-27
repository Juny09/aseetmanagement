import React, { useState, useEffect } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';

Chart.register(CategoryScale);

const Charts = () => {
const [chartData, setChartData] = useState({
  labels: ['Total Assets', 'Total Brands', 'Total Parts'],
  datasets: [{
    label: 'Count',
    data: [0, 0, 0, 0], // Initialize with zeros, update with actual counts
    backgroundColor: [
      'rgba(53, 162, 235, 0.6)',
      'rgba(75, 192, 192, 0.6)',
      'rgba(255, 206, 86, 0.6)',
    ],
  }],
});

  const [pieChartData, setPieChartData] = useState({
    labels: ['Assets', 'Brands', 'Parts'],
    datasets: [{
      data: [0, 0, 0, 0], // Initialize with zeros, update with actual counts
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(255, 205, 86, 0.6)',
        'rgba(54, 162, 235, 0.6)',
      ],
    }],
  });

  const [pieChartQuan, setPieChartQuan] = useState({
    labels: ['Total Quantity','Total Part'],
    datasets: [{
      data: [0], // Initialize with zero, update with actual count
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
      ],
    }],
  });

  // Fetch total counts for assets, brands, types, and parts
  useEffect(() => {
    async function fetchData() {
      try {
        const assetResponse = await fetch('/api/DasAsset');
        const brandResponse = await fetch('/api/DasAsset');
        const partResponse = await fetch('/api/DasAsset');
        const partquanResponse = await fetch('/api/totalPartQuan');
    
        if (assetResponse.ok && brandResponse.ok && partResponse.ok && partquanResponse.ok) {
          const assetData = await assetResponse.json();
          const brandData = await brandResponse.json();

          const partData = await partResponse.json();
          const partquanData = await partquanResponse.json();
    
          // Update the bar chart data with fetched counts
          setChartData({
            ...chartData,
            datasets: [{
              ...chartData.datasets[0],
              data: [assetData.totalAssetCount, brandData.totalBrandCount, partData.totalPartCount],
            }],
          });
    
          // Update the pie chart data with fetched counts
          setPieChartData({
            ...pieChartData,
            datasets: [{
              ...pieChartData.datasets[0],
              data: [assetData.totalAssetCount, brandData.totalBrandCount, partData.totalPartCount],
            }],
          });
    
          // Update the pie chart for quantity with fetched data
          setPieChartQuan({
            ...pieChartQuan,
            datasets: [{
              ...pieChartQuan.datasets[0],
              data: [partquanData.totalPartQuan, partData.totalPartCount],
            }],
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
    <div>
      <div className="grid grid-cols-3 gap-8">
        {/* <div className="alert is-info w-full">
          <Bar data={chartData} options={{}} />
        </div>
        <div className="alert is-info w-full">
          <Line data={chartData} options={{}} />
        </div> */}
        <div className="alert is-info w-full">
          <Pie data={pieChartData} options={{}} />
        </div>
        <div className="alert is-info w-full">
          <Pie data={pieChartQuan} options={{}} />
        </div>
      </div>
    </div>
  );
};

export default Charts;
