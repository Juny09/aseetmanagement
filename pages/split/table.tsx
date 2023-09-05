import React from 'react';
import { Note } from './index';

interface PartTableProps {
  notes: Note[];
  updateNote: (updatedNote: Note) => void;
  deleteNote: (id: string) => void;
}

const PartTable: React.FC<PartTableProps> = ({ notes, updateNote, deleteNote }) => {
  return (
    <div className="w-auto min-w-[25%] max-w-min mt-10 mx-auto space-y-6 flex flex-col items-stretch">
      <h2 className="text-center font-bold text-xl mt-4">Part List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>IDP</th>
            <th>Quantity</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => (
            <tr key={note.id}>
              <td>{note.name}</td>
              <td>{note.idp}</td>
              <td>{note.quantity}</td>
              <td>{note.description}</td>
              <td>
                <button onClick={() => updateNote(note)}>Edit</button>
                <button onClick={() => deleteNote(note.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PartTable;
