"use client";
import React, { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import SpaceForm from './spaceform'; // Import the PartTable component
import { prisma } from '../../lib/prisma';
import { GetServerSideProps } from 'next';
import SpaceTable from './spacetable'; // Import the PartTable component

export interface Space {
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
  id:string;
    
    
}

interface Spaces {
    spaces: Space[];
}

export interface FormData {
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
  id:string;
    
}

const Home: NextPage<Spaces> = ({ spaces }) => {
  const [form, setForm] = useState<FormData>({
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
  const [newSpace, setNewSpace] = useState<boolean>(true);
  const router = useRouter();


  // ... (implement other functions: handleSubmit, updateNote, deleteNote, handleCancel)

  const refreshData = () => {
    router.replace(router.asPath)
  }

  async function handleSubmit(data: FormData) {
    // console.log(data)
    // console.log(newNote)

    try {
      if (newSpace) {
        // Check input is not blank
        if (data.country && data.state) {
          // CREATE
          fetch('api/spacecreate', {
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST'
          }).then(() => {
            setForm({
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
              id: '',})
            refreshData()
          })
        }
        else {
          alert("Country name and state can not be blank")
        }
      }
      else {
        // UPDATE
        fetch(`api/space/${data.id}`, {
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'PUT'
          }).then(() => {
            setForm({ 
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
              id:'',});
            setNewSpace(true)
            refreshData()
          })
      }
    } catch (error) {
      console.log(error)
    }
  }
  async function updateSpace(updatedSpace: Space) {
    console.log("Updating Space:", updatedSpace);
  
    setForm({
      country: updatedSpace.country,
      state: updatedSpace.state,
      area: updatedSpace.area,
      building: updatedSpace.building,
      floor: updatedSpace.floor,
      zone: updatedSpace.zone,
      dimensions: updatedSpace.dimensions,
      areasq: updatedSpace.areasq,
      occupancy: updatedSpace.occupancy,
      spacetype: updatedSpace.spacetype,
      purposeusage: updatedSpace.purposeusage,
      id: updatedSpace.id,
    });
    setNewSpace(false);
  }

  async function deleteSpace(id: string) {
    try {
      fetch(`api/space/${id}`, {
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
  })
    setNewSpace(true)
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
          style={{ fontSize: "30px", cursor: "pointer" }}
          onClick={openNav}
        >
          &#9776;
        </span>

    <div className="">
    <h1 className="text-center font-bold text-2xl m-4 text-white">Spaces</h1>
      <SpaceForm
        initialForm={form}
        newSpace={newSpace}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    </div>
    <div className="w-auto min-w-[25%] max-w-min mt-10 mx-auto space-y-6 flex flex-col items-stretch">
        <h2 className="text-center font-bold text-xl mt-4">Space List</h2>
        <SpaceTable
          spaces={spaces}
          updateSpace={updateSpace}
          deleteSpace={deleteSpace}
        />
      </div>
    </div>
  </div>

    
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const spaces = await prisma?.space.findMany({
    select: {
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

export default Home;
