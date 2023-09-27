import React, { useState, useEffect } from 'react';


// Define a type for the asset data
type Asset = {
    type: string;
    subtype: string;
    manufacturer: string;
    modelnum: string;
    serialnum: string;
    controlsys: string;
    connection: string;
    status: string;
    abrand: string;
    createdAt: string;
    updatedAt: string;
    partid: string;
  };


const Table = () => {
  const [assets, setAssets] = useState<Asset[]>([]);

  // Fetch asset data from the API
  useEffect(() => {
    async function fetchAssetData() {
      try {
        const response = await fetch('/api/assettable'); // Replace with your actual API endpoint
        if (response.ok) {
          const data = await response.json();
          setAssets(data); // Set the fetched data to the 'assets' state
        } else {
          console.error('Failed to fetch asset data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchAssetData();
  }, []); // Empty dependency array ensures fetching data only once


  return (
    <div>
      <h4 className="heading-level-4 u-text-center">Asset Data</h4>
      <table className="table">
        <thead className="table-thead">
          <tr className="table-row">
            <th className="table-thead-col">
              <span className="eyebrow-heading-3">#</span>
            </th>
            <th className="table-thead-col">
              <span className="eyebrow-heading-3">Brand</span>
            </th>
            <th className="table-thead-col">
              <span className="eyebrow-heading-3">Model Number</span>
            </th>
            <th className="table-thead-col">
              <span className="eyebrow-heading-3">Type</span>
            </th>
            <th className="table-thead-col">
              <span className="eyebrow-heading-3">Subtype</span>
            </th>
            <th className="table-thead-col">
              <span className="eyebrow-heading-3">Manufacturer</span>
            </th>


            <th className="table-thead-col">
              <span className="eyebrow-heading-3">Control System</span>
            </th>

            <th className="table-thead-col">
              <span className="eyebrow-heading-3">Status</span>
            </th>
            <th className="table-thead-col">
              <span className="eyebrow-heading-3">Part ID</span>
            </th>
          </tr>
        </thead>
        <tbody className="table-tbody">
          {assets.map((asset, index) => (
            <tr key={index} className="table-row">
              <td className="table-col" data-title="Brand">
                <span className="text">{index + 1}</span>
              </td>
              <td className="table-col" data-title="Brand">
                <span className="text">{asset.abrand}</span>
              </td>
              <td className="table-col" data-title="Model Number">
                <span className="text">{asset.modelnum}</span>
              </td>
              <td className="table-col" data-title="Type">
                <span className="text">{asset.type}</span>
              </td>
              <td className="table-col" data-title="Subtype">
                <span className="text">{asset.subtype}</span>
              </td>
              <td className="table-col" data-title="Manufacturer">
                <span className="text">{asset.manufacturer}</span>
              </td>
              <td className="table-col" data-title="Control System">
                <span className="text">{asset.controlsys}</span>
              </td>
              <td className={`px-0 py-5 ${asset.status === 'In Service' ? 'is-success' : (asset.status === 'Under Maintain' ? 'is-warning' : 'is-danger')}`} data-title="Status">
                <div className={`tag ${asset.status === 'In Service' ? 'is-success' : (asset.status === 'Under Maintain' ? 'is-warning' : 'is-danger')}`}>
                  <span className="text">{asset.status}</span>
                </div>
              </td>
              <td className="table-col" data-title="Control System">
                <span className="text">{asset.partid}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
