import React, { useState, useEffect } from 'react';
import { Button, Table } from 'antd';

const columns = [
  { title: '#', dataIndex: 'id' },
  { title: 'Brand', dataIndex: 'abrand' },
  { title: 'Model Number', dataIndex: 'modelnum' },
  { title: 'Type', dataIndex: 'type' },
  { title: 'Subtype', dataIndex: 'subtype' },
  { title: 'Manufacturer', dataIndex: 'manufacturer' },
  { title: 'Control System', dataIndex: 'controlsys' },
  { title: 'Status', dataIndex: 'status' },
  { title: 'Part', dataIndex: 'partid' },
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

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

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

  // Define a className for the table with Tailwind CSS
  const tableClassName = 'bg-slate-950 text-white';

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
      {/* Apply className to the Table component */}
      <table className="sortable table-auto bg-slate-950 rounded-3xl h-64">
        <thead>
          <tr>
            {columns
              .filter(
                (column) =>
                  [
                    'id',
                    'abrand',
                    'modelnum',
                    'type',
                    'subtype',
                    'manufacturer',
                    'controlsys',
                    'status',
                    'partid',
                  ].includes(column.dataIndex)
              )
              .map((column, index) => (
                <th key={index} className="p-3">
                  <span className="text-gray-400">{column.title}</span>
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td key={0} className="p-3">
                <span className="text-gray-400">{rowIndex + 1}</span>
              </td>
              {columns
                .filter(
                  (column) =>
                    [
                      'abrand',
                      'modelnum',
                      'type',
                      'subtype',
                      'manufacturer',
                      'controlsys',
                      'status',
                      'partid',
                    ].includes(column.dataIndex)
                )
                .map((column, colIndex) => (
                  <td key={colIndex + 1} className="p-3">
                    <span className="text-gray-400">{row[column.dataIndex]}</span>
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
