import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { prisma } from '../../lib/prisma'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

interface FormData {
  id: string;
  assetId: string;
  iotId: string;
  spaceId: string;
  statusId: string;

}

interface Mains {
  mains:{
    id: string;
    assetId: string;
    iotid: string;
    spaceid: string;
    statusid: string;
  }[];
  assets: {
    id: string;
    ename: string;
    ide: string;
    type: string;
    subtype: string;
    manufacturer: string;
    modelnum: string;
    serialnum: string;
    datepurc: string;
    install: string;
    controlsys: string;
    commission: string;
    datasheet: string;
    connection: string;
    foundation: string;
    mechanical: string;
    electrical: string;
    ratedeffiency: string;
    deviceassociation: string;
    generalnote:string;
  }[];
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
  statuss: {
    id: string;
    sid: string;
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
  spaces:{
    id:string;
    lid:string;
    country: string;
    state: string;
    area: string;
    building: string;
    floor: string;
    zone: string;
    dimensions: string;
    areasq: string;
    occupancy: string;
    spacetype: string;
    purposeusage: string;
  }[];
}

const Home: NextPage<Mains> = ({ mains, assets, iots, spaces, statuss }) => {
  const [form, setForm] = useState<FormData>({
    id: '',
    assetId: '',
    iotId: '',
    spaceId: '',
    statusId: '',
  });
  const [newMain, setNewMain] = useState<Boolean>(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editedMainId, setEditedMainId] = useState<string | null>(null);
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  async function handleSubmit(data: FormData) {
    try {
      if (newMain) {
        if (data.assetId && data.iotId) {
          fetch('api/maincreate', {
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          }).then(() => {
            setForm({
              id: '',
              assetId: '',
              iotId: '',
              spaceId: '',
              statusId: '', 
            });
            refreshData();
            setIsFormOpen(false);
          });
        } else {
          alert("Main Name and ID can not be blank");
        }
      } else {
        fetch(`api/main/${data.id}`, {
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'PUT',
        }).then(() => {
          setForm({
            id: '',
            assetId: '',
            iotId: '',
            spaceId: '', 
            statusId: '', 
          });
          setNewMain(true);
          refreshData();
          setIsFormOpen(false);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function updateMain(assetId: string, iotId: string, spaceId: string, statusId: string, id: string) {
    setForm({
      id,
      assetId,
      iotId,
      spaceId,
      statusId,
    });
    setNewMain(false);
    setIsFormOpen(true);
    setEditedMainId(id);
  }

  async function deleteMain(id: string) {
    try {
      fetch(`api/main/${id}`, {
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
      assetId: '',
      iotId: '',
      spaceId: '',
      statusId: '',
    });
    setNewMain(true);
    setIsFormOpen(false);
    setEditedMainId(null);
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
      <div className="homebg">
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

      <div id="main">
      <span
        className="sibebar text-white"
        style={{ fontSize: "30px", cursor: "pointer", visibility: isNavOpen ? 'hidden' : 'visible' }}
        onClick={openNav}
      >
        &#9776;
      </span>
      <Head>
        <title>Mains</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <h1 className="text-center font-bold text-2xl m-4 text-white">Mains</h1>
      {/* Render the form conditionally */}
      {isFormOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
        <div className="bg-black p-10 rounded shadow-lg w-[50%]">
          <h2 className="text-center font-bold text-xl mb-4">Edit Main</h2>
            <form
              className="w-auto min-w-[25%] max-w-min mx-auto space-y-6 flex flex-col items-stretch"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(form);
              }}
            >
              <label htmlFor="assetId" className="select_label">Asset</label>
                <select
                  id="part-select"
                  value={form.assetId}
                  onChange={(e) => setForm({ ...form, assetId: e.target.value })}
                  required
                  className="block py-2.5 px-0 w-full text-m text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-white dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option className="bg-gray-600" value="">
                    Choose a Asset
                  </option>

                  {assets.map((asset) => (
                    <option key={asset.ide} value={asset.ide.toString()} className="bg-gray-600">
                      {asset.ename}({asset.ide})
                    </option>

                  ))}
                </select>

              <label htmlFor="iotId" className="select_label">IOT</label>
                <select
                  id="part-select"
                  value={form.iotId}
                  onChange={(e) => setForm({ ...form, iotId: e.target.value })}
                  required
                  className="block py-2.5 px-0 w-full text-m text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-white dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option className="bg-gray-600" value="">
                    Choose a IOT
                  </option>

                  {iots.map((iot) => (
                    <option key={iot.devid} value={iot.devid.toString()} className="bg-gray-600">
                      {iot.devname}({iot.devid})
                    </option>

                  ))}
                </select>

              <label htmlFor="spaceId" className="select_label">Space</label>
                <select
                  id="part-select"
                  value={form.spaceId}
                  onChange={(e) => setForm({ ...form, spaceId: e.target.value })}
                  required
                  className="block py-2.5 px-0 w-full text-m text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-white dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option className="bg-gray-600" value="">
                    Choose a Space
                  </option>

                  {spaces.map((space) => (
                    <option key={space.lid} value={space.lid.toString()} className="bg-gray-600">
                      {space.country}({space.lid})
                    </option>

                  ))}
                </select>

              <label htmlFor="statusId" className="select_label">Status</label>
                <select
                  id="part-select"
                  value={form.statusId}
                  onChange={(e) => setForm({ ...form, statusId: e.target.value })}
                  required
                  className="block py-2.5 px-0 w-full text-m text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-white dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option className="bg-gray-600" value="">
                    Choose a Status
                  </option>

                  {statuss.map((status) => (
                    <option key={status.lid} value={status.lid.toString()} className="bg-gray-600">
                      {status.country}({status.lid})
                    </option>

                  ))}
                </select>
              <br></br>

              
            {newMain ? (
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
      )}

      <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-center text-sm font-light">
                  <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                    <tr>
                      <th scope="col" className="px-6 py-4">#</th>
                      <th scope="col" className="px-6 py-4">Asset</th>
                      <th scope="col" className="px-6 py-4">Iot</th>
                      <th scope="col" className="px-6 py-4">Space</th>
                      <th scope="col" className="px-6 py-4">Status</th>
                      <th scope="col" className="px-6 py-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                      {mains.map((main, index) => (
                      <tr key={main.id} className="border-b dark:border-neutral-500">
                        {/* Index */}
                        <td className="whitespace-nowrap px-6 py-4 font-medium text-white">{index + 1}</td>
                          
                          {/* Basic Information */}
                          <td className="whitespace-nowrap px-6 py-4 text-white">{main.assetId}</td>
                          <td className="whitespace-nowrap px-6 py-4 text-white">{main.iotId}</td>
                          <td className="whitespace-nowrap px-6 py-4 text-white">{main.spaceId}</td>
                          <td className="whitespace-nowrap px-6 py-4 text-white">{main.statusId}</td>


                          <td className="flex justify-center space-x-1 whitespace-nowrap px-6 py-4">
                            <button onClick={() => updateMain(main.assetId, main.iotId, main.spaceId, main.statusId, main.id)} className="bg-blue-500 px-3 text-white rounded">Edit</button>
                            <button onClick={() => deleteMain(main.id)} className="bg-red-500 px-3 text-white rounded">				X</button>
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
    const assets = await prisma?.main.findMany({
      select: {
        id: true,
        assetId: true,
        iotId: true,
        spaceId: true,
        statusId: true,
      },
    });
  
    const iots = await prisma?.iot.findMany({
      select: {
        id: true,
        devname: true,
        devid: true,
        devtype: true,
        deveui: true,
        brandId: true,
      },
    });
  
    const statuss = await prisma?.status.findMany({
      select: {
        id: true,
        sid: true,
        mstatus: true,
        category: true,
        from: true,
        to: true,
        performby: true,
        attach: true,
        estimateddate: true,
        warrantyinfo: true,
        comment: true,
        partId: true,
      },
    });

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
        assets: assets || [],
        iots: iots || [],
        statuss: statuss || [],
        spaces: spaces || [],
      },
    };
  };
  
