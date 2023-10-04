// import type { NextPage } from 'next'
// import Head from 'next/head'
// import { useState, useEffect } from 'react'
// import { prisma } from '../../lib/prisma'
// import { GetServerSideProps } from 'next'
// import { useRouter } from 'next/router'
// import React from 'react';
// import MultiSelect from 'react-select'; // Replace with your actual multi-select library import


// interface FormData {
//   id: string;
//   type: string;
//   subtype: string;
//   manufacturer: string;
//   modelnum: string;
//   serialnum: string;
//   controlsys: string;
//   connection: string;
//   partid:string;
//   status:string;
//   abrand:string;
// }

// interface Assets {
//   assets: {
//     id: string;
//     type: string;
//     subtype: string;
//     manufacturer: string;
//     modelnum: string;
//     serialnum: string;
//     controlsys: string;
//     connection: string;
//     partid:string;
//     status:string;
//     abrand:string;
//   }[];
//   parts: {
//     brand:string
//     idp:string
//     quantity:string
//     description:string
//     id:string
//   }[];
// }
// const initialFormData = {
//   type: '',
//   subtype: '',
//   manufacturer: '',
//   modelnum: '',
//   serialnum: '',
//   controlsys: '',
//   connection: '',
//   status: '',
//   abrand: '',
//   partid: '',
// };
// const Home: NextPage<Assets> = ({ assets, parts }) => {
//   const [form, setForm] = useState<FormData>({
//     id: '',
//     type: '',
//     subtype: '',
//     manufacturer: '',
//     modelnum: '',
//     serialnum: '',
//     controlsys: '',
//     connection: '',
//     partid: '',
//     status: '',
//     abrand: '',
//   });
//   const [newAsset, setNewAsset] = useState<Boolean>(true);
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [editedAssetId, setEditedAssetId] = useState<string | null>(null);
//   const router = useRouter();

//   const refreshData = () => {
//     router.replace(router.asPath);
//   };

//   async function handleSubmit(data: FormData) {
//     try {
//       if (newAsset) {
//         if (data.abrand && data.modelnum) {
//           await fetch('api/assetcreate', {
//             body: JSON.stringify(data),
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             method: 'POST',
//           });
//         } else {
//           alert("Asset Name and ID can not be blank");
//         }
//       } else {
//         // Find the selected part details (brand and idp) based on partid
//         const selectedPart = parts.find((part) => part.idp === data.partid);
  
//         if (selectedPart) {
//           // Include the selected part details in the data object
//           const updatedData = {
//             ...data,
//             partBrand: selectedPart.brand,
//             partIdp: selectedPart.idp,
//           };
  
//           await fetch(`api/asset/${data.id}`, {
//             body: JSON.stringify(updatedData),
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             method: 'PUT',
//           });
//         } else {
//           console.error('Selected part not found');
//           return;
//         }
//       }
  
//       setForm({
//         id: '',
//         type: '',
//         subtype: '',
//         manufacturer: '',
//         modelnum: '',
//         serialnum: '',
//         controlsys: '',
//         connection: '',
//         partid: '',
//         status: '',
//         abrand: '',
//       });
  
//       setNewAsset(true);
//       setIsFormOpen(false);
  
//       // Reload the page to reflect the updated data
//       window.location.reload();
//     } catch (error) {
//       console.log(error);
//     }
//   }
  
  

//   async function updateAsset(
//     id:                 string,
//     type:               string,
//     subtype:            string,
//     manufacturer:       string,
//     modelnum:           string,
//     serialnum:          string,
//     controlsys:         string,
//     connection:         string,
//     partid:             string,
//     status:             string,
//     abrand:             string,
//     ) {
//     setForm({
//       id,
//       type, 
//       subtype, 
//       manufacturer, 
//       modelnum, 
//       serialnum, 
//       controlsys, 
//       connection, 
//       partid,
//       status,
//       abrand,
//     });
//     setNewAsset(false);
//     setIsFormOpen(true);
//     setEditedAssetId(id);
//   }

