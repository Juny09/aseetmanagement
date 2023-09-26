import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { prisma } from '../../lib/prisma'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

interface FormData {
  id: string;
  sid:string
  mstatus: string;
  category: string;
  from: string;
  to: string;
  performby: string;
  attach: string;
  estimateddate: string;
  warrantyinfo: string;
  comment: string;
  partId: string;
}

interface Status {
  status: {
    id: string;
    sid:string
    mstatus: string;
    category: string;
    from: string;
    to: string;
    performby: string;
    attach: string;
    estimateddate: string;
    warrantyinfo: string;
    comment: string;
    partId: string;
  }[];
}

const Home: NextPage<Spaces> = ({ spaces }) => {
  const [form, setForm] = useState<FormData>({
    id: '',
    sid:'',
    mstatus: '',
    category: '',
    from: '',
    to: '',
    performby: '',
    attach: '',
    estimateddate: '',
    warrantyinfo: '',
    comment: '',
    partId: '',
  });
  const [newSpace, setNewSpace] = useState<Boolean>(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editedSpaceId, setEditedSpaceId] = useState<string | null>(null);
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  async function handleSubmit(data: FormData) {
    try {
      if (newSpace) {
        if (data.country && data.lid) {
          await fetch('api/spacecreate', {
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          });
        } else {
          alert("space Name and ID can not be blank");
        }
      } else {
        await fetch(`api/space/${data.id}`, {
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'PUT',
        });
      }
  
      // Reset the form and state
      setForm({
        id: '',
        sid:'',
        mstatus: '',
        category: '',
        from: '',
        to: '',
        performby: '',
        attach: '',
        estimateddate: '',
        warrantyinfo: '',
        comment: '',
        partId: '',
      });
      setNewSpace(true);
      setIsFormOpen(false);
      setEditedSpaceId(null);
  
      // Reload the page to reflect the updated data
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }
  

  

  async function updateSpace(id: string, ) {
    // Find the space with the given ID from the `spaces` array
    const spaceToUpdate = spaces.find((space) => space.id === id);
  
    // Check if the space exists
    if (spaceToUpdate) {
      setForm({
        id: spaceToUpdate.id,
        sid: sid, // Update with the new field name
        mstatus: mstatus, // Update with the new field name
        category: category, // Update with the new field name
        from: from, // Update with the new field name
        to: to, // Update with the new field name
        performby: performby, // Update with the new field name
        attach: attach, // Update with the new field name
        estimateddate: estimateddate, // Update with the new field name
        warrantyinfo: warrantyinfo, // Update with the new field name
        comment: comment, // Update with the new field name
        partId: partId, // Update with the new field name
      });
  
      setNewSpace(false);
      setIsFormOpen(true);
      setEditedSpaceId(id);
    }
  }
  
  
  
  

  async function deleteSpace(id: string) {
    try {
      const shouldDelete = window.confirm('Are you sure you want to delete this space?'); // Show confirmation dialog
  
      if (shouldDelete) {
        // User confirmed deletion
        await fetch(`api/space/${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'DELETE',
        });
  
        // Update the filteredSpaces state to remove the deleted space
        setFilteredSpaces((prevSpaces) => prevSpaces.filter((space) => space.id !== id));
      }
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }
  
  

  function handleCancel() {
    setForm({
      lid:'',
      country: '',
      state: '',
      area: '',
      building: '',
      floor: '',
      zone: '',
      dimensions: '',
      areasq: '',
      occupancy: '',
      spacetype: '',
      purposeusage: '',
      id: '',
    });
    setNewSpace(true);
    setIsFormOpen(false);
    setEditedSpaceId(null);
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
  const [filteredSpaces, setFilteredSpaces] = useState<Spaces['spaces']>(spaces);
  const handleSearch = (searchQuery: string) => {
    const filtered = spaces.filter((space) =>
      space.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.building.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.floor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.zone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.dimensions.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.areasq.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.occupancy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.spacetype.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.purposeusage.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.lid.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSpaces(filtered);
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
            <a href="./assetdas" className="text-white">
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

        <a href="./spacelist" className="text-white">
          space
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
                  <div className="field field_v1">
                      <label htmlFor="lid" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">ID</label>
                      <input id="lid" type="text" 
                          placeholder="lid" 
                          value={form.lid} 
                          onChange={e => setForm({...form, lid: e.target.value})}
                          className="field__input"></input>
                      <span className="absolute inset-0 pointer-events-none cursor-text field__label-wrap">
                          <span className="field__label">ID</span>
                      </span>
                  </div>
                <div className="form">
                  <div className="field field_v1">
                      <label htmlFor="country" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">Country</label>
                      <input id="Country" type="text" 
                          placeholder="country" 
                          value={form.country} 
                          onChange={e => setForm({...form, country: e.target.value})}
                          className="field__input"></input>
                      <span className="absolute inset-0 pointer-events-none cursor-text field__label-wrap">
                          <span className="field__label">Country</span>
                      </span>
                  </div>

                  <div className="field field_v2">
                      <label htmlFor="State" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">State</label>
                      <input type="text" 
                          placeholder="State" 
                          id="state"
                          value={form.state} 
                          onChange={e => setForm({...form, state: e.target.value})} 
                          className="field__input" ></input>
                      <span className="field__label-wrap" aria-hidden="true">
                          <span className="field__label">State</span>
                      </span>
                  </div>

                  <div className="field field_v1">
                      <label htmlFor="area" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">Area</label>
                      <input id="area" type="text" 
                          placeholder="area" 
                          value={form.area} 
                          onChange={e => setForm({...form, area: e.target.value})}
                          className="field__input"></input>
                      <span className="absolute inset-0 pointer-events-none cursor-text field__label-wrap">
                          <span className="field__label">Area</span>
                      </span>
                  </div>

                  <div className="field field_v2">
                      <label htmlFor="building" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">Building</label>
                      <input type="text" 
                          placeholder="building" 
                          id="building"
                          value={form.building} 
                          onChange={e => setForm({...form, building: e.target.value})} 
                          className="field__input" ></input>
                      <span className="field__label-wrap" aria-hidden="true">
                          <span className="field__label">Building</span>
                      </span>
                  </div>

                  <div className="field field_v1">
                      <label htmlFor="floor" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">Country</label>
                      <input id="floor" type="text" 
                          placeholder="floor" 
                          value={form.floor} 
                          onChange={e => setForm({...form, floor: e.target.value})}
                          className="field__input"></input>
                      <span className="absolute inset-0 pointer-events-none cursor-text field__label-wrap">
                          <span className="field__label">Floor</span>
                      </span>
                  </div>

                  <div className="field field_v1">
                      <label htmlFor="zone" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">Zone</label>
                      <input id="zone" type="text" 
                          placeholder="zone" 
                          value={form.zone} 
                          onChange={e => setForm({...form, zone: e.target.value})}
                          className="field__input"></input>
                      <span className="absolute inset-0 pointer-events-none cursor-text field__label-wrap">
                          <span className="field__label">Zone</span>
                      </span>
                  </div>

                  <div className="field field_v2">
                      <label htmlFor="dimensions" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">Dimensions</label>
                      <input type="text" 
                          placeholder="dimensions" 
                          id="dimensions"
                          value={form.dimensions} 
                          onChange={e => setForm({...form, dimensions: e.target.value})} 
                          className="field__input" ></input>
                      <span className="field__label-wrap" aria-hidden="true">
                          <span className="field__label">Dimensions</span>
                      </span>
                  </div>
                  <div className="field field_v1">
                      <label htmlFor="areasq" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">Area (sq ft or sq m)</label>
                      <input id="areasq" type="text" 
                          placeholder="areasq" 
                          value={form.areasq} 
                          onChange={e => setForm({...form, areasq: e.target.value})}
                          className="field__input"></input>
                      <span className="absolute inset-0 pointer-events-none cursor-text field__label-wrap">
                          <span className="field__label">Area (sq ft or sq m)</span>
                      </span>
                  </div>

                  <div className="field field_v2">
                      <label htmlFor="occupancy" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">Occupancy</label>
                      <input type="text" 
                          placeholder="occupancy" 
                          id="occupancy"
                          value={form.occupancy} 
                          onChange={e => setForm({...form, occupancy: e.target.value})} 
                          className="field__input" ></input>
                      <span className="field__label-wrap" aria-hidden="true">
                          <span className="field__label">Occupancy</span>
                      </span>
                  </div>
              
                  <div className="field field_v1">
                      <label htmlFor="spacetype" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">Space Type</label>
                      <input id="floor" type="text" 
                          placeholder="spacetype" 
                          value={form.spacetype} 
                          onChange={e => setForm({...form, spacetype: e.target.value})}
                          className="field__input"></input>
                      <span className="absolute inset-0 pointer-events-none cursor-text field__label-wrap">
                          <span className="field__label">Space Type</span>
                      </span>
                  </div>

                  <div className="field field_v2">
                      <label htmlFor="purposeusage" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">Purpose/Usage</label>
                      <input type="text" 
                          placeholder="purposeusage" 
                          id="purposeusage"
                          value={form.purposeusage} 
                          onChange={e => setForm({...form, purposeusage: e.target.value})} 
                          className="field__input" ></input>
                      <span className="field__label-wrap" aria-hidden="true">
                          <span className="field__label">Purpose/Usage</span>
                      </span>
                  </div>
                </div>
            </div>

        {newSpace ? (
          <div className="flex flex-col items-center justify-center h-full">
            <br />
            <div className="flex items-center justify-center flex-col ">
              <button
                onClick={() => setIsFormOpen(true)} // Opens the form when clicked
                className="bg-green-500 text-white rounded p-2"
              >
                Add Space
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
    Add Space
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
            <th scope="col" className="px-6 py-4">ID</th>
            <th scope="col" className="px-6 py-4">Country</th>
            <th scope="col" className="px-6 py-4">State</th>
            <th scope="col" className="px-6 py-4">Area</th>
            <th scope="col" className="px-6 py-4">Building</th>
            <th scope="col" className="px-6 py-4">Floor</th>
            <th scope="col" className="px-6 py-4">Zone</th>
            <th scope="col" className="px-6 py-4">Dimensions</th>
            <th scope="col" className="px-100 py-4">Area (sq ft or sq m)</th>
            <th scope="col" className="px-6 py-4">Occupancy</th>
            <th scope="col" className="px-6 py-4">Space Type</th>
            <th scope="col" className="px-8 py-4">Purpose / Usage</th>
            <th scope="col" className="px-6 py-4">Action</th>
          </tr>
        </thead>
        <tbody>
        {filteredSpaces.map((space, index) => (
          <tr key={space.id} className="border-b dark:border-neutral-500">
            <td className="whitespace-nowrap px-6 py-4 font-medium text-white">{index + 1}</td>
            <td className="whitespace-nowrap px-6 py-4 text-white">{space.lid}</td>
            <td className="whitespace-nowrap px-6 py-4 text-white">{space.country}</td>
            <td className="whitespace-nowrap px-6 py-4 text-white">{space.state}</td>
            <td className="whitespace-nowrap px-6 py-4 text-white">{space.area}</td>
            <td className="whitespace-nowrap px-6 py-4 text-white">{space.building}</td>
            <td className="whitespace-nowrap px-6 py-4 text-white">{space.floor}</td>
            <td className="whitespace-nowrap px-6 py-4 text-white">{space.zone}</td>
            <td className="whitespace-nowrap px-6 py-4 text-white">{space.dimensions}</td>
            <td className="whitespace-nowrap px-8 py-4 text-white">{space.areasq}</td>
            <td className="whitespace-nowrap px-6 py-4 text-white">{space.occupancy}</td>
            <td className="whitespace-nowrap px-6 py-4 text-white">{space.spacetype}</td>
            <td className="whitespace-nowrap px-6 py-4 text-white">{space.purposeusage}</td>

            <td className="flex justify-center space-x-1 whitespace-nowrap px-6 py-4">
              <button onClick={() => updateSpace(space.id,  space.lid, space.country, space.state, space.area, space.building, 
              space.floor, space.zone, space.dimensions, space.areasq, space.occupancy, space.spacetype, space.purposeusage,
              )} className="bg-blue-500 px-3 text-white rounded">Edit</button>
              <button onClick={() => deleteSpace(space.id)} className="bg-red-500 px-3 text-white rounded">X</button>
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
  const spaces = await prisma?.space.findMany({
    select: {
      lid: true,
      country: true,
      state: true,
      area: true,
      building: true,
      floor: true,
      zone: true,
      dimensions: true,
      areasq: true,
      occupancy: true,
      spacetype: true,
      purposeusage: true,
      id: true,
    },
  });

  return {
    props: {
      spaces: spaces || [],
    },
  };
};
