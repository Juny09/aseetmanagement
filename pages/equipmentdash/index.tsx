"use client";
import React, { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import AssetForm from './equipmentform'; // Import the PartTable component
import { prisma } from '../../lib/prisma';
import { GetServerSideProps } from 'next';
import AssetTable from './equipmenttable'; // Import the PartTable component

export interface Asset {
    id:string;
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
    
}

interface Assets {
    assets: Asset[];
}

export interface FormData {
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
    id:string;
}

const Home: NextPage<Assets> = ({ assets }) => {
  const [form, setForm] = useState<FormData>({
    ename: '',
    ide: '',
    type: '',
    subtype: '',
    manufacturer: '',
    modelnum: '',
    serialnum: '',
    datepurc: '',
    install: '',
    controlsys: '',
    commission: '',
    datasheet: '',
    connection: '',
    foundation: '',
    mechanical: '',
    electrical: '',
    ratedeffiency: '',
    deviceassociation: '',
    generalnote: '',
    id:'',
  });
  const [newAsset, setNewAsset] = useState<boolean>(true);
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath)
  }

  async function handleSubmit(data: FormData) {
    // console.log(data)
    // console.log(newNote)

    try {
      if (newAsset) {
        // Check input is not blank
        if (data.ename && data.ide) {
          // CREATE
          fetch('api/assetcreate', {
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST'
          }).then(() => {
            setForm({
            ename: '',
            ide: '',
            type: '',
            subtype: '',
            manufacturer: '',
            modelnum: '',
            serialnum: '',
            datepurc: '',
            install: '',
            controlsys: '',
            commission: '',
            datasheet: '',
            connection: '',
            foundation: '',
            mechanical: '',
            electrical: '',
            ratedeffiency: '',
            deviceassociation: '',
            generalnote: '',
            id:'',})
            refreshData()
          })
        }
        else {
          alert("Part Name and ID can not be blank")
        }
      }
      else {
        // UPDATE
          fetch(`api/asset/${data.id}`, {
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'PUT'
          }).then(() => {
            setForm({ 
            ename: '',
            ide: '',
            type: '',
            subtype: '',
            manufacturer: '',
            modelnum: '',
            serialnum: '',
            datepurc: '',
            install: '',
            controlsys: '',
            commission: '',
            datasheet: '',
            connection: '',
            foundation: '',
            mechanical: '',
            electrical: '',
            ratedeffiency: '',
            deviceassociation: '',
            generalnote:'',
            id:'',});
            setNewAsset(true)
            refreshData()
          })
      }
    } catch (error) {
      console.log(error)
    }
  }
  async function updateAsset(updatedAsset: Asset) {
    console.log("Updating Asset:", updatedAsset);
  
    setForm({
        ename: updatedAsset.ename,
        ide: updatedAsset.ide,
        type: updatedAsset.type,
        subtype: updatedAsset.subtype,
        manufacturer: updatedAsset.manufacturer,
        modelnum: updatedAsset.modelnum,
        serialnum: updatedAsset.serialnum,
        datepurc: updatedAsset.datepurc,
        install: updatedAsset.install,
        controlsys: updatedAsset.controlsys,
        commission: updatedAsset.commission,
        datasheet: updatedAsset.datasheet,
        connection: updatedAsset.connection,
        foundation: updatedAsset.foundation,
        mechanical: updatedAsset.mechanical,
        electrical: updatedAsset.electrical,
        ratedeffiency: updatedAsset.ratedeffiency,
        deviceassociation: updatedAsset.deviceassociation,
        generalnote: updatedAsset.generalnote,
        id: updatedAsset.id,
    });
    setNewAsset(false);
  }

  async function deleteAsset(id: string) {
    try {
      fetch(`api/asset/${id}`, {
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
    ename: '',
    ide: '',
    type: '',
    subtype: '',
    manufacturer: '',
    modelnum: '',
    serialnum: '',
    datepurc: '',
    install: '',
    controlsys: '',
    commission: '',
    datasheet: '',
    connection: '',
    foundation: '',
    mechanical: '',
    electrical: '',
    ratedeffiency: '',
    deviceassociation: '',
    generalnote: '',
    id:''
  })
    setNewAsset(true)
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
            <a href="#" className="custom-bar-item text-white">
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

    <div className="w-auto min-w-[25%] max-w-min mt-10 mx-auto space-y-6 flex flex-col items-stretch">
        <AssetTable
          assets={assets}
          updateAsset={updateAsset}
          deleteAsset={deleteAsset}
        />
      </div>
    </div>
  </div>

    
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const assets = await prisma?.asset.findMany({
    select: {
        ename: true,
        ide: true,
        type: true,
        subtype: true,
        manufacturer: true,
        modelnum: true,
        serialnum: true,
        datepurc: true,
        install: true,
        controlsys: true,
        commission: true,
        datasheet: true,
        connection: true,
        foundation: true,
        mechanical: true,
        electrical: true,
        ratedeffiency: true,
        deviceassociation: true,
        generalnote: true,
        id:true,
    },
  });

  return {
    props: {
      assets: assets || [],
    },
  };
};

export default Home;