//   async function deleteAsset(id: string) {
//     try {
//       const shouldDelete = window.confirm('Are you sure you want to delete this Asset?'); // Show confirmation dialog
  
//       if (shouldDelete) {
//         // User confirmed deletion
//         await fetch(`api/asset/${id}`, {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           method: 'DELETE',
//         });
  
//         // Update the filteredAssets state to remove the deleted Asset
//         setFilteredAssets((prevAssets) => prevAssets.filter((asset) => asset.id !== id));
//       }
//       window.location.reload();
//     } catch (error) {
//       console.error(error);
//     }
//   }
  
  

//   function handleCancel() {
//     setForm({
//       id: '',
//       type: '',
//       subtype: '', 
//       manufacturer: '',
//       modelnum: '',
//       serialnum: '',
//       controlsys: '',
//       connection: '',
//       partid: '',
//       status: '',
//       abrand: '',
//     });
//     setNewAsset(true);
//     setIsFormOpen(false);
//     setEditedAssetId(null);
//   }

// //sort function
// useEffect(() => {
//   const script = document.createElement('script');
//   script.src = 'https://www.kryogenix.org/code/browser/sorttable/sorttable.js';
//   script.async = true;
//   document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
// }, []);

// const [isNavOpen, setIsNavOpen] = useState(false);
    
// const openNav = () => {
//   const mySidenav = document.getElementById('mySidenav');
//   const main = document.getElementById('main');
//   const body = document.body;
//   setIsNavOpen(true);

//   if (mySidenav && main) {
//     mySidenav.style.width = '250px';
//     main.style.marginLeft = '250px';
//     body.style.backgroundColor = 'black';
//   }

//   // Ensure the button remains visible
//   const myButton = document.getElementById('myButton'); // Replace with the actual button ID
//   if (myButton) {
//     myButton.style.visibility = 'visible';
//   }
// };

// const closeNav = () => {
//   const mySidenav = document.getElementById('mySidenav');
//   const main = document.getElementById('main');
//   const body = document.body;
//   setIsNavOpen(false);

//   if (mySidenav && main && body) {
//     mySidenav.style.width = '0';
//     main.style.marginLeft = '0';
//     body.style.backgroundColor = 'black';
//   }

//   // Ensure the button remains visible
//   const myButton = document.getElementById('myButton'); // Replace with the actual button ID
//   if (myButton) {
//     myButton.style.visibility = 'visible';
//   }
// };

// useEffect(() => {
//   const script = document.createElement('script');
//   script.src = 'https://www.kryogenix.org/code/browser/sorttable/sorttable.js';
//   script.async = true;
//   document.body.appendChild(script);

//   return () => {
//     document.body.removeChild(script);
//   };
// }, []);

// const [searchTerm, setSearchTerm] = useState<string>('');
//   const [filteredAssets, setFilteredAssets] = useState<Assets['assets']>(assets);
//   const handleSearch = (searchQuery: string) => {
//     const filtered = assets.filter((asset) => {
//       const {
//         abrand,
//         type,
//         subtype,
//         manufacturer,
//         modelnum,
//         serialnum,
//         controlsys,
//         connection,
//         partid,
//         status,
//       } = asset;
  
//       // Check if any of the fields contains the searchQuery
//       return (
//         abrand.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         type.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         subtype.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         modelnum.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         serialnum.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         controlsys.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         connection.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         partid.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         status.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     });
  
//     setFilteredAssets(filtered);
//   };

//   const handleKeyPress = (e: KeyboardEvent) => {
//     if (e.key === 'Escape') {
//       handleCancel(); // Call your cancel function when Esc is pressed
//     } else if (e.key === 'Enter') {
//       e.preventDefault(); // Prevent the default form submission
//       handleSubmit(form); // Call your submit function when Enter is pressed
//     }
//   };
  
