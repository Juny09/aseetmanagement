import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { prisma } from '../../lib/prisma'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

interface FormData {
  name: string;
  id: string;
  bid: string;
}

interface Brands {
  brands: {
    id: string;
    name: string;
    bid: string;
  }[];
}

const Home: NextPage<Brands> = ({ brands }) => {
  const [form, setForm] = useState<FormData>({
    name: '', 
    bid: '', 
    id: '' ,
  });

  const [newBrand, setNewBrand] = useState<Boolean>(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editedBrandId, setEditedBrandId] = useState<string | null>(null);
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  async function handleSubmit(data: FormData) {
    try {
      if (newBrand) {
        if (data.name && data.bid) {
          fetch('api/brandcreate', {
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          }).then(() => {
            setForm({
              id: '',
              name: '',
              bid: '',
            });
            refreshData();
            setIsFormOpen(false);
          });
        } else {
          alert("Brand Name and ID can not be blank");
        }
      } else {
        fetch(`api/brand/${data.id}`, {
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'PUT',
        }).then(() => {
          setForm({
            id: '',
            name: '',
            bid: '',
          });
          setNewBrand(true);
          refreshData();
          setIsFormOpen(false);
        });
      }
    } catch (error) {
    }
  }

  async function updateBrand(
    id:string, name:string, bid:string
    ) {
    setForm({
      id,
      name,
      bid,
    });
    setNewBrand(false);
    setIsFormOpen(true);
    setEditedBrandId(id);
  }

async function deleteBrand(id: string) {
  try {
    const shouldDelete = window.confirm('Are you sure you want to delete this Brand?'); // Show confirmation dialog

    if (shouldDelete) {
      // User confirmed deletion
      fetch(`api/brand/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'DELETE',
      }).then(() => {
        refreshData();
      });
    }
  } catch (error) {
    console.log(error);
  }
}


  function handleCancel() {
    setForm({
      name: '', bid: '', id: ''
    });
    setNewBrand(true);
    setIsFormOpen(false);
    setEditedBrandId(null);
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
  const [filteredBrands, setFilteredBrands] = useState<Brands['brands']>(brands);
const handleSearch = (searchQuery: string) => {
  const filtered = brands.filter((brand) =>
  brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  setFilteredBrands(filtered);
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
      <div className="homebg"></div>
        <div id="mySidenav" className={`sidenav ${isNavOpen ? "open" : ""}`}>
        <a href="#" className="closebtn" onClick={closeNav}>
          &times;
        </a>
        <a href="./homepagesample" className="">
          Dashboard
        </a>
        <div className="custom-dropdown-hover">
          <button className="custom-button ">
            <a href="./equipmenform" className="text-white">
              Asset <i className="custom-caret-down"></i>
            </a>
          </button>
          <div className="custom-dropdown-content">
            <a href="./equipmentform" className="custom-bar-item text-white">
              Form
            </a>
            <a href="#" className="custom-bar-item text-white">
              Link
            </a>
          </div>
        </div>
        <br />
        <div className="custom-dropdown-hover">
          <button className="custom-button ">
            <a href="./spaceinfo" className="text-white">
              Space <i className="custom-caret-down"></i>
            </a>
          </button>
          <div className="custom-dropdown-content">
            <a href="./spaceform" className="custom-bar-item text-white">
              Form
            </a>
            <a href="#" className="custom-bar-item text-white">
              Link
            </a>
          </div>
        </div>
        <br />
        <div className="custom-dropdown-hover">
          <button className="custom-button ">
            <a href="./cobineuraldpm" className="text-white">
              CobiNeural <i className="custom-caret-down"></i>
            </a>
          </button>
          <div className="custom-dropdown-content">
            <a href="./cobineuralform" className="custom-bar-item text-white">
              Form
            </a>
            <a href="#" className="custom-bar-item text-white">
              Link
            </a>
          </div>
        </div>

        <a href="./partlist" className="text-white">
          Part
        </a>
        <a href="#" className="text-white">
          Contact
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
        <title>Brands</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-center font-bold text-2xl m-4 text-white">Brands</h1>
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
    <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"></div>
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black border border-gray-300 shadow-md p-4 z-50 max-w-2xl text-center">
      {/* Wrap the form content in a div with max-height and overflow-y-auto */}
      <div className="max-h-96 overflow-y-auto">
        <div className="form">
          <div className="field field_v2">
            <label htmlFor="name" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">
              Brand Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Brand Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="field__input"
            />
            <span className="absolute inset-0 pointer-events-none cursor-text field__label-wrap">
              <span className="field__label">Brand Name</span>
            </span>
          </div>
          <br />
          <div className="field field_v2">
            <label htmlFor="bid" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">
              Brand ID
            </label>
            <input
              type="text"
              placeholder="Brand ID"
              id="bid"
              value={form.bid}
              onChange={(e) => setForm({ ...form, bid: e.target.value })}
              className="field__input"
              style={{ maxWidth: 'none', width: '100%' }} // Updated styles
            />
            <span className="field__label-wrap" aria-hidden="true">
              <span className="field__label">Brand ID</span>
            </span>
          </div>
          <br />
      </div>

        {newBrand ? (
          <div className="flex flex-col items-center justify-center h-full">
            <br />
            <div className="flex items-center justify-center flex-col ">
              <button
                onClick={() => setIsFormOpen(true)} // Opens the form when clicked
                className="bg-green-500 text-white rounded p-2"
              >
                Add Brand
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
    Add Brand
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
                      <th scope="col" className="px-6 py-4">Brand Name</th>
                      <th scope="col" className="px-6 py-4">Brand ID</th>

                    </tr>
                  </thead>
                  <tbody>
                    {filteredBrands.map((brand, index) => (
                      <tr key={brand.id} className="border-b dark:border-neutral-500">
                        {/* Index */}
                        <td className="whitespace-nowrap px-6 py-4 font-medium text-white">{index + 1}</td>
                          
                        {/* Basic Information */}
                        <td className="whitespace-nowrap px-6 py-4 text-white">{brand.name}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-white">{brand.bid}</td>

                          <td className="flex justify-center space-x-1 whitespace-nowrap px-6 py-4">
                            <button onClick={() => updateBrand(brand.name, brand.bid, brand.id)} 
                            className="bg-blue-500 px-3 text-white rounded">Edit</button>
                            <button onClick={() => deleteBrand(brand.id)} className="bg-red-500 px-3 text-white rounded">X</button>
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
  const brands = await prisma?.brand.findMany({
    select: {
      id: true,
      name: true,
      bid: true,
    },
  });

  return {
    props: {
      brands: brands || [],
    },
  };
};
