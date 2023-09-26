import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { prisma } from '../../lib/prisma'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

interface FormData {
  id: string;
  devname: string;
  devid: string;
  devtype: string;
  deveui: string;
  brandId: string;
  meterId: string;
  communiId: string;
}

interface Iots {
  iots: {
    id: string;
    devname: string;
    devid: string;
    devtype: string;
    deveui: string;
    brandId: string;
    meterId: string;
    communiId: string;
  }[];
  brands: {
    id: string;
    name: string;
    bid: string;
  }[];
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

const Home: NextPage<Iots> = ({ iots, brands, meters, communis }) => {
  const [form, setForm] = useState<FormData>({
    id: '',
    devname: '',
    devid: '',
    devtype: '',
    deveui: '',
    brandId: '',
    meterId: '',
    communiId:'',
  });
  const [newIot, setNewIot] = useState<Boolean>(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editedIotId, setEditedIotId] = useState<string | null>(null);
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  async function handleSubmit(data: FormData) {
    try {
      if (newIot) {
        if (data.devname && data.devid) {
          fetch('api/iotcreate', {
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          }).then(() => {
            setForm({
              id: '',
              devname: '',
              devid: '',
              devtype: '',
              deveui: '',
              brandId: '',
              meterId: '',
              communiId:'',
            });
            refreshData();
            setIsFormOpen(false);
          });
        } else {
          alert("Iot Name and ID can not be blank");
        }
      } else {
        fetch(`api/iot/${data.id}`, {
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'PUT',
        }).then(() => {
          setForm({
            id: '',
            devname: '',
            devid: '',
            devtype: '',
            deveui: '',
            brandId: '',
            meterId: '',
            communiId:'',
          });
          setNewIot(true);
          refreshData();
          setIsFormOpen(false);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function updateIot(devname: string, devid: string, devtype: string, deveui: string, brandId: string, meterId: string, communiId: string, id: string) {
    setForm({
      id,
      devname,
      devid,
      devtype,
      deveui,
      brandId,
      meterId,
      communiId:'',
    });
    setNewIot(false);
    setIsFormOpen(true);
    setEditedIotId(id);
  }

  async function deleteIot(id: string) {
    try {
      fetch(`api/iot/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'DELETE',
      }).then(() => {
        refreshData();
      });
    } catch (error) {
      console.log(error);
    }
  }

  function handleCancel() {
    setForm({
      id: '',
      devname: '',
      devid: '',
      devtype: '',
      deveui: '',
      brandId: '',
      meterId: '',
      communiId:'',
    });
    setNewIot(true);
    setIsFormOpen(false);
    setEditedIotId(null);
  }


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
        .form-scroll {
          max-height: 500px; /* Adjust the max height as needed */
          overflow-y: auto;
      `}</style>
      <div className="homebg">
      <div id="mySidenav" className={`sidenav ${isNavOpen ? "open" : ""}`}>
        <a href="#" className="closebtn" onClick={closeNav}>
          &times;
        </a>
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
        <a href="./meterpopup" className="text-white">
          Meter
        </a>
      </div>
        </div>
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
        <title>Iots</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-center font-bold text-2xl m-4 text-white">Iots</h1>
      <button
        onClick={() => setIsFormOpen(true)} // Opens the form when clicked
        className="bg-green-500 text-white rounded p-2 mt-2 ml-4 mb-4"
      >
        Add Iot
      </button>
      {/* Render the form conditionally */}
      {isFormOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
        <div className="bg-black p-10 rounded shadow-lg w-[50%]">
          <h2 className="text-center font-bold text-xl mb-4">Edit IOT</h2>
            <div className="form-scroll" style={{ maxHeight: "500px", overflowY: "auto" }}>
            <form
              className="w-auto min-w-[25%] max-w-min mx-auto space-y-6 flex flex-col items-stretch"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(form);
              }}
            >
              <div className="form">
                <div className="field field_v2">
                  <label htmlFor="devname" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">Iot Device Name</label>
                  <input id="devname" type="text"
                    placeholder="Iot Device Name"
                    value={form.devname}
                    onChange={(e) => setForm({ ...form, devname: e.target.value })}
                    className="field__input"></input>
                  <span className="absolute inset-0 pointer-events-none cursor-text field__label-wrap">
                    <span className="field__label">Iot Device Name</span>
                  </span>
                </div>

                <div className="field field_v2">
                  <label htmlFor="devid" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">Iot Device ID</label>
                  <input type="text"
                    placeholder="Iot device model id"
                    id="devid"
                    value={form.devid}
                    onChange={(e) => setForm({ ...form, devid: e.target.value })}
                    className="field__input"></input>
                  <span className="field__label-wrap" aria-hidden="true">
                    <span className="field__label">Iot Device ID</span>
                  </span>
                </div>

                <label htmlFor="brandId" className="select_label">Brand</label>
                <select
                  id="part-select"
                  value={form.brandId}
                  onChange={(e) => setForm({ ...form, brandId: e.target.value })}
                  required
                  className="block py-2.5 px-0 w-full text-m text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-white dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option className="bg-gray-600" value="">
                    Choose a Brand
                  </option>

                  {brands.map((brand) => (
                    <option key={brand.bid} value={brand.bid.toString()} className="bg-gray-600">
                      {brand.name}({brand.bid})
                    </option>

                  ))}
                </select>

              <div className="">
                <br></br>
                <label htmlFor="devtype" className="select_label">Type</label>
                <br></br>
                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-auto w-80
                  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="devtype" value={form.devtype}
                  onChange={(e) => setForm({ ...form, devtype: e.target.value })}>
                  <option value="">Select a Type</option>
                  <option value="Modbus Interface Device for Meter">Modbus Interface Device for Meter</option>
                  <option value="Modbus Interface Device for Equipment">Modbus Interface Device for Equipment</option>
                  <option value="Water Leak Sensor">Water Leak Sensor</option>
                  <option value="IAQ Device">IAQ Device</option>
                  <option value="Sound Level">Sound Level</option>
                  <option value="Environmental Gas Sensor">Environmental Gas Sensor</option>
                  <option value="People Counting Sensor">People Counting Sensor</option>
                  <option value="Occupancy Sensor">Occupancy Sensor</option>
                </select>
              </div>

              <br></br>

              <div className="field field_v2">
                <label htmlFor="deveui" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">Iot Device EUI</label>
                  <input type="text"
                    placeholder="Enter Iot device EUI"
                    id="deveui"
                    value={form.deveui}
                    onChange={(e) => setForm({ ...form, deveui: e.target.value })}
                    className="field__input"></input>
                  <span className="field__label-wrap" aria-hidden="true">
                    <span className="field__label">Iot Device EUI</span>
                  </span>
                </div>
              </div>

              <label htmlFor="meterId" className="select_label">Meter</label>
                <select
                  id="part-select"
                  value={form.meterId}
                  onChange={(e) => setForm({ ...form, meterId: e.target.value })}
                  required
                  className="block py-2.5 px-0 w-full text-m text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-white dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option className="bg-gray-600" value="">
                    Choose a meter
                  </option>

                  {meters.map((meter) => (
                    <option key={meter.meterid} value={meter.meterid.toString()} className="bg-gray-600">
                      {meter.metername}({meter.meterid})
                    </option>

                  ))}
                </select>

                <label htmlFor="communiId" className="select_label">Communication</label>
                <select
                  id="part-select"
                  value={form.communiId}
                  onChange={(e) => setForm({ ...form, communiId: e.target.value })}
                  required
                  className="block py-2.5 px-0 w-full text-m text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-white dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option className="bg-gray-600" value="">
                    Choose a Communication
                  </option>

                  {communis.map((communi) => (
                    <option key={communi.commid} value={communi.commid.toString()} className="bg-gray-600">
                      {communi.protocol}({communi.commid})
                    </option>
                  ))}
                </select>

            {newIot ? (
              <div className='anibtn'>
              <button type="submit" className="relative left-1/2 transform -translate-x-1/2 font-bold text-white bg-white border-3 border-black rounded-full w-44 h-11 text-center transition-all duration-350 hover:bg-black hover:text-white">
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
                      d="M29.049,5.009L28.19,4.151c-0.943-0.945-2.488-0.945-3.434,0L10.172,18.737l-5.175-5.173   c-0.943-0.944-2.489-0.944-3.432,0.001l-0.858,0.857c-0.943,0.944-0.943,2.489,0,3.433l7.744,7.752   c0.944,0.943,2.489,0.943,3.433,0L29.049,8.442C29.991,7.498,29.991,5.953,29.049,5.009z"
                    />
                  </svg>
                </div>
              </button>
              </div>
              ) : (
              <>
                <button type="submit" className="bg-blue-500 text-white rounded p-1">Update</button>
                <button onClick={handleCancel} className="bg-red-500 text-white rounded p-1">Cancel</button>
              </>
            )}
            </form>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-center text-sm font-light">
                  <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                    <tr>
                      <th scope="col" className="px-6 py-4">#</th>
                      <th scope="col" className="px-6 py-4">IOT Device name</th>
                      <th scope="col" className="px-6 py-4">IOT ID</th>
                      <th scope="col" className="px-6 py-4">IOT Type</th>
                      <th scope="col" className="px-6 py-4">Brand</th>
                      <th scope="col" className="px-6 py-4">EUI</th>
                      <th scope="col" className="px-6 py-4">Meter</th>
                      <th scope="col" className="px-6 py-4">Communication</th>
                    </tr>
                  </thead>
                  <tbody>
                      {iots.map((iot, index) => (
                      <tr key={iot.id} className="border-b dark:border-neutral-500">
                        {/* Index */}
                        <td className="whitespace-nowrap px-6 py-4 font-medium text-white">{index + 1}</td>
                          
                          {/* Basic Information */}
                          <td className="whitespace-nowrap px-6 py-4 text-white">{iot.devname}</td>
                          <td className="whitespace-nowrap px-6 py-4 text-white">{iot.devid}</td>
                          <td className="whitespace-nowrap px-6 py-4 text-white">{iot.devtype}</td>
                          <td className="whitespace-nowrap px-6 py-4 text-white">{iot.brandId}</td>
                          <td className="whitespace-nowrap px-6 py-4 text-white">{iot.deveui}</td>
                          <td className="whitespace-nowrap px-6 py-4 text-white">{iot.meterId}</td>
                          {/* <td className="whitespace-nowrap px-6 py-4 text-white">{iot.communiId}</td> */}
                          <td className="flex justify-center space-x-1 whitespace-nowrap px-6 py-4">
                            <button onClick={() => updateIot(iot.devname, iot.devid, iot.devtype, iot.brandId,iot.deveui,iot.meterId,iot.communiId, iot.id)} className="bg-blue-500 px-3 text-white rounded">Edit</button>
                            <button onClick={() => deleteIot(iot.id)} className="bg-red-500 px-3 text-white rounded">				X</button>
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
  </div>
  )
}

export default Home


export const getServerSideProps: GetServerSideProps = async () => {
  const iots = await prisma?.iot.findMany({
    select: {
      id: true,
      devname: true,
      devid: true,
      devtype: true,
      deveui: true,
      brandId: true,
      meterId: true,
      communiId: true,
    },
  });

  const brands = await prisma?.brand.findMany({
    select: {
      id: true,
      name: true,
      bid: true,
    },
  });

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
      iots: iots || [],
      brands: brands || [],
      meters: meters || [],
      communis: communis || [],
    },
  };
};
