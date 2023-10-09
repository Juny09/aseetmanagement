
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
  
  const Table = () => {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredAssets, setFilteredAssets] = useState<Asset[]>(assets);
    const [itemsPerPage] = useState(10);
  
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
  
    useEffect(() => {
      const trimmedQuery = searchTerm.trim().toLowerCase();
  
      const filtered = assets.filter((asset) => {
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
  
      setFilteredAssets(filtered);
    }, [searchTerm, assets, currentPage]);
  
    // Calculate the indices for the current page
    const [assetsPerPage] = useState(10);

    const indexOfLastAsset = currentPage * assetsPerPage;
    const indexOfFirstAsset = indexOfLastAsset - assetsPerPage;
    const currentAssets = filteredAssets.slice(indexOfFirstAsset, indexOfLastAsset);
  

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredAssets.length / assetsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    // Function to handle page change
    const paginate = (pageNumber: number) => {
      setCurrentPage(pageNumber);
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
              className="block p-2 pl-10 text-sm text-gray-900 rounded-2xl w-80 bg-slate-950 focus:ring-blue-500 focus:border-blue-500 focus:border-0 outline-none dark:bg-slate-950 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for items"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </div>
          <table className="sortable min-w-full bg-slate-950 rounded-lg" style={{ width: '300px', height: '300px' }}>
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
                <th className="p-3">
                  <span className="text-gray-400">Type</span>
                </th>
                <th className="p-3">
                  <span className="text-gray-400">Subtype</span>
                </th>
                <th className="p-8">
                  <span className="text-gray-400">Manufacturer</span>
                </th>
                <th className="p-8">
                  <span className="text-gray-400">Control System</span>
                </th>
                <th className="p-11">
                  <span className="text-gray-400">Status</span>
                </th>
                <th className="p-8">
                  <span className="text-gray-400">Part</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map((asset, index) => (
                <tr key={index}>
                  <td className="p-3">
                    <span className="text-gray-400">{index + 1}</span>
                  </td>
                  <td className="p-3">
                    <span className="text-gray-400">{asset.abrand}</span>
                  </td>
                  <td className="p-3">
                    <span className="text-gray-400">{asset.modelnum}</span>
                  </td>
                  <td className="p-3">
                    <span className="text-gray-400">{asset.type}</span>
                  </td>
                  <td className="p-3">
                    <span className="text-gray-400">{asset.subtype}</span>
                  </td>
                  <td className="p-3">
                    <span className="text-gray-400">{asset.manufacturer}</span>
                  </td>
                  <td className="p-3">
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
  
          <div className="mt-5 flex justify-center">
            <ul className="flex space-x-2">
              {pageNumbers.map((pageNumber) => (
                <li key={pageNumber}>
                  <button
                    onClick={() => paginate(pageNumber)}
                    className={`${
                      currentPage === pageNumber
                        ? 'bg-blue-500 text-white'
                        : 'bg-white border border-gray-300 text-gray-700'
                    } px-4 py-2 rounded-full font-semibold hover:bg-blue-500 hover:text-white`}
                  >
                    {pageNumber}
                  </button>
                </li>
              ))}
            </ul>
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
  