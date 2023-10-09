// components/DataTable.js

import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'datatables.net';

const DataTable = () => {
  const tableRef = useRef(null);

  useEffect(() => {
    // Initialize DataTable after the component has mounted
    if (tableRef.current) {
      $(tableRef.current).DataTable();
    }

    // Ensure DataTable is destroyed when the component unmounts
    return () => {
      if (tableRef.current) {
        $(tableRef.current).DataTable().destroy(true);
      }
    };
  }, []);

  // Sample data for the table
  const data = [
    {
      Name: 'Tiger Nixon',
      Position: 'System Architect',
      Office: 'Edinburgh',
      Age: '61',
      'Start date': '2011/04/25',
      Salary: '$320,800',
    },
    // Add more data rows here
  ];

  const columns = Object.keys(data[0]); // Extract column names

  return (
    <table
      id="dtBasicExample"
      className="table table-striped table-bordered table-sm"
      cellSpacing="0"
      width="100%"
      ref={tableRef}
    >
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column) => (
              <td key={column}>{row[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
