import React, { useState } from 'react';
import { Part } from './index'; // Make sure the path to the index.ts file is correct

interface FormData {
  name: string;
  idp: string;
  quantity: string;
  description: string;
  id: string;
}

interface CombinedData extends Part, FormData {}

interface PartFormProps {
  initialForm: FormData;
  newPart: boolean;
  handleSubmit: (data: FormData) => void;
  handleCancel: () => void;
}

const PartForm: React.FC<PartFormProps> = ({
  initialForm,
  newPart,
  handleSubmit,
  handleCancel,
}) => {
  const [form, setForm] = useState<FormData>(initialForm);

  const handleAdd = () => {
    handleSubmit(form);
    setForm(initialForm);
  };

  const handleUpdate = () => {
    console.log("Update button clicked"); // Add this line to check if the button click is detected
    handleSubmit(form);
  };

  return (
    <form
      className="w-auto min-w-[25%] max-w-min mx-auto space-y-6 flex flex-col items-stretch"
      onSubmit={(e) => {
        e.preventDefault();
        if (newPart) {
          handleAdd();
        } else {
          handleUpdate(); // Call handleUpdate when updating
        }
      }}
    >
          <div className="field field_v1">
            <label htmlFor="name" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">Part Name</label>
            <input type="text" 
              placeholder="Enter Part Name" 
              value={form.name} 
              onChange={e => setForm({...form, name: e.target.value})}
              className="field__input"
            />
            <span className="absolute inset-0 pointer-events-none cursor-text field__label-wrap">
              <span className="field__label">Part Name</span>
            </span>
          </div>
          
          <div className="field field_v2">
            <label htmlFor="id" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">ID</label>
            <input type="text" placeholder="Part ID" 
              value={form.idp} 
              onChange={e => setForm({...form, idp: e.target.value})} 
              className="field__input" 
            />
              <span className="field__label-wrap" aria-hidden="true">
                <span className="field__label">ID</span>
              </span>
          </div>

                
          <div className="field field_v3">
            <label htmlFor="quantity" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">Quantity</label>
            <input type="number" 
              placeholder="Quantity" 
              value={form.quantity} 
              onChange={e => setForm({...form, quantity: e.target.value})}
              className="field__input"
            />
            <span className="field__label-wrap" aria-hidden="true">
              <span className="field__label">Quantity</span>
            </span>
          </div>

          <div className="field field_v4">
            <label htmlFor="description" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">Description</label>
            <textarea placeholder="Description" 
              value={form.description} 
              onChange={e => setForm({...form, description: e.target.value})} 
              className="field__input"
            />
              <span className="field__label-wrap" aria-hidden="true">
                <span className="field__label">Description</span>
              </span>
            </div>
            <br></br>
            
        {newPart ? (
          <div className='anibtn'>
            <button type="submit" className="relative left-1/2 transform -translate-x-1/2 font-bold text-white bg-white border-3 border-black rounded-full w-44 h-11 text-center transition-all duration-350 hover:bg-black hover:text-white text-black">
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
          <button
            type="submit"
            onClick={handleUpdate}
            className={`${
              newPart
                ? "bg-blue-500 text-white rounded p-1"
                : "bg-green-500 text-white rounded p-1"
            }`}
          >
            {newPart ? "Add" : "Update"}
          </button>
          <button
            onClick={handleCancel}
            className="bg-red-500 text-white rounded p-1"
          >
            Cancel
          </button>
        </>
      )}
    </form>
  );
};

export default PartForm;
