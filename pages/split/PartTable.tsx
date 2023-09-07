import React, { useEffect, useState } from 'react';
import PartForm from './PartForm'; // Import the PartForm component
import { Part } from './index'; // Make sure the path to Home.tsx is correct


interface PartTableProps {
  parts: Part[];
  updatePart: (updatedPart: Part) => void;
  deletePart: (id: string) => void;
}

interface CombinedData extends Part, FormData {}  

const PartTable: React.FC<PartTableProps> = ({ parts, updatePart, deletePart }) => {
  const [showEditPopup, setShowEditPopup] = useState<boolean>(false);
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);
  const [updatedPart, setUpdatedPart] = useState<Part | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('Last 30 days');

  const openEditPopup = (part: Part) => {
    setSelectedPart(part);
    setUpdatedPart({ ...part });
    setShowEditPopup(true);
  };

  const closeEditPopup = () => {
    setSelectedPart(null);
    setUpdatedPart(null);
    setShowEditPopup(false);
  };

  const handleUpdate = () => {
    if (updatedPart) {
      updatePart(updatedPart);
      closeEditPopup();
    }
  };

  const handleDelete = () => {
    if (selectedPart) {
      deletePart(selectedPart.id);
      closeEditPopup();
    }
  };


        useEffect(() => {
            //table
            const filterTableFunc = () => {
            const filterResult = (document.getElementById("search") as HTMLInputElement).value.toLowerCase();
            const Table = document.getElementById("Data");
            if (Table) {
                const tr = Table.getElementsByTagName("tr");
                for (let i = 1; i < tr.length; i++) {
                const rowStyle = tr[i].style;
                if (rowStyle) {
                    rowStyle.display = "none";
                    const tdArray = tr[i].getElementsByTagName("td");
                    for (let j = 0; j < tdArray.length; j++) {
                    const tdText = tdArray[j].textContent;
                    if (tdText && tdText.toLowerCase().indexOf(filterResult) > -1) {
                        rowStyle.display = "";
                        break;
                    }
                    }
                }
                }
            }
            };
        
            // Call the filtering function when the search input changes
            const searchInput = document.getElementById("search") as HTMLInputElement | null;
            if (searchInput) {
            searchInput.addEventListener("input", filterTableFunc);
            }
        
        // Clean up the event listener when the component unmounts
        return () => {
            if (searchInput) {
            searchInput.removeEventListener("input", filterTableFunc);
            }
        };
        }, []);

        //sort function
        useEffect(() => {
            const script = document.createElement('script');
            script.src = 'https://www.kryogenix.org/code/browser/sorttable/sorttable.js';
            script.async = true;
            document.body.appendChild(script);

            return () => {
            document.body.removeChild(script);
            };
        }, []);

       

    return (
      <div className="w-auto min-w-[25%] max-w-min mt-10 mx-auto space-y-6 flex flex-col items-stretch">

        <div className="relative mt-1">
          
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input
              type="text"
              id="search"
              className="block p-2 pl-10 text-sm text-gray-900 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:border-0 outline-none dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for items"/>
          </div>

        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-center text-sm font-light">
                  <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                    <tr>
                      <th scope="col" className="px-6 py-4">#</th>
                      <th scope="col" className="px-6 py-4">Part name</th>
                      <th scope="col" className="px-6 py-4">ID</th>
                      <th scope="col" className="px-6 py-3">Quantity</th>
                      <th scope="col" className="px-20 py-3">Description</th>
                      <th scope="col" className="px-6 py-3">Action</th>
                    </tr>
                  </thead>
                    <tbody>
                      {parts.map((part, index) => (
                      <tr key={part.id} className="border-b dark:border-neutral-500">
                        <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                        <td className="whitespace-nowrap px-6 py-4">{part.name}</td>
                        <td className="whitespace-nowrap px-6 py-4">{part.idp}</td>
                        <td className="whitespace-nowrap px-6 py-4">{part.quantity}</td>
                        <td className="whitespace-nowrap px-6 py-4">{part.description}</td>
                        
                        <td className="flex justify-center space-x-1 whitespace-nowrap px-6 py-4">
                            <button onClick={() => openEditPopup(part)} className="bg-blue-500 px-3 text-white rounded">
                            Edit
                            </button>
                        </td>
                      </tr>
                     ))}
                </tbody>
                </table>

              </div>
            </div>
          </div>
        </div>

     

              {showEditPopup && selectedPart && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                  <div className="bg-black p-10 rounded shadow-lg w-[50%]">
                    <h2 className="text-center font-bold text-xl mb-4">Edit Part</h2>
                    
                    <PartForm
                      initialForm={updatedPart as CombinedData}
                      newPart={false}
                      handleSubmit={(data) => {
                        setUpdatedPart(data);
                      }}
                      handleCancel={closeEditPopup}
                      
                    />

                  </div>
        </div>
      )}
    <br></br>
    </div>
  );
};


export default PartTable;