
import React, { useState, useEffect } from 'react';

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

interface DataTableProps {
    data: Asset[]; // Use the Asset type instead of the specific structure
  }

const Table: React.FC<DataTableProps> = ({ data }) => { 
  const [assets, setAssets] = useState<Asset[]>([]);
  
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    async function fetchAssetData() {
      try {
        const response = await fetch('/api/assettable');
        if (response.ok) {
          const data = await response.json();
          setAssets(data);
        } else {
          console.error('Failed to fetch asset data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchAssetData();
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.kryogenix.org/code/browser/sorttable/sorttable.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);


    // Calculate the range of data to display on the current page
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Apply filtering to the assets
    const trimmedQuery = searchTerm.trim().toLowerCase();
    const filteredAssets = assets.filter((asset) => {
    const {
        abrand,
        type,
        subtype,
        manufacturer,
        modelnum,
        controlsys,
        partid,
        status,
    } = asset;

    return (
        abrand.toLowerCase().includes(trimmedQuery) ||
        type.toLowerCase().includes(trimmedQuery) ||
        subtype.toLowerCase().includes(trimmedQuery) ||
        manufacturer.toLowerCase().includes(trimmedQuery) ||
        modelnum.toLowerCase().includes(trimmedQuery) ||
        controlsys.toLowerCase().includes(trimmedQuery) ||
        partid.toLowerCase().includes(trimmedQuery) ||
        status.toLowerCase().includes(trimmedQuery)
    );
    });

    // Paginate the filtered assets
    const currentData = filteredAssets.slice(startIndex, endIndex);

    // Function to handle pagination navigation
    const goToNextPage = () => {
      setCurrentPage((prevPage) => prevPage + 1);
    };

    const goToPrevPage = () => {
      setCurrentPage((prevPage) => prevPage - 1);
    };

    const pageNumbers = [];
    for (let i = 0; i < Math.ceil(filteredAssets.length / itemsPerPage); i++) {
      pageNumbers.push(i + 1);
    }
    
    const paginate = (pageNumber: number) => {
      setCurrentPage(pageNumber - 1); // Subtract 1 to convert page number to zero-based index
    };
    
  
  return (
    <div className="">
      <div className="table-container">
        <div className="relative mt-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none bg-slate-950 rounded-2xl">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400 bg-slate-950 rounded-2xl"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="search"
            className="block p-2 m-1 pl-10 text-sm text-gray-900 rounded-2xl w-80 bg-slate-950 focus:ring-blue-500 focus:border-blue-500 focus:border-0 outline-none dark:bg-slate-950 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for items"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>
        <table className="sortable min-w-full bg-slate-950 rounded-lg text-center" style={{ width: '300px', height: '300px' }}>
          <thead>
            <tr>
              <th className="p-3">
                <span className="text-gray-400">#</span>
              </th>
              <th className="p-8">
                <span className="text-gray-400">Brand</span>
              </th>
              <th className="p-3">
                <span className="text-gray-400">Model Number</span>
              </th>
              <th className="p-2">
                <span className="text-gray-400">Type</span>
              </th>
              <th className="p-2">
                <span className="text-gray-400">Subtype</span>
              </th>
              <th className="p-6">
                <span className="text-gray-400">Manufacturer</span>
              </th>
              <th className="p-2">
                <span className="text-gray-400">Control System</span>
              </th>
              <th className="p-11">
                <span className="text-gray-400">Status</span>
              </th>
              <th className="p-6">
                <span className="text-gray-400">Part</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((asset, index) => (
              <tr key={index}>
                <td className="p-3">
                  <span className="text-gray-400">{startIndex + index + 1}</span>
                </td>
                <td className="p-3">
                  <span className="text-gray-400">{asset.abrand}</span>
                </td>
                <td className="p-3">
                  <span className="text-gray-400">{asset.modelnum}</span>
                </td>
                <td className="p-2">
                  <span className="text-gray-400">{asset.type}</span>
                </td>
                <td className="p-2">
                  <span className="text-gray-400">{asset.subtype}</span>
                </td>
                <td className="p-3">
                  <span className="text-gray-400">{asset.manufacturer}</span>
                </td>
                <td className="p-2">
                  <span className="text-gray-400">{asset.controlsys}</span>
                </td>
                <td className={`text-center p-2 ${asset.status === 'In Service' ? 'text-green-600' : (asset.status === 'Under Maintain' ? 'text-yellow-600' : 'text-red-600')}`}>
                  <div className={`rounded-full px-2 py-1 ${asset.status === 'In Service' ? 'bg-green-200' : (asset.status === 'Under Maintain' ? 'bg-yellow-200' : 'bg-red-200')}`}>
                    <span className="text-sm">{asset.status}</span>
                  </div>
                </td>
                <td className="p-3">
                  <span className="text-gray-400">{asset.partid}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination text-center">
        <div className="flex justify-center items-center"> {/* Center-align buttons */}
            <ul className="flex space-x-2">
            <button
                onClick={goToPrevPage}
                disabled={currentPage === 0}
                className={`${
                currentPage === 0 
                ? 'text-gray-200' 
                : 'text-white'
                } px-4 py-2 rounded-full font-semibold hover:bg-blue-600 hover:text-white flex items-center`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
                <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                </svg>
            </button>
            {/* Display page numbers */}
            {pageNumbers.map((pageNumber) => (
                <li key={pageNumber}>
                <button
                    onClick={() => paginate(pageNumber)}
                    className={`${
                    currentPage === pageNumber
                        ? 'text-white'
                        : 'text-gray-200'
                    } px-4 py-2 rounded-full font-semibold hover:bg-blue-500 hover:text-white flex items-center`}
                >
                    {pageNumber}
                </button>
                </li>
            ))}
            <button
                onClick={goToNextPage}
                disabled={endIndex >= filteredAssets.length}
                className={`${
                endIndex >= filteredAssets.length
                    ? 'text-gray-200'
                    : ' text-white'
                } px-4 py-2 rounded-full font-semibold hover:bg-blue-600 hover:text-white flex items-center`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                </svg>
            </button>
            </ul>
        </div>
        </div>

        {/* Display the total number of items and items per page */}
        <div className="text-center mt-2 text-gray-300">
        Total Items: {assets.length}
        </div>
    </div>
  </div>
);
};

export default Table;
