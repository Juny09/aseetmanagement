import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { prisma } from '../../lib/prisma'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import 'bootstrap/dist/css/bootstrap.css'

interface FormData {
  id: string;
  metername: string;
  meterid: string;
  metertype: string;
  panel: string;
  manufacturer: string;
  model: string;
  serialnum: string;
  commissiondate:string;
  voltage: string;
  ratio: string;
  description: string;
}

interface Meters {
  meters: {
    id: string;
    metername: string;
    meterid: string;
    metertype: string;
    panel: string;
    manufacturer: string;
    model: string;
    serialnum: string;
    commissiondate:string;
    voltage: string;
    ratio: string;
    description: string;
  }[];
}

const Home: NextPage<Meters> = ({ meters }) => {
  const [form, setForm] = useState<FormData>({
    id: '',
    metername: '',
    meterid: '',
    metertype: '',
    panel: '',
    manufacturer: '',
    model: '',
    serialnum: '',
    commissiondate: '',
    voltage: '',
    ratio: '',
    description: '',
  });
  const [newMeter, setNewMeter] = useState<Boolean>(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editedMeterId, setEditedMeterId] = useState<string | null>(null);
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  async function handleSubmit(data: FormData) {
    try {
      if (newMeter) {
        if (data.metername && data.meterid) {
          fetch('api/metercreate', {
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          }).then(() => {
            setForm({
              id: '',
              metername: '',
              meterid: '',
              metertype: '',
              panel: '',
              manufacturer: '',
              model: '',
              serialnum: '',
              commissiondate: '',
              voltage: '',
              ratio: '',
              description: '',
            });
            refreshData();
            setIsFormOpen(false);
          });
        } else {
          alert("Meter Name and ID can not be blank");
        }
      } else {
        fetch(`api/meter/${data.id}`, {
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'PUT',
        }).then(() => {
          setForm({
            id: '',
            metername: '',
            meterid: '',
            metertype: '',
            panel: '',
            manufacturer: '',
            model: '',
            serialnum: '',
            commissiondate: '',
            voltage: '',
            ratio: '',
            description: '',
          });
          setNewMeter(true);
          refreshData();
          setIsFormOpen(false);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  

  async function updateMeter(
    id: string,
    metername: string,
    meterid: string,
    metertype: string,
    panel: string,
    manufacturer: string,
    model: string,
    serialnum: string,
    commissiondate: string,
    voltage: string,
    ratio: string,
    description: string
    ) {
    setForm({
      id,
      metername,
      meterid,
      metertype,
      panel,
      manufacturer,
      model,
      serialnum,
      commissiondate,
      voltage,
      ratio,
      description,
    });
    setNewMeter(false);
    setIsFormOpen(true);
    setEditedMeterId(id);

  }

  async function deleteMeter(id: string) {
    try {
      const shouldDelete = window.confirm('Are you sure you want to delete this meter?'); // Show confirmation dialog
  
      if (shouldDelete) {
        // User confirmed deletion
        await fetch(`api/meter/${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'DELETE',
        });
        
        // After successful deletion, update the meters state without reloading the entire page
        const updatedMeters = meters.filter((meter) => meter.id !== id);
        setFilteredMeters(updatedMeters);
      }
    } catch (error) {
      console.log(error);
    }
  }
  


  function handleCancel() {
    setForm({
      id: '',
      metername: '',
      meterid: '',
      metertype: '',
      panel: '',
      manufacturer: '',
      model: '',
      serialnum: '',
      commissiondate: '',
      voltage: '',
      ratio: '',
      description: '',
    });
    setNewMeter(true);
    setIsFormOpen(false);
    setEditedMeterId(null);
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
  const [filteredMeters, setFilteredMeters] = useState<Meters['meters']>(meters);
const handleSearch = (searchQuery: string) => {
  const filtered = meters.filter((meter) =>
    meter.metername.toLowerCase().includes(searchQuery.toLowerCase())
  );
  setFilteredMeters(filtered);
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
        <title>Meters</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-center font-bold text-2xl m-4 text-white">Meters</h1>
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
            <label htmlFor="metername" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">
              Meter Name</label>
            <input id="metername" type="text"
              placeholder="Meter Name"
              value={form.metername}
              onChange={(e) => setForm({ ...form, metername: e.target.value })}
              className="field__input"></input>
            <span className="absolute inset-0 pointer-events-none cursor-text field__label-wrap">
             <span className="field__label">Meter Name</span>
            </span>
          </div>

          <div className="field field_v2">
            <label htmlFor="meterid" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">
              Meter ID</label>
            <input type="text"
              placeholder="Meter id"
              id="meterid"
              value={form.meterid}
              onChange={(e) => setForm({ ...form, meterid: e.target.value })}
              className="field__input"></input>
            <span className="field__label-wrap" aria-hidden="true">
              <span className="field__label">Meter ID</span>
            </span>
          </div>
          <br/>

          <div className="">
            <label htmlFor="metertype" className="select_label">Type</label>
            <br/>
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-auto w-80
              p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="metertype" value={form.metertype}
              onChange={(e) => setForm({ ...form, metertype: e.target.value })}>
              <option value="">Select Option</option>
              <option value="Electricity">Electricity</option>
              <option value="Water">Water</option>
              <option value="Gas">Gas</option>
              <option value="Stream">Stream</option>
            </select>
          </div>

          <div className="field field_v2">
            <label htmlFor="panel" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">
              Panel/Branch</label>
            <input type="text"
              placeholder="Eletrical panel/branch where the DPM is installed"
              id="panel"
              value={form.panel}
              onChange={(e) => setForm({ ...form, panel: e.target.value })}
              className="field__input"></input>
            <span className="field__label-wrap" aria-hidden="true">
              <span className="field__label">Panel/Branch</span>
            </span>
          </div>

          
          <div className="field field_v2">
            <label htmlFor="manufacturer" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">
              Manufacturer</label>
            <input type="text"
              placeholder="manufacturer "
              id="manufacturer"
              value={form.manufacturer}
              onChange={(e) => setForm({ ...form, manufacturer: e.target.value })}
              className="field__input"></input>
            <span className="field__label-wrap" aria-hidden="true">
              <span className="field__label">Manufacturer</span>
            </span>
          </div>

          <div className="field field_v2">
            <label htmlFor="model" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">
              Model</label>
            <input type="text"
              placeholder="model"
              id="model"
              value={form.model}
              onChange={(e) => setForm({ ...form, model: e.target.value })}
              className="field__input"></input>
            <span className="field__label-wrap" aria-hidden="true">
              <span className="field__label">Model</span>
            </span>
          </div>

          <div className="field field_v2">
            <label htmlFor="serialnum" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">
            Serial Number</label>
            <input type="text"
              placeholder="SN METER provided by the manufacturer"
              id="serialnum"
              value={form.serialnum}
              onChange={(e) => setForm({ ...form, serialnum: e.target.value })}
              className="field__input"></input>
            <span className="field__label-wrap" aria-hidden="true">
              <span className="field__label">Serial Number</span>
            </span>
          </div>

          <div className="field field_v2">
            <label htmlFor="commissiondate" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">
            Commissioned Date</label>
            <input type="text"
              placeholder="commissiondate"
              id="commissiondate"
              value={form.commissiondate}
              onChange={(e) => setForm({ ...form, commissiondate: e.target.value })}
              className="field__input"></input>
            <span className="field__label-wrap" aria-hidden="true">
              <span className="field__label">Commissioned Date</span>
            </span>
          </div>

          <div className="field field_v2">
            <label htmlFor="voltage" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">
              Voltage Rating</label>
            <input type="text"
              placeholder="e.g. 415V, 11kV"
              id="voltage"
              value={form.voltage}
              onChange={(e) => setForm({ ...form, voltage: e.target.value })}
              className="field__input"></input>
            <span className="field__label-wrap" aria-hidden="true">
              <span className="field__label">Voltage Rating</span>
            </span>
          </div>

          <div className="field field_v2">
            <label htmlFor="ratio" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">
            Current Ratio</label>
            <input type="text"
              placeholder="e.g. 100 to 5A, 200 to 5a"
              id="ratio"
              value={form.ratio}
              onChange={(e) => setForm({ ...form, ratio: e.target.value })}
              className="field__input"></input>
            <span className="field__label-wrap" aria-hidden="true">
              <span className="field__label">Current Ratio</span>
            </span>
            
          </div>
          <br/>
          <br/>
          <label htmlFor="name" className="w-100 h-1 text-white">
              Description
          </label>
          <br/>
          <div className="field field_v2">
              <div className="flex items-center justify-center w-full">
                <textarea
                  id="description"
                  placeholder="Write the warranty information here ..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="block w-96 p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>




          <br/>
        </div>

        {newMeter ? (
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
    Add Meter
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
                      <th scope="col" className="px-6 py-4">Meter Name</th>
                      <th scope="col" className="px-6 py-4">Meter ID</th>
                      <th scope="col" className="px-6 py-4">Meter Type</th>
                      <th scope="col" className="px-6 py-4">Panel/Branch</th>
                      <th scope="col" className="px-6 py-4">Manufacturer</th>
                      <th scope="col" className="px-6 py-4">Model</th>
                      <th scope="col" className="px-6 py-4">Serial Number</th>
                      <th scope="col" className="px-6 py-4">Commissioned Date</th>
                      <th scope="col" className="px-6 py-4">Voltage Rating</th>
                      <th scope="col" className="px-6 py-4">Current Ratio</th>
                      <th scope="col" className="px-6 py-4">Description</th>
                      <th scope="col" className="px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMeters.map((meter, index) => (
                      <tr key={meter.id} className="border-b dark:border-neutral-500">
                        {/* Index */}
                        <td className="whitespace-nowrap px-6 py-4 font-medium text-white">{index + 1}</td>
                          
                        {/* Basic Information */}
                        <td className="whitespace-nowrap px-6 py-4 text-white">{meter.metername}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-white">{meter.meterid}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-white">{meter.metertype}</td>

                        {/* Add more table data cells for additional fields */}
                        <td className="whitespace-nowrap px-6 py-4 text-white">{meter.panel}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-white">{meter.manufacturer}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-white">{meter.model}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-white">{meter.serialnum}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-white">{meter.commissiondate}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-white">{meter.voltage}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-white">{meter.ratio}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-white">{meter.description}</td>


                          <td className="flex justify-center space-x-1 whitespace-nowrap px-6 py-4">
                            <button onClick={() => updateMeter(meter.id, meter.metername, meter.meterid, meter.metertype, meter.panel, meter.manufacturer, 
                            meter.model, meter.serialnum, meter.commissiondate, meter.voltage, meter.ratio, meter.description)} 
                            className="bg-blue-500 px-3 text-white rounded">Edit</button>
                            <button onClick={() => deleteMeter(meter.id)} className="bg-red-500 px-3 text-white rounded">X</button>
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
  const meters = await prisma?.meter.findMany({
    select: {
      id: true,
      metername: true,
      meterid: true,
      metertype: true,
      panel: true,
      manufacturer: true,
      model: true,
      serialnum: true,
      commissiondate: true,
      voltage: true,
      ratio: true,
      description: true,
      
    },
  });

  const brands = await prisma?.brand.findMany({
    select: {
      id: true,
      name: true,
      bid: true,
    },
  });

  return {
    props: {
      meters: meters || [],
      brands: brands || [],
    },
  };
};
