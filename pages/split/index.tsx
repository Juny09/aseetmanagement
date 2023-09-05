import React, { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import PartTable from './PartTable'; // Import the PartTable component
import PartForm from './PartForm'; // Import the PartForm component
import { prisma } from '../../lib/prisma';
import { GetServerSideProps } from 'next';


export interface Note {
  id: string;
  name: string;
  idp: string;
  quantity: string;
  description: string;
}

interface Notes {
  notes: Note[];
}

interface FormData {
  name: string;
  idp: string;
  quantity: string;
  description: string;
  id: string;
}

const Home: NextPage<Notes> = ({ notes }) => {
  const [form, setForm] = useState<FormData>({
    name: '',
    idp: '',
    quantity: '',
    description: '',
    id: '',
  });
  const [newNote, setNewNote] = useState<boolean>(true);
  const router = useRouter();


  // ... (implement other functions: handleSubmit, updateNote, deleteNote, handleCancel)

  const refreshData = () => {
    router.replace(router.asPath)
  }

  async function handleSubmit(data: FormData) {
    // console.log(data)
    // console.log(newNote)

    try {
      if (newNote) {
        // Check input is not blank
        if (data.name && data.idp) {
          // CREATE
          fetch('api/create', {
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
          fetch(`api/note/${data.id}`, {
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'PUT'
          }).then(() => {
            setForm({ name: '', idp: '', quantity: '', description: '',id:''});
            setNewNote(true)
            refreshData()
          })
      }
    } catch (error) {
      console.log(error)
    }
  }
  async function updateNote(updatedNote: Note) {
    console.log("Updating Note:", updatedNote);
  
    setForm({
      name: updatedNote.name,
      idp: updatedNote.idp,
      quantity: String(updatedNote.quantity),
      description: updatedNote.description,
      id: updatedNote.id,
    });
    setNewNote(false);
  }

  async function deleteNote(id: string) {
    try {
      fetch(`api/note/${id}`, {
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
    setNewNote(true)
  }

  return (
    <div className="">
      <h1 className="text-center font-bold text-2xl m-4">Parts</h1>
      <PartForm
        initialForm={form}
        newNote={newNote}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        
      />


      <div className="w-auto min-w-[25%] max-w-min mt-10 mx-auto space-y-6 flex flex-col items-stretch">
        <h2 className="text-center font-bold text-xl mt-4">Part List</h2>
        <PartTable
          notes={notes}
          updateNote={updateNote}
          deleteNote={deleteNote}
        />
      </div>

    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const notes = await prisma?.note.findMany({
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
      notes: notes || [],
    },
  };
};

export default Home;
