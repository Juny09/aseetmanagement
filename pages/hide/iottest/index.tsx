"use client";
import React, { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { prisma } from '../../lib/prisma';
import { GetServerSideProps } from 'next';
import IotTable from './iottable';
import IotForm from './iotform';

export interface Iot {
  id:string;
  devname: string;
  devid: string;
  devtype: string;
  deveui: string;
  brandId: string;
}

interface Iots {
    iots: Iot[];
}

export interface FormData {
  id:string;
  devname: string;
  devid: string;
  devtype: string;
  deveui: string;
  brandId: string;
}

interface CombinedData extends Iot, FormData {}

const Home: NextPage<Iots> = ({ iots }) => {

  const [form, setForm] = useState<FormData>({
    id:'',
    devname:'',
    devid:'',
    devtype:'',
    deveui:'',
    brandId:'',
  });
  const [newIot, setNewIot] = useState<boolean>(true);
  const router = useRouter();

  // ... (implement other functions: handleSubmit, updateNote, deleteNote, handleCancel)
  const [brands, setBrands] = useState([]);
  const refreshData = () => {
    router.replace(router.asPath)
  }


  async function updateIot(updatedIot: Iot) {
    console.log("Updating Iot:", updatedIot);
  
    setForm({
      id: updatedIot.id,
      devname: updatedIot.devname,
      devid: updatedIot.devid,
      devtype: updatedIot.devtype,
      deveui: updatedIot.deveui,
      brandId: updatedIot.brandId,
    });
    setNewIot(false);
  }

  async function deleteIot(id: string) {
    try {
      fetch(`api/iot/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'DELETE'
      }).then(() => {
        refreshData()
      })
    } catch (error) {
      console.log(error)
    }    
  }

  function handleCancel() {
    setForm({
      id:'',
      devname:'',
      devid:'',
      devtype:'',
      deveui:'',
      brandId:'',
  })
    setNewIot(true)
  }

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
    };
    async function handleSubmit(data: FormData) {
      // console.log(data)
      // console.log(newNote)
  
      try {
        if (newIot) {
          // Check input is not blank
          if (data.devname && data.devid) {
            // CREATE
            fetch('api/iotcreate', {
              body: JSON.stringify(data),
              headers: {
                'Content-Type': 'application/json'
              },
              method: 'POST'
            }).then(() => {
              setForm({
                id:'',
                devname:'',
                devid:'',
                devtype:'',
                deveui:'',
                brandId:'',})
              refreshData()
            })
          }
          else {
            alert("IOT Name and ID can not be blank")
          }
        }
        else {
  
          // UPDATE
            fetch(`api/iot/${data.id}`, {
              body: JSON.stringify(data),
              headers: {
                'Content-Type': 'application/json',
              },
              method: 'PUT'
            }).then(() => {
              setForm({ 
                id:'',
                devname:'',
                devid:'',
                devtype:'',
                deveui:'',
                brandId:'',
              });
              setNewIot(true)
              refreshData()
            })
        }
      } catch (error) {
        console.log(error)
      }
    }
  return (
    
    <div className="homebg">
      
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
              Iot <i className="custom-caret-down"></i>
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
          style={{ fontSize: "30px", cursor: "pointer" }}
          onClick={openNav}
        >
          &#9776;
        </span>
        <div className="homebg">
        <h1 className="text-center font-bold text-2xl m-4 text-white">Iot</h1>
        <IotForm
          initialForm={form}
          newIot={newIot}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          brands={brands} // Pass the 'brands' prop here
        />
        </div>
      <div className="w-auto min-w-[25%] max-w-min mt-10 mx-auto space-y-6 flex flex-col items-stretch">
        <h2 className="text-center font-bold text-xl mt-4">Iot List</h2>
        <IotTable
          iots={iots}
          updateIot={updateIot}
          deleteIot={deleteIot}
          brands={brands} 
        />
      </div>
    </div>
  </div>

    
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
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

  const brands = await prisma?.brand.findMany({
    select: {
      id: true,
      name: true,
      bid: true,
    },
  });

  return {
    props: {
      iots: iots || [],
      brands: brands || [],
    },
  };
};

export default Home;
