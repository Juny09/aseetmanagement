import React, { useState, useEffect } from 'react';


const CycleTime = () => {
  const [totalAssetCount, setTotalAssetCount] = useState(null);
  const [totalBrandCount, setTotalBrandCount] = useState(null);
  const [totalNumPartCount, setTotalNumPartCount] = useState(null);
  const [assetType, setAssetType] = useState(null);


  
  async function fetchTotalAssetCount() {
    try {
      const response = await fetch('/api/DasAsset');
      if (response.ok) {
        const data = await response.json();
        setTotalAssetCount(data.totalAssetCount);
      } else {
        console.error('Failed to fetch total asset count');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function fetchTotalBrandCount() {
    try {
      const response = await fetch('/api/DasAsset');
      if (response.ok) {
        const data = await response.json();
        setTotalBrandCount(data.totalBrandCount);
      } else {
        console.error('Failed to fetch total Brand count');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function fetchTotalNumPartCount() {
    try {
      const response = await fetch('/api/totalPart');
      if (response.ok) {
        const data = await response.json();
        setTotalNumPartCount(data.totalNumPartCount);
      } else {
        console.error('Failed to fetch total Brand count');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // async function fetchTotalNumPartCount() { // Renamed function
  //   try {
  //     const response = await fetch('/api/totalPart');
  //     if (response.ok) {
  //       const data = await response.json();
  //       setTotalNumPartCount(data); // Set the total number of parts state
  //     } else {
  //       console.error('Failed to fetch total Part count');
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // }

  async function fetchData() {
    try {
      // Fetch total asset count and asset types from your API
      const totalAssetResponse = await fetch('/api/DasAsset');
      if (totalAssetResponse.ok) {
        const totalAssetData = await totalAssetResponse.json();
        setTotalAssetCount(totalAssetData.totalAssetCount);
        setAssetType(totalAssetData.totalAssetTypes);
      } else {
        console.error('Failed to fetch total asset count');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const [totalPartCount, setTotalPartCount] = useState(null);

  async function fetchTotalPartCount() {
    try {
      const response = await fetch('/api/totalPartQuan'); // Replace with your actual API endpoint for total parts
      if (response.ok) {
        const data = await response.json();
        setTotalPartCount(data); // Set the total part count state
      } else {
        console.error('Failed to fetch total part count');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  useEffect(() => {
    fetchTotalAssetCount();
    fetchTotalBrandCount();
    fetchTotalNumPartCount(); 
    fetchTotalPartCount();
    fetchData();

  }, []);
  


  return (
  <div className="bg-slate-950 rounded-xl text-gray-400">
    <br />
    <h4 className="text-center text-xl">Assets Management</h4>

      <div className="grid grid-cols-4 gap-1 p-8">
        {/* Total Assets Section */}
        <div className="bg-slate-950 rounded-md p-4 shadow-md">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="currentColor"
              className="bi bi-archive"
              viewBox="0 0 16 16"
            >
              <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 
                    3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1v5.086z"/> 
            </svg>
            <div className="ml-10">
              <p className="font-bold">Total Assets:</p>
              <p>{totalAssetCount !== null ? totalAssetCount : 'Loading...'}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-950 rounded-md p-4 shadow-md">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="currentColor"
              className="bi bi-archive"
              viewBox="0 0 16 16"
            >
              <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
              </svg>
            <div className="ml-10">
              <p className="font-bold">Asset Type:</p>
              <p>{totalAssetCount !== null ? totalAssetCount : 'Loading...'}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-950 rounded-md p-4 shadow-md">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="currentColor"
              className="bi bi-archive"
              viewBox="0 0 16 16"
            >
              <path d="M3 2v4.586l7 7L14.586 9l-7-7H3zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2z"/> 
              <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1v5.086z"/> 
              </svg>
            <div className="ml-10">
              <p className="font-bold">Total Brands:</p>
              <p>{totalAssetCount !== null ? totalAssetCount : 'Loading...'}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-950 rounded-md p-4 shadow-md">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="currentColor"
              className="bi bi-archive"
              viewBox="0 0 16 16"
            >
              <path d="m11.42 2 3.428 6-3.428 6H4.58L1.152 8 4.58 2h6.84zM4.58 1a1 1 0 0 0-.868.504l-3.428 6a1 1 0 0 0 0 .992l3.428 6A1 1 0 0 0 4.58 15h6.84a1 1 0 0 0 .868-.504l3.429-6a1 
                    1 0 0 0 0-.992l-3.429-6A1 1 0 0 0 11.42 1H4.58z"/> 
              <path d="M6.848 5.933a2.5 2.5 0 1 0 2.5 4.33 2.5 2.5 0 0 0-2.5-4.33zm-1.78 3.915a3.5 3.5 0 1 1 6.061-3.5 3.5 3.5 0 0 1-6.062 3.5z"/> 
              </svg>
            <div className="ml-10">
              <p className="font-bold">Total Part:</p>
              <p>{totalAssetCount !== null ? totalAssetCount : 'Loading...'}</p>
            </div>
          </div>
        </div>

      {/* Asset Type Section
      <div className="alert is-info">
        <div className="alert-grid">
          <div className="u-flex u-gap-24 u-cross-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-box" viewBox="0 0 16 16">
            <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
          </svg>
            <p className="u-bold">Asset Type:</p>
            <p>{assetType !== null ? assetType : 'Loading...'}</p>
          </div>
        </div>
      </div> */}

    </div>
  </div>

  );
};

export default CycleTime;