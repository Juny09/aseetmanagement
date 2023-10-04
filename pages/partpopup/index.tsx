import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { prisma } from '../../lib/prisma'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

interface FormData {
  brand:string
  idp:string
  quantity:string
  description:string
  id:string
}

interface Parts {
  parts: {
    brand:string
    idp:string
    quantity:string
    description:string
    id:string
  }[];
}

const Home: NextPage<Parts> = ({ parts }) => {
  const [form, setForm] = useState<FormData>({
    brand:'', idp:'', quantity:'', description:'' ,id:'',
  });
  const [newPart, setNewPart] = useState<Boolean>(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editedPartId, setEditedPartId] = useState<string | null>(null);
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  async function handleSubmit(data: FormData) {
    try {
      if (newPart) {
        if (data.brand && data.idp) {
          await fetch('api/partcreate', {
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          });
        } else {
          alert("Part Name and ID can not be blank");
        }
      } else {
        await fetch(`api/part/${data.id}`, {
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'PUT',
        });
      }
  
      setForm({
        brand: '',
        idp: '',
        quantity: '',
        description: '',
        id: '',
      });
  
      setNewPart(true);
      setIsFormOpen(false);
  
      // Reload the page to reflect the updated data
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }
  
  

  async function updatePart(
    id:string,
    brand:string,
    idp:string,
    quantity:string,
    description:string,
    ) {
    setForm({
      id,
      brand,
      idp,
      quantity,
      description,
    });
    setNewPart(false);
    setIsFormOpen(true);
    setEditedPartId(id);
  }

  async function deletePart(id: string) {
    try {
      const shouldDelete = window.confirm('Are you sure you want to delete this part?'); // Show confirmation dialog
  
      if (shouldDelete) {
        // User confirmed deletion
        await fetch(`api/part/${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'DELETE',
        });
  
        // Update the filteredParts state to remove the deleted part
        setFilteredParts((prevParts) => prevParts.filter((part) => part.id !== id));
      }
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }
  
  

  function handleCancel() {
    setForm({
      brand:'', 
      idp:'', 
      quantity:'', 
      description:'', 
      id:''
    });
    setNewPart(true);
    setIsFormOpen(false);
    setEditedPartId(null);
  }

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

const [isNavOpen, setIsNavOpen] = useState(false);
    
const openNav = () => {
  const mySidenav = document.getElementById('mySidenav');
  const main = document.getElementById('main');
  const body = document.body;
  setIsNavOpen(true);

  if (mySidenav && main) {
    mySidenav.style.width = '250px';
    main.style.marginLeft = '250px';
    body.style.backgroundColor = 'black';
  }

  // Ensure the button remains visible
  const myButton = document.getElementById('myButton'); // Replace with the actual button ID
  if (myButton) {
    myButton.style.visibility = 'visible';
  }
};

const closeNav = () => {
  const mySidenav = document.getElementById('mySidenav');
  const main = document.getElementById('main');
  const body = document.body;
  setIsNavOpen(false);

  if (mySidenav && main && body) {
    mySidenav.style.width = '0';
    main.style.marginLeft = '0';
    body.style.backgroundColor = 'black';
  }

  // Ensure the button remains visible
  const myButton = document.getElementById('myButton'); // Replace with the actual button ID
  if (myButton) {
    myButton.style.visibility = 'visible';
  }
};

useEffect(() => {
  const script = document.createElement('script');
  script.src = 'https://www.kryogenix.org/code/browser/sorttable/sorttable.js';
  script.async = true;
  document.body.appendChild(script);

  return () => {
    document.body.removeChild(script);
  };
}, []);

const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredParts, setFilteredParts] = useState<Parts['parts']>(parts);
const handleSearch = (searchQuery: string) => {
  const filtered = parts.filter((part) =>
  part.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );
  setFilteredParts(filtered);
};

  return (
    <div className=''>

    <style jsx>{`
      /* Set scrollbar width and color */
      ::-webkit-scrollbar {
        width: 8px;
      }
      ::-webkit-scrollbar-track {
        background: #333; /* Change this to your desired dark color */
      }
      ::-webkit-scrollbar-thumb {
        background-color: #555; /* Change this to your desired scrollbar thumb color */
      }
      ::-webkit-scrollbar-thumb:hover {
        background-color: #777; /* Change this to your desired scrollbar thumb color on hover */
      }
    `}</style>

      <div id="mySidenav" className={`sidenav ${isNavOpen ? "open" : ""}`}>
      <a href="#" className="closebtn" onClick={closeNav}>
        &times;
      </a>
      <a href="./1dashboard" className="">
        Dashboard
      </a>
      <a href="./assetpopup" className="text-white">
        Asset
      </a>
      <a href="./partpopup" className="text-white">
        Part
      </a>
    </div>

      <div id="main">
      <span
        className="sibebar text-white"
        style={{ fontSize: "30px", cursor: "pointer", visibility: isNavOpen ? 'hidden' : 'visible' }}
        onClick={openNav}
      >
        &#9776;
      </span>
      <Head>
        <title>Parts</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-center font-bold text-2xl m-4 text-white">Parts</h1>
      {/* Render the form conditionally */}
      {isFormOpen && (
        <form
          className="w-auto min-w-[25%] max-w-min mx-auto space-y-6 flex flex-col items-stretch"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(form);
          }}
        >
    <style>
      {`
        /* Set scrollbar width and color */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #333; /* Change this to your desired dark color */
        }
        ::-webkit-scrollbar-thumb {
          background-color: #555; /* Change this to your desired scrollbar thumb color */
        }
        ::-webkit-scrollbar-thumb:hover {
          background-color: #777; /* Change this to your desired scrollbar thumb color on hover */
        }
      `}
    </style>
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black border border-gray-300 shadow-md p-4 z-50 max-w-2xl text-center">
      {/* Wrap the form content in a div with max-height and overflow-y-auto */}
      <div className="max-h-96 overflow-y-auto">
        <div className="form">
          <div className="field field_v2">
            <label htmlFor="Brand" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">
              Brand</label>
            <input id="Brand" type="text"
              placeholder="Brand"
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
              className="field__input"></input>
            <span className="absolute inset-0 pointer-events-none cursor-text field__label-wrap">
             <span className="field__label">Brand</span>
            </span>
          </div>

          <div className="field field_v2">
            <label htmlFor="idp" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">
              ID</label>
            <input type="text"
              placeholder="Part id"
              id="idp"
              value={form.idp}
              onChange={(e) => setForm({ ...form, idp: e.target.value })}
              className="field__input"></input>
            <span className="field__label-wrap" aria-hidden="true">
              <span className="field__label">Part ID</span>
            </span>
          </div>

          <div className="field field_v2">
            <label htmlFor="quantity" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">
              Quantity</label>
            <input id="quantity" type="number"
              placeholder="quantity"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              className="field__input"></input>
            <span className="absolute inset-0 pointer-events-none cursor-text field__label-wrap">
             <span className="field__label">Quantity</span>
            </span>
            <br />
          </div>
          <br />

          <label htmlFor="name" className="w-100 h-1 text-white">
              Description
          </label>
          <br/>
          <div className="field field_v2">
            <br />
            <div className="flex items-center justify-center w-full">
              <textarea
                id="description"
                placeholder="Write the warranty information here ..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="block w-96 p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 
                focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 
                dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
          <br/>
        </div>

        {newPart ? (
          <div className="flex flex-col items-center justify-center h-full">
            <br />
            <div className="flex items-center justify-center flex-col ">
              <button
                onClick={() => setIsFormOpen(true)} // Opens the form when clicked
                className="bg-green-500 text-white rounded p-2"
              >
                Add Part
              </button>
              <br />
              <button onClick={handleCancel} className="bg-red-500 px-5 text-white rounded mt-auto">
                Cancel
              </button>
            </div>
          </div>

          ) : (
          <>
          <br/>
          <div className='flex justify-center space-x-1 whitespace-nowrap px-6 py-4'>
            <button type="submit" className="bg-blue-500 px-3 text-white rounded">Update</button>
            <button onClick={handleCancel} className="bg-red-500 px-3 text-white rounded">Cancel</button>
          </div>
          </>
        )}
      </div>
    </div>
  </form>
)}

  <button
    onClick={() => setIsFormOpen(true)} // Opens the form when clicked
    className="bg-green-500 text-white rounded p-2 mt-2 ml-4 mb-4"
  >
    Add Part
  </button>
  <div className="flex flex-col">
    <div className="relative mt-1">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
      </div>
      <input
        type="text"
        id="search"
        className="block p-2 pl-10 text-sm text-gray-900 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:border-0 outline-none dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search for items"          
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          handleSearch(e.target.value);
        }}
      />
    </div>
    <div className="overflow-auto rounded-lg shadow hidden md:block">
      <table className="sortable w-full text-center text-sm font-light">
        <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
          <tr>
            <th scope="col" className="px-6 py-4">#</th>
            <th scope="col" className="px-6 py-4">Brand</th>
            <th scope="col" className="px-6 py-4">ID</th>
            <th scope="col" className="px-6 py-4">Quantity</th>
            <th scope="col" className="px-6 py-4">Description</th>
            <th scope="col" className="px-6 py-4">Action</th>
          </tr>
        </thead>
        <tbody>
        {filteredParts.map((part, index) => (
          <tr key={part.id} className="border-b dark:border-neutral-500">
            <td className="whitespace-nowrap px-6 py-4 font-medium text-white">{index + 1}</td>
            <td className="whitespace-nowrap px-6 py-4 text-white">{part.brand}</td>
            <td className="whitespace-nowrap px-6 py-4 text-white">{part.idp}</td>
            <td className="whitespace-nowrap px-6 py-4 text-white">{part.quantity}</td>
            <td className="whitespace-nowrap px-6 py-4 text-white">{part.description}</td>

            <td className="flex justify-center space-x-1 whitespace-nowrap px-6 py-4">
              <button onClick={() => updatePart(part.id, part.brand, part.idp, part.quantity, part.description)} className="bg-blue-500 px-3 text-white rounded">Edit</button>
              <button onClick={() => deletePart(part.id)} className="bg-red-500 px-3 text-white rounded">X</button>
            </td> 
          </tr>
        ))}
        </tbody>
      </table>
    </div>  
  </div>
  </div>
  <br/>
  </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const parts = await prisma?.part.findMany({
    select: {
      id: true,
      brand: true,
      idp: true,
      quantity: true,
      description: true,
    },
  });

  return {
    props: {
      parts: parts || [],
    },
  };
};
