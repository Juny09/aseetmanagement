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
    <div>
      <h4 className="heading-level-4 u-text-center text-xl">Assets Management</h4>
      <div className="u-flex u-main-space-between">
        {/* Total Assets Section */}
        <div className="u-flex u-gap-32">
          <div className="alert is-info u-width-200 u-margin-32">
            <div className="alert-grid">
              <div className="u-flex u-gap-24 u-cross-center">
                <p className="u-bold">Total Assets:</p>
                <p>{totalAssetCount !== null ? totalAssetCount : 'Loading...'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="u-flex u-gap-32">
          <div className="alert is-info u-width-200 u-margin-32">
            <div className="alert-grid">
              <div className="u-flex u-gap-24 u-cross-center">
                <p className="u-bold">Asset Type:</p>
                <p>{assetType !== null ? assetType : 'Loading...'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Total Brands Section */}
        <div className="u-flex u-gap-32">
          <div className="alert is-info u-width-200 u-margin-32">
            <div className="alert-grid">
              <div className="u-flex u-gap-24 u-cross-center">
                <p className="u-bold">Total Brands:</p>
                <p>{totalBrandCount !== null ? totalBrandCount : 'Loading...'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="u-flex u-gap-32">
          <div className="alert is-info u-width-200 u-margin-32">
            <div className="alert-grid">
              <div className="u-flex u-gap-24 u-cross-center">
                <p className="u-bold">Total Part:</p>
                <p>{totalNumPartCount !== null ? totalNumPartCount : 'Loading...'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Total Parts Section */}
        <div className="u-flex u-gap-32">
          <div className="alert is-info u-width-200 u-margin-32">
            <div className="alert-grid">
              <div className="u-flex u-gap-24 u-cross-center">
                <p className="u-bold">Total Parts Quantity:</p>
                <p>{totalPartCount !== null ? totalPartCount : 'Loading...'}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div> 
  );
};

export default CycleTime;