//   React.useEffect(() => {
//     window.addEventListener('keydown', handleKeyPress);
    
//     return () => {
//       window.removeEventListener('keydown', handleKeyPress);
//     };
//   }, []);
  
//   const [selectedParts, setSelectedParts] = useState<string[]>([]);

//   const handlePartSelection = (partId: string) => {
//     if (selectedParts.includes(partId)) {
//       setSelectedParts(selectedParts.filter((id) => id !== partId));
//     } else {
//       setSelectedParts([...selectedParts, partId]);
//     }
//   };
  
//   const [availableParts, setAvailableParts] = useState<{ id: number; brand: string }[]>([]);
//     // Fetch available parts from your server when the component mounts
//     useEffect(() => {
//       async function fetchAvailableParts() {
//         try {
//           const response = await fetch('/api/getparts'); // Replace with your actual API endpoint
//           if (response.ok) {
//             const partsData = await response.json();
//             setAvailableParts(partsData); // Update the availableParts state with the fetched data
//           } else {
//             console.error('Failed to fetch parts data');
//           }
//         } catch (error) {
//           console.error('Error:', error);
//         }
//       }
  
//       fetchAvailableParts();
//     }, []);
  

//     const [formData, setFormData] = useState(initialFormData);
//     const catOptions = parts.map((part) => ({
//       value: part.idp,
//       label: `${part.brand} (${part.idp})`,
//     }));
    
//     const handleMultiSelectChange = (selectedOptions: any) => {
//       const selectedPartIds = selectedOptions.map((option: any) => option.value);
//       setFormData({ ...formData, partid: selectedPartIds });
//     };
  

  

// return (
//   <div className='bg-dark'>

//     <style jsx>{`
//       /* Set scrollbar width and color */
//       ::-webkit-scrollbar {
//         width: 8px;
//       }
//       ::-webkit-scrollbar-track {
//         background: #333; /* Change this to your desired dark color */
//       }
//       ::-webkit-scrollbar-thumb {
//         background-color: #555; /* Change this to your desired scrollbar thumb color */
//       }
//       ::-webkit-scrollbar-thumb:hover {
//         background-color: #777; /* Change this to your desired scrollbar thumb color on hover */
//       }
//     `}</style>
//     <div className="homebg"></div>
//       <div id="mySidenav" className={`sidenav ${isNavOpen ? "open" : ""}`}>
//       <a href="#" className="closebtn" onClick={closeNav}>
//         &times;
//       </a>
//       <a href="./1dashboard" className="">
//         Dashboard
//       </a>
//       <a href="./assetpopup" className="text-white">
//         Asset
//       </a>
//       <a href="./partpopup" className="text-white">
//         Part
//       </a>
//     </div>

//       <div id="main">
//       <span
//         className="sibebar text-white"
//         style={{ fontSize: "30px", cursor: "pointer", visibility: isNavOpen ? 'hidden' : 'visible' }}
//         onClick={openNav}
//       >
//         &#9776;
//       </span>
//       <Head>
//         <title>Assets</title>
//         <meta name="description" content="Generated by create next app" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//       <h1 className="text-center font-bold text-2xl m-4 text-white">Assets</h1>
//       {/* Render the form conditionally */}
//       {isFormOpen && (
//         <form
//           className="w-auto min-w-[25%] max-w-min mx-auto space-y-6 flex flex-col items-stretch"
//           onSubmit={(e) => {
//             e.preventDefault();
//             handleSubmit(form);
//           }}
//         >
//         <style>
//           {`
//             /* Set scrollbar width and color */
//             ::-webkit-scrollbar {
//               width: 8px;
//             }
//             ::-webkit-scrollbar-track {
//               background: #333; /* Change this to your desired dark color */
//             }
//             ::-webkit-scrollbar-thumb {
//               background-color: #555; /* Change this to your desired scrollbar thumb color */
//             }
//             ::-webkit-scrollbar-thumb:hover {
//               background-color: #777; /* Change this to your desired scrollbar thumb color on hover */
//             }
//           `}
//         </style>
//           <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black border border-gray-300 shadow-md p-4 z-50 max-w-2xl text-center">
//             {/* Wrap the form content in a div with max-height and overflow-y-auto */}
//             <div className="max-h-[480px] overflow-y-auto">
//             <h1 className='text-center font-bold text-2xl m-4 text-white'>Asset</h1>
//               <div className="form">
//                 <div className="field field_v2">
//                   <label htmlFor="abrand" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">
//                     Brand
//                   </label>
//                   <input id="abrand" type="text"
//                     placeholder="Brand"
//                     value={form.abrand}
//                     onChange={(e) => setForm({ ...form, abrand: e.target.value })}
//                     className="field__input"></input>
//                   <span className="absolute inset-0 pointer-events-none cursor-text field__label-wrap">
//                   <span className="field__label">Brand</span>
//                   </span>
//                 </div>
                
