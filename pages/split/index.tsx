import React, { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import PartTable from './PartTable'; // Import the PartTable component
import PartForm from './PartForm'; // Import the PartForm component
import { prisma } from '../../lib/prisma';
import { GetServerSideProps } from 'next';


export interface Part {
  id: string;
  name: string;
  idp: string;
  quantity: string;
  description: string;
}

interface Parts {
  parts: Part[];
}

interface FormData {
  name: string;
  idp: string;
  quantity: string;
  description: string;
  id: string;
}

const Home: NextPage<Parts> = ({ parts }) => {
  const [form, setForm] = useState<FormData>({
    name: '',
    idp: '',
    quantity: '',
    description: '',
    id: '',
  });
  const [newPart, setNewPart] = useState<boolean>(true);
  const router = useRouter();


  // ... (implement other functions: handleSubmit, updatePart, deletePart, handleCancel)

  const refreshData = () => {
    router.replace(router.asPath)
  }

  async function handleSubmit(data: FormData) {
    // console.log(data)
    // console.log(newPart)

    try {
      if (newPart) {
        // Check input is not blank
        if (data.name && data.idp) {
          // CREATE
          fetch('api/partcreate', {
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST'
          }).then(() => {
            setForm({name:'', idp:'', quantity:'', description:'',id:''})
            refreshData()
          })
        }
        else {
          alert("Part Name and ID can not be blank")
        }
      }
      else {
        // UPDATE
          fetch(`api/part/${data.id}`, {
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'PUT'
          }).then(() => {
            setForm({ name: '', idp: '', quantity: '', description: '',id:''});
            setNewPart(true)
            refreshData()
          })
      }
    } catch (error) {
      console.log(error)
    }
  }
  async function updatePart(updatedPart: Part) {
    console.log("Updating Part:", updatedPart);
  
    setForm({
      name: updatedPart.name,
      idp: updatedPart.idp,
      quantity: String(updatedPart.quantity),
      description: updatedPart.description,
      id: updatedPart.id,
    });
    setNewPart(false);
  }

  async function deletePart(id: string) {
    try {
      fetch(`api/part/${id}`, {
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
    setForm({name:'', idp:'', quantity:'', description:'', id:''})
    setNewPart(true)
  }

  return (
    <div className="">
      <h1 className="text-center font-bold text-2xl m-4">Parts</h1>
      <PartForm
        initialForm={form}
        newPart={newPart}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        
      />


      <div className="w-auto min-w-[25%] max-w-min mt-10 mx-auto space-y-6 flex flex-col items-stretch">
        <h2 className="text-center font-bold text-xl mt-4">Part List</h2>
        <PartTable
          parts={parts}
          updatePart={updatePart}
          deletePart={deletePart}
          
        />
      </div>

    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const parts = await prisma?.part.findMany({
    select: {
      name: true,
      idp: true,
      id: true,
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

export default Home;
