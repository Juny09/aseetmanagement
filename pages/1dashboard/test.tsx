import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import {Chart,ArcElement} from 'chart.js/auto';

Chart.register(ArcElement);
interface Part {
  idp: string;
  quantity: number;
  // Add more properties as needed
}

const Charts = () => {
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
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 205, 86, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          // Add more colors if needed
        ],
      },
    ],
  });

  // Fetch data for the Pie chart
  useEffect(() => {
    async function fetchData() {
      try {
        // Make a GET request to fetch all data from the "part" table
        const response = await fetch('/api/partidpq');
    
        if (response.ok) {
          const data: Part[] = await response.json(); // Specify the data type as Part[]
    
          // Extract the necessary data for the Pie chart
          const labels = data.map((part: Part) => part.idp); // Specify the type of 'part'
          const quantities = data.map((part: Part) => part.quantity); // Specify the type of 'part'
    
          // Update the Pie chart data
          setPieChartData({
            ...pieChartData,
            labels,
            datasets: [
              {
                ...pieChartData.datasets[0],
                data: quantities,
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
    <div>
      <div className="alert is-info w-full">
        <Pie data={pieChartData} options={{}} />
      </div>
    </div>
  );
};

export default Charts;
