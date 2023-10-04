import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';

Chart.register(CategoryScale);

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
      data: number[]; // Change this to an array of numbers
      backgroundColor: string[];
    }[];
  }>({
    labels: [],
    datasets: [
      {
        data: [], // Change this to an empty array of numbers
        backgroundColor: [],
      },
    ],
  });
  
  const [partPieChartData, setPartPieChartData] = useState<{
    labels: string[];
    datasets: {
      data: number[]; // Change this to an array of numbers
      backgroundColor: string[];
    }[];
  }>({
    labels: [],
    datasets: [
      {
        data: [], // Change this to an empty array of numbers
        backgroundColor: [],
      },
    ],
  });  


  // Fetch data from the "asset" table and calculate counts for each unique "status" and "abrand"
  useEffect(() => {
    async function fetchData() {
      try {
      // Make a GET request to fetch data from the "asset" table
      const assetResponse = await fetch('/api/getasset'); // Replace with your API endpoint

      if (assetResponse.ok) {
        // const statusData: Asset[] = await assetResponse.json();

        // // Extract the necessary data for the Pie chart
        // const labels = statusData.map((asset: Asset) => `${asset.status}`);
        // const data = statusData.map((asset: Asset) => asset.id); // Assuming you have a quantity property for Asset

        // // Generate random background colors
        // const backgroundColors = labels.map(getRandomRGBColor);

        // // Update the status Pie chart data
        // setStatusPieChartData({
        //   labels: labels,
        //   datasets: [
        //     {
        //       data: data,
        //       backgroundColor: backgroundColors,
        //     },
        //   ],
        // });

        //status + abrand
        // const assetData: Asset[] = await assetResponse.json();

        // // Calculate the count of each status type
        // const statusCounts: Record<string, number> = {};

        // assetData.forEach((asset) => {
        //   const key = `${asset.abrand} - ${asset.status}`;
        //   if (statusCounts[key]) {
        //     statusCounts[key]++;
        //   } else {
        //     statusCounts[key] = 1;
        //   }
        // });

        // const labels = Object.keys(statusCounts);
        // const data = labels.map((label) => statusCounts[label]);

        // // Generate random background colors
        // const backgroundColors = labels.map(getRandomRGBColor);

        // setStatusPieChartData({
        //   labels: labels,
        //   datasets: [
        //     {
        //       data: data,
        //       backgroundColor: backgroundColors,
        //     },
        //   ],
        // });

        const assetData: Asset[] = await assetResponse.json();
  
          // Calculate the count of each status type
          const statusCounts: Record<string, number> = {};
  
          assetData.forEach((asset) => {
            const key = asset.status; // Use "status" as the key
            if (statusCounts[key]) {
              statusCounts[key]++;
            } else {
              statusCounts[key] = 1;
            }
          });
  
          const labels = Object.keys(statusCounts);
          const data = labels.map((label) => statusCounts[label]);
  
          // Generate random background colors
          const backgroundColors = labels.map(getRandomRGBColor);
  
          setStatusPieChartData({
            labels: labels,
            datasets: [
              {
                data: data,
                backgroundColor: backgroundColors,
              },
            ],
          });
        } else {
          console.error('Failed to fetch asset data');
        }

        // Make a GET request to fetch data from the "part" table
        const partResponse = await fetch('/api/partidpq'); // Replace with your API endpoint

        if (partResponse.ok) {
          const partData: Part[] = await partResponse.json();

          // Extract the necessary data for the Pie chart
          const partLabels = partData.map((part: Part) => part.idp);
          const partQuantities = partData.map((part: Part) => part.quantity);
          const partBackgroundColors = partLabels.map(getRandomRGBColor);

          // Update the part Pie chart data
          setPartPieChartData({
            labels: partLabels,
            datasets: [
              {
                data: partQuantities,
                backgroundColor: partBackgroundColors,
              },
            ],
          });
        } else {
          console.error('Failed to fetch part data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchData();
    
  }, []); // Empty dependency array ensures fetching data only once
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
    },
    // Set the background color for the entire chart
    backgroundColor: 'rgba(50, 70, 90, 0.8)', // Replace with your desired color
  };


  return (
    <div className="rounded-xl">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-950 p-2 rounded-lg shadow-lg" style={{ width: '250px', height: '300px' }}>
          <h1 className="text-center p-2 text-gray-300">Status</h1>
          <Pie data={statusPieChartData} options={chartOptions} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-950 p-2 rounded-lg shadow-lg" style={{ width: '250px', height: '300px' }}>
          <h1 className="text-center p-2 text-gray-300">Part</h1>
          <Pie data={partPieChartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Charts;