//                 <div className="mb-4">
//                   <label htmlFor="partid" className="block text-gray-700 text-sm font-bold mb-2">
//                     Part
//                   </label>
//                   <MultiSelect
//                     id="partid"
//                     name="partid"
//                     options={catOptions || []}
//                     isMulti
//                     onChange={handleMultiSelectChange}
//                   />
//                 </div>

//               <br/>

//               <div className="">
//                 <label htmlFor="assettype" className="select_label">Type</label>
//                 <br/>
//                 <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-auto w-80
//                   p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   id="assettype" value={form.type}
//                   onChange={(e) => setForm({ ...form, type: e.target.value })}>

  
//                   <option value="">Select Option</option>
//                     <option value="Production">Production</option>
//                     <option value="ACMV">ACMV</option>
//                     <option value="Lighting">Lighting</option>
//                     <option value="External">External</option>
//                     <option value="Agriculture">Agriculture</option>
       
//                 </select>
//               </div>

//               <div className="">
//                 <label htmlFor="assettype" className="select_label">Sub Type</label>
//                 <br/>
//                 <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-auto w-80
//                   p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   id="assettype" value={form.type}
//                   onChange={(e) => setForm({ ...form, type: e.target.value })}>
//                   <option value="">Select Option</option>
//                     <option value="Machine">Machine</option>
//                     <option value="Pump">Pump</option>
//                     <option value="Motor">Motor</option>
//                     <option value="Compressor">Compressor</option>
//                     <option value="Chiller">Chiller</option>
//                 </select>
//               </div>
            
//                 <div className="field field_v2">
//                     <label htmlFor="manufacturer" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">Manufacturer</label>
//                     <input id="manufacturer" 
//                         type="text" 
//                         placeholder="Name of the Company manufactured equipment"               
//                         value={form.manufacturer} 
//                         onChange={e => setForm({...form, manufacturer: e.target.value})}
//                         className="field__input"></input>
//                     <span className="field__label-wrap" aria-hidden="true">
//                         <span className="field__label">Manufacturer</span>
//                     </span>
//                 </div>

//                 <div className="field field_v2">
//                     <label htmlFor="modelnum" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">Model Number</label> 
//                     <input id="modelnum" 
//                         type="text" 
//                         placeholder="Specific model number of the equipment"
//                         value={form.modelnum} 
//                         onChange={e => setForm({...form, modelnum: e.target.value})} 
//                         className="field__input" >
//                     </input>
//                     <span className="field__label-wrap" aria-hidden="true">
//                         <span className="field__label">Model Number</span>
//                     </span>
//                 </div>

