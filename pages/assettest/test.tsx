// import React, { useState, useEffect } from 'react';

// const AssetForm = () => {
//   const [assetName, setAssetName] = useState('');
//   const [assetDescription, setAssetDescription] = useState('');
//   const [selectedParts, setSelectedParts] = useState<number[]>([]);
//   const [availableParts, setAvailableParts] = useState<{ id: number; brand: string }[]>([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitSuccess, setSubmitSuccess] = useState(false);
//   const [submitError, setSubmitError] = useState('');

//   const handlePartSelection = (partId: number) => {
//     // Toggle part selection
//     if (selectedParts.includes(partId)) {
//       setSelectedParts(selectedParts.filter((id) => id !== partId));
//     } else {
//       setSelectedParts([...selectedParts, partId]);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Prevent submitting the form multiple times while waiting for the response
//     if (isSubmitting) {
//       return;
//     }

//     setIsSubmitting(true);

//     // Create an object with asset details and selected part IDs
//     const assetData = {
//       name: assetName,
//       description: assetDescription,
//       parts: selectedParts,
//     };

//     // Send a POST request to your server to create the asset
//     try {
//       const response = await fetch('/api/assetcreate', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(assetData),
//       });

//       if (response.ok) {
//         // Asset created successfully
//         console.log('Asset created:', assetData);
//         // Reset form fields
//         setAssetName('');
//         setAssetDescription('');
//         setSelectedParts([]);
//         setSubmitSuccess(true);
//         setSubmitError('');
//       } else {
//         console.error('Failed to create asset');
//         setSubmitSuccess(false);
//         setSubmitError('Failed to create asset. Please try again later.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setSubmitSuccess(false);
//       setSubmitError('An error occurred while creating the asset.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Fetch available parts from your server when the component mounts
//   useEffect(() => {
//     async function fetchAvailableParts() {
//       try {
//         const response = await fetch('/api/getparts'); // Replace with your actual API endpoint
//         if (response.ok) {
//           const partsData = await response.json();
//           setAvailableParts(partsData); // Update the availableParts state with the fetched data
//         } else {
//           console.error('Failed to fetch parts data');
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     }

//     fetchAvailableParts();
//   }, []);

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 bg-gray-200 rounded-lg">
//       <div className="mb-4">
//         <label htmlFor="assetName" className="block text-sm font-medium text-gray-700">
//           Asset Name:
//         </label>
//         <input
//           type="text"
//           id="assetName"
//           value={assetName}
//           onChange={(e) => setAssetName(e.target.value)}
//           className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//         />
//       </div>
//       <div className="mb-4">
//         <label htmlFor="assetDescription" className="block text-sm font-medium text-gray-700">
//           Asset Description:
//         </label>
//         <textarea
//           id="assetDescription"
//           value={assetDescription}
//           onChange={(e) => setAssetDescription(e.target.value)}
//           className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700">Select Parts:</label>
//         {availableParts.map((part) => (
//           <div key={part.id} className="mt-2 flex items-center">
//             <input
//               type="checkbox"
//               id={`part-${part.id}`}
//               value={part.id}
//               checked={selectedParts.includes(part.id)}
//               onChange={() => handlePartSelection(part.id)}
//               className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//             />
//             <label htmlFor={`part-${part.id}`} className="ml-2 text-sm text-gray-600">
//               {part.brand}
//             </label>
//           </div>
//         ))}
//       </div>
//       <button
//         type="submit"
//         className="w-full px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//       >
//         Create Asset
//       </button>
//       {submitSuccess && (
//         <p className="text-green-600">Asset created successfully!</p>
//       )}
//       {submitError && (
//         <p className="text-red-600">{submitError}</p>
//       )}
//     </form>

    
//   );
// };

// export default AssetForm;
