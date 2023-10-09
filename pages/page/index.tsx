// import React, { useState, useMemo } from 'react';
// import { makeStyles } from '@mui/styles'; // Import makeStyles from Material-UI

// const useStyles = makeStyles({
//   container: {
//     // Define your container styles here
//     // For example:
//     border: '1px solid #ccc',
//     padding: '10px',
//     borderRadius: '4px',
//   },
// });

// const Table = () => {
//   const data = [
//     { name: 'Rara', profile: 'profile1', comment: 'comra' },
//     { name: 'Dada', profile: 'profile2', comment: 'comda' },
//     { name: 'Gaga', profile: 'profile1', comment: 'comga' },
//     { name: 'Mama', profile: 'profile3', comment: 'comma' },
//     { name: 'Papa', profile: 'profile4', comment: 'compa' },
//     // ... Add more data here
//   ];

//   const columns = [
//     { id: 1, title: 'Name', accessor: 'name' },
//     { id: 2, title: 'Profile', accessor: 'profile' },
//     { id: 3, title: 'Comment', accessor: 'comment' },
//   ];

//   const itemsPerPage = 10;
//   const [page, setPage] = useState(1);

//   const start = (page - 1) * itemsPerPage;
//   const end = start + itemsPerPage;
//   const displayData = useMemo(() => data.slice(start, end), [data, start, end]);

//   const classes = useStyles(); // Use the styles object

//   return (
//     <div>
//       <table className={classes.container}> {/* Use classes.container for styling */}
//         <thead>
//           <tr>
//             {columns.map((col) => (
//               <th key={col.id}>{col.title}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {displayData.map((user, i) => (
//             <tr key={i}>
//               {columns.map((col) => (
//                 <td key={col.id}>{user[col.accessor]}</td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div>
//         <button
//           onClick={() => setPage(Math.max(page - 1, 1))}
//           disabled={page === 1}
//         >
//           Prev Page
//         </button>
//         <button
//           onClick={() =>
//             setPage(Math.min(page + 1, Math.ceil(data.length / itemsPerPage)))
//           }
//           disabled={page === Math.ceil(data.length / itemsPerPage)}
//         >
//           Next Page
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Table;