//                 <div className="field field_v2">
//                     <label htmlFor="serialnum" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">Serial Number</label>
//                     <input id="serialnum" 
//                         type="text" 
//                         placeholder="Unique serial number of the equipment"
//                         value={form.serialnum} 
//                         onChange={e => setForm({...form, serialnum: e.target.value})} 
//                         className="field__input" >
//                     </input>
//                     <span className="field__label-wrap" aria-hidden="true">
//                         <span className="field__label">Serial Number</span>
//                     </span>
//                 </div>

              
//                 <div className="">
//                 <br></br>
//                 <label htmlFor="controlsys" className="select_label">Control System </label>
//                     <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-auto w-80
//                       p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
//                       id="controlsys"                 
//                       value={form.controlsys} 
//                       onChange={e => setForm({...form, controlsys: e.target.value})} >
//                         <option value="">Select Option</option>
//                         <option value="Manual">Manual</option>
//                         <option value="Automatic">Automatic</option>
//                         <option value="Programmable">Programmable</option>
//                     </select>

//                 </div>
//                 <br></br>

//                 <div className="">
//                   <label htmlFor="connection" className="select_label">Connection Type </label>
//                     <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-auto w-80
//                         p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                         id="connection"       
//                         value={form.connection} 
//                         onChange={e => setForm({...form, connection: e.target.value})} >
//                         <option value="">Select Option</option>
//                         <option value="Single Phase">Single Phase</option>
//                         <option value="Single Phase VSD">Single Phase VSD</option>
//                         <option value="Single Phase DOL">Single Phase DOL</option>
//                         <option value="3-Phase VSD">3-Phase VSD</option>
//                         <option value="3-Phase DOL">3-Phase DOL</option>
//                     </select>
//                 </div>
//                 <br></br>

//                 <div className="">
//                   <label htmlFor="status" className="select_label">Status</label>
//                     <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-auto w-80
//                         p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                         id="status"       
//                         value={form.status} 
//                         onChange={e => setForm({...form, status: e.target.value})} >
//                         <option value="">Select Option</option>
//                         <option value="In Service">In Service</option>
//                         <option value="Under Maintain">Under Maintain</option>
//                         <option value="Out of Service">Out of Service</option>
//                     </select>
//                 </div>
//                 <br></br>

//                 <label className="select_label">Part</label>
//                 <select
//                     id="part-select"
//                     value={form.partid}
//                     onChange={(e) => setForm({ ...form, partid: e.target.value })}
//                     required
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-auto w-80
//                     p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     multiple
//                   >
//                     <option className="bg-gray-600" value="">
//                       Choose a Part
//                     </option>

//                     {parts.map((part) => (
//                       <option
//                         key={part.idp}
//                         value={part.idp}
//                         className="bg-gray-600"
//                       >
//                         {part.brand} ({part.idp})
//                       </option>
//                     ))}
//                   </select>


//               <br/>
//             </div>

//         {newAsset ? (
//           <div className="flex flex-col items-center justify-center h-full">
//             <br />
//             <div className="flex items-center justify-center flex-col ">
//               <button
//                 onClick={() => setIsFormOpen(true)} // Opens the form when clicked
//                 className="bg-green-500 text-white rounded p-2"
//               >
//                 Add Asset
//               </button>
//               <br />
//               <button onClick={handleCancel} className="bg-red-500 px-5 text-white rounded mt-auto">
//                 Cancel
//               </button>
//             </div>
//           </div>

//           ) : (
//           <>
//           <br/>
//           <div className='flex justify-center space-x-1 whitespace-nowrap px-6 py-4'>
//             <button type="submit" className="bg-blue-500 px-3 text-white rounded">Update</button>
//             <button onClick={handleCancel} className="bg-red-500 px-3 text-white rounded">Cancel</button>
//           </div>
//           </>
//         )}
//       </div>
//     </div>
//   </form>
// )}

