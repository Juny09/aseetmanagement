
import React, { useState, useEffect } from 'react';
import { Button } from 'antd';

const columns = [
  { title: '#' },
  { title: 'Brand' },
  { title: 'Model Number' },
  { title: 'Type' },
  { title: 'Subtype' },
  { title: 'Manufacturer' },
  { title: 'Control System' },
  { title: 'Status' },
  { title: 'Part' },
];

const fetchAssets = async (apiEndpoint: string) => {
    try {
      const response = await fetch(apiEndpoint);
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Failed to fetch asset data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

const App: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([] as any[]); // Initialize with an empty array

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const assets = await fetchAssets('/api/assettable'); // Fetch data using your API endpoint
        setData(assets); // Set the fetched data into the state
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={start}
          disabled={!hasSelected}
          loading={loading}
          className="text-white"
        >
          Reload
        </Button>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </div>
      <table className="sortable table-auto bg-slate-950 rounded-3xl h-64">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="p-3">
                <span className="text-gray-400">{column.title}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.keys(row).map((key, colIndex) => (
                <td key={colIndex} className="p-3">
                  <span className="text-gray-400">{row[key]}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;


      {/* Apply inline style to the Table compo
import React, { useState, useEffect } from 'react';
import { Button } from 'antd';

const columns = [
  { title: '#' },
  { title: 'Brand' },
  { title: 'Model Number' },
  { title: 'Type' },
  { title: 'Subtype' },
  { title: 'Manufacturer' },
  { title: 'Control System' },
  { title: 'Status' },
  { title: 'Part' },
];

const fetchAssets = async (apiEndpoint: string) => {
    try {
      const response = await fetch(apiEndpoint);
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Failed to fetch asset data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

const App: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([] as any[]); // Initialize with an empty array

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const assets = await fetchAssets('/api/assettable'); // Fetch data using your API endpoint
        setData(assets); // Set the fetched data into the state
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={start}
          disabled={!hasSelected}
          loading={loading}
          className="text-white"
        >
          Reload
        </Button>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </div>
      <table className="sortable table-auto bg-slate-950 rounded-3xl h-64">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="p-3">
                <span className="text-gray-400">{column.title}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.keys(row).map((key, colIndex) => (
                <td key={colIndex} className="p-3">
                  <span className="text-gray-400">{row[key]}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
nent */}