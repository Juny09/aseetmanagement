import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { prisma } from '../../lib/prisma'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import 'bootstrap/dist/css/bootstrap.css'

interface FormData {
  id: string;
  commid: string;
  protocol: string;
  medium: string;
  ip: string;
  baudrate: string;
  stopbit: string;
  parity: string;
}

interface Communis {
  communis: {
    id: string;
    commid: string;
    protocol: string;
    medium: string;
    ip: string;
    baudrate: string;
    stopbit: string;
    parity: string;
  }[];
}

const Home: NextPage<Communis> = ({ communis }) => {
  const [form, setForm] = useState<FormData>({
    id: '',
    commid: '',
    protocol: '',
    medium: '',
    ip: '',
    baudrate: '',
    stopbit: '',
    parity: '',
  });
  const [newCommuni, setNewCommuni] = useState<Boolean>(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editedCommuniId, setEditedCommuniId] = useState<string | null>(null);
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  async function handleSubmit(data: FormData) {
    try {
      if (newCommuni) {
        if (data.commid && data.protocol) {
          fetch('api/communicatecreate', {
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          }).then(() => {
            setForm({
              id: '',
              commid: '',
              protocol: '',
              medium: '',
              ip: '',
              baudrate: '',
              stopbit: '',
              parity: '',
            });
            refreshData();
            setIsFormOpen(false);
          });
        } else {
          alert("Communi Protocol and ID can not be blank");
        }
      } else {
        fetch(`api/communicate/${data.id}`, {
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'PUT',
        }).then(() => {
          setForm({
            id: '',
            commid: '',
            protocol: '',
            medium: '',
            ip: '',
            baudrate: '',
            stopbit: '',
            parity: '',
          });
          setNewCommuni(true);
          refreshData();
          setIsFormOpen(false);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  

  async function updateCommuni(
    id:         string,
    commid:     string,
    protocol:   string,
    medium:     string,
    ip:         string,
    baudrate:    string,
    stopbit:    string,
    parity:     string,
    ) {
    setForm({
      id,
      commid,
      protocol,
      medium,
      ip,
      baudrate,
      stopbit,
      parity,
    });
    setNewCommuni(false);
    setIsFormOpen(true);
    setEditedCommuniId(id);

  }

  async function deleteCommuni(id: string) {
    try {
      const shouldDelete = window.confirm('Are you sure you want to delete this Communi?'); // Show confirmation dialog
  
      if (shouldDelete) {
        // User confirmed deletion
        await fetch(`api/communicate/${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'DELETE',
        });
        
        // After successful deletion, update the Communis state without reloading the entire page
        const updatedCommunis = communis.filter((communi) => communi.id !== id);
        setFilteredCommunis(updatedCommunis);
      }
    } catch (error) {
      console.log(error);
    }
  }
  


  function handleCancel() {
    setForm({
      id: '',
      commid: '',
      protocol: '',
      medium: '',
      ip: '',
      baudrate: '',
      stopbit: '',
      parity: '',
    });
    setNewCommuni(true);
    setIsFormOpen(false);
    setEditedCommuniId(null);
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
  const [filteredCommunis, setFilteredCommunis] = useState<Communis['communis']>(communis);
const handleSearch = (searchQuery: string) => {
  const filtered = communis.filter((communi) =>
  communi.protocol.toLowerCase().includes(searchQuery.toLowerCase())
  );
  setFilteredCommunis(filtered);
};

  return (
    <div className='bg-dark'>

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
        <a href="./1dashboard" className="">
          Dashboard
        </a>
        <a href="./assetpopup" className="text-white">
          Asset
        </a>
        <a href="./partlist" className="text-white">
          Space
        </a>
        <a href="./cobipopup" className="text-white">
          Cobinerual
        </a>
        <a href="./brandpopup" className="text-white">
          Brand
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
        <title>Communis</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-center font-bold text-2xl m-4 text-white">Communis</h1>
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
          <div className="">
          <div className="field field_v2">
                <label htmlFor="commid" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">ID</label>
                <input id="commid" 
                    type="text" 
                    placeholder="Enter your commid"               
                    value={form.commid} 
                    onChange={e => setForm({...form, commid: e.target.value})}
                    className="field__input"></input>
                    
                <span className="field__label-wrap" aria-hidden="true">
                    <span className="field__label">ID</span>
                </span>
                
            </div>
            <br/><br/>
            <label htmlFor="protocol" className="select_label">Comm Protocol</label>
            <br/>
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-auto w-80
              p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="protocol" value={form.protocol}
              onChange={(e) => setForm({ ...form, protocol: e.target.value })}>
              <option value="">Select Option</option>
              <option value="Modbus">Modbus</option>
              <option value="BACnet.">BACnet.</option>
            </select>
          </div>
          <br/>
          <div className="">
            <label htmlFor="medium" className="select_label">Comm Medium</label>
            <br></br>
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-auto w-80
              p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="medium" 
              value={form.medium} 
              onChange={e => setForm({...form, medium: e.target.value})}>
                <option value="">Select Option</option>
                <option value="Wireless RS-485">Wireless RS-485</option>
                <option value="Wired RS-485">Wired RS-485</option>
                <option value="IP">IP</option>
            </select>
          </div>
        
            <div className="field field_v2">
                <label htmlFor="ip" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">IP / Modbus Address</label>
                <input id="ip" 
                    type="text" 
                    placeholder="Enter your IP/Modbus Address"               
                    value={form.ip} 
                    onChange={e => setForm({...form, ip: e.target.value})}
                    className="field__input"></input>
                <span className="field__label-wrap" aria-hidden="true">
                    <span className="field__label">IP / Modbus Address</span>
                </span>
            </div>
            <br/>
          <div className="">
          <br/>
            <label htmlFor="baudrate" className="select_label">Baudrate</label>
            <br></br>
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-auto w-80
              p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="baudrate" 
              value={form.baudrate} 
              onChange={e => setForm({...form, baudrate: e.target.value})}>
                <option value="">Select Option</option>
                <option value="4800">4800</option>
                <option value="9600">9600</option>
                <option value="19200">19200</option>
            </select>
          </div>

          <div className="">
          <br/>
            <label htmlFor="stopbit" className="select_label">Stop-Bit Configuration</label>
            <br></br>
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-auto w-80
              p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="stopbit" 
              value={form.stopbit} 
              onChange={e => setForm({...form, stopbit: e.target.value})}>
                <option value="">Select Option</option>
                <option value="1 Stop Bit">1 Stop Bit</option>
                <option value="None">None</option>
            </select>
          </div>

          <div className="">
          <br/>
            <label htmlFor="parity" className="select_label">Parity Setup</label>
            <br></br>
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-auto w-80
              p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="parity" 
              value={form.parity} 
              onChange={e => setForm({...form, parity: e.target.value})}>
                <option value="">Select Option</option>
                <option value="Even">Even</option>
                <option value="Odd">Odd</option>
                <option value="None">None</option>
            </select>
          </div>

            <br></br>
        </div>

        {newCommuni ? (
          <div className='anibtn flex flex-col items-center justify-between h-full'>
            <br />
            <button
              type="submit"
              className="relative transform -translate-x-1/2 -translate-y-1/2 font-bold text-white bg-white border-3 
              border-black rounded-full w-44 h-11 text-center transition-all duration-350 hover:bg-black hover:text-white">
              <span>Add +</span>
              <div className="absolute top-0 left-0 w-full h-full bg-white rounded-full opacity-0 invisible transition-all duration-350 success">
                <svg
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  viewBox="0 0 29.756 29.756"
                  xmlSpace="preserve"
                  className="w-8 h-5 mx-auto mt-1 transform origin-center -translate-y-1/2 rotate-0 scale-0 transition-all duration-350"
                >
                  <path
                    d="M29.049,5.009L28.19,4.151c-0.943-0.945-2.488-0.945-3.434,0L10.172,18.737l-5.175-5.173   
                    c-0.943-0.944-2.489-0.944-3.432,0.001l-0.858,0.857c-0.943,0.944-0.943,2.489,0,3.433l7.744,7.752  
                     c0.944,0.943,2.489,0.943,3.433,0L29.049,8.442C29.991,7.498,29.991,5.953,29.049,5.009z"
                  />
                </svg>
              </div>
            </button>
            <button onClick={handleCancel} className="bg-red-500 px-3 text-white rounded">Cancel</button>
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
    Add Communi
  </button>
  
    <div className="flex flex-col">


      <div className="relative mt-1 flex items-center">
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


            <div className="table-responsive bg-dark">
              <div className="overflow-auto rounded-lg shadow hidden md:block">
                <table className="sortable w-full text-center text-sm font-light">
                  <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                    <tr>
                      <th scope="col" className="px-6 py-4">#</th>
                      <th scope="col" className="px-6 py-4">ID</th>
                      <th scope="col" className="px-6 py-4">Comm Protocol</th>
                      <th scope="col" className="px-6 py-4">Comm Medium</th>
                      <th scope="col" className="px-6 py-4">IP / Modbus Address</th>
                      <th scope="col" className="px-6 py-4">Baudrate</th>
                      <th scope="col" className="px-6 py-4">Stop-Bit Configuration</th>
                      <th scope="col" className="px-6 py-4">Parity Setup</th>
                      <th scope="col" className="px-6 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCommunis.map((communi, index) => (
                      <tr key={communi.id} className="border-b dark:border-neutral-500">
                        {/* Index */}
                        <td className="whitespace-nowrap px-6 py-4 font-medium text-white">{index + 1}</td>
                          
                        {/* Basic Information */}
                        <td className="whitespace-nowrap px-6 py-4 text-white">{communi.commid}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-white">{communi.protocol}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-white">{communi.medium}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-white">{communi.ip}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-white">{communi.baudrate}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-white">{communi.stopbit}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-white">{communi.parity}</td>
                        <td className="flex justify-center space-x-1 whitespace-nowrap px-6 py-4">
                          <button onClick={() => updateCommuni(
                              communi.id,
                              communi.commid,
                              communi.protocol,
                              communi.medium,
                              communi.ip,
                              communi.baudrate,
                              communi.stopbit,
                              communi.parity,
                          )} className="bg-blue-500 px-3 text-white rounded">Edit</button>

                            <button onClick={() => deleteCommuni(communi.id)} className="bg-red-500 px-3 text-white rounded">X</button>
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
  </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const communis = await prisma?.communi.findMany({
    select: {
      id: true,
      commid: true,
      protocol: true,
      medium: true,
      ip: true,
      baudrate: true,
      stopbit: true,
      parity: true,
    },
  });

  return {
    props: {
      communis: communis || [],
    },
  };
};