//   <button
//     onClick={() => setIsFormOpen(true)} // Opens the form when clicked
//     className="bg-green-500 text-white rounded p-2 mt-2 ml-4 mb-4"
//   >
//     Add Asset
//   </button>
//   <div className="flex flex-col">
//     <div className="relative mt-1">
//       <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//         <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
//           <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
//         </svg>
//       </div>
//       <input
//         type="text"
//         id="search"
//         className="block p-2 pl-10 text-sm text-gray-900 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:border-0 outline-none dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//         placeholder="Search for items"          
//         value={searchTerm}
//         onChange={(e) => {
//           setSearchTerm(e.target.value);
//           handleSearch(e.target.value);
//         }}
//       />
//     </div>
//     <div className="overflow-auto rounded-lg shadow hidden md:block">
//       <table className="sortable w-full text-center text-sm font-light">
//         <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
//           <tr>
//             <th scope="col" className="px-6 py-4">#</th>
//             <th scope="col" className="px-6 py-4">Brand</th>
//             <th scope="col" className="px-6 py-4">Type</th>
//             <th scope="col" className="px-6 py-4">Sub Type</th>
//             <th scope="col" className="px-6 py-4">Manufacturer</th>
//             <th scope="col" className="px-6 py-4">Model Number</th>
//             <th scope="col" className="px-6 py-4">Serial Number</th>
//             <th scope="col" className="px-6 py-4">Control System</th>
//             <th scope="col" className="px-6 py-4">Connection</th>
//             <th scope="col" className="px-6 py-4">Status</th>
//             <th scope="col" className="px-6 py-3">Part</th>
//             <th scope="col" className="px-6 py-3">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredAssets.map((asset, index) => (
//             <tr key={asset.id} className="border-b dark:border-neutral-500">
//               <td className="whitespace-nowrap px-6 py-4 font-medium text-white">{index + 1}</td>
//               <td className="whitespace-nowrap px-6 py-4 text-white">{asset.abrand}</td>
//               <td className="whitespace-nowrap px-6 py-4 text-white">{asset.type}</td>
//               <td className="whitespace-nowrap px-6 py-4 text-white">{asset.subtype}</td>
//               <td className="whitespace-nowrap px-6 py-4 text-white">{asset.manufacturer}</td>
//               <td className="whitespace-nowrap px-6 py-4 text-white">{asset.modelnum}</td>
//               <td className="whitespace-nowrap px-6 py-4 text-white">{asset.serialnum}</td>
//               <td className="whitespace-nowrap px-6 py-4 text-white">{asset.controlsys}</td>
//               <td className="whitespace-nowrap px-6 py-4 text-white">{asset.connection}</td>

//               <td className="whitespace-nowrap px-6 py-4 text-white">{asset.status}</td>
//               <td className="whitespace-nowrap px-6 py-4 text-white">{asset.partid}</td>



//               <td className="flex justify-center space-x-1 whitespace-nowrap px-6 py-4">
//                 <button onClick={() => updateAsset(                              
//                   asset.id,
//                   asset.type,
//                   asset.subtype,
//                   asset.manufacturer,
//                   asset.modelnum,
//                   asset.serialnum,
//                   asset.controlsys,
//                   asset.connection,
//                   asset.partid,
//                   asset.status,
//                   asset.abrand,)} className="bg-blue-500 px-3 text-white rounded">Edit</button>
//                 <button onClick={() => deleteAsset(asset.id)} className="bg-red-500 px-3 text-white rounded">X</button>
//               </td> 
//           </tr>
//         ))}
//         </tbody>
//       </table>
//     </div>  
//   </div>
//   </div>
//   <br/>
//   </div>
//   )
// }

// export default Home

// export const getServerSideProps: GetServerSideProps = async () => {
//   const assets = await prisma?.asset.findMany({
//     select: {
//       id: true,
//       type: true,
//       subtype: true,
//       manufacturer: true,
//       modelnum: true,
//       serialnum: true,
//       controlsys: true,
//       connection: true,
//       partid: true,
//       status: true,
//       abrand: true,
//     },
//   });

//   const parts = await prisma?.part.findMany({
//     select: {
//       id: true,
//       brand: true,
//       idp: true,
//       quantity: true,
//       description: true,
//     },
//   });


//   return {
//     props: {
//       assets: assets || [],
//       parts: parts || [],
//     },
//   };
// };

