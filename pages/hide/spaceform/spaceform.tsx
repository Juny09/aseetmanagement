"use client";

import React, { useState } from 'react';
import { Space } from './index'; // Make sure the path to the index.ts file is correct


interface FormData {
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
    id:string;
}
  
  interface CombinedData extends Space, FormData {}
  
  interface SpaceFormProps {
    initialForm: FormData;
    newSpace: boolean;
    handleSubmit: (data: FormData) => void;
    handleCancel: () => void;
  }
  


  const SpaceForm: React.FC<SpaceFormProps> = ({
    initialForm,
    newSpace,
    handleSubmit,
    handleCancel,
  }) => {
    const [form, setForm] = useState<FormData>(initialForm);
  
    const handleAdd = () => {
      handleSubmit(form);
      setForm(initialForm); // Reset the form to initial values after submitting
    };

        

    return(
        <div className='all'>
        <header>
            <title>Space Form</title>
        </header>
        <form
          className="w-auto min-w-[25%] max-w-min mx-auto space-y-6 flex flex-col items-stretch"
          onSubmit={(e) => {
            e.preventDefault();
            if (newSpace) {
              handleAdd(); // Call handleAdd when adding a new note
            } else {
              handleSubmit(form); // Call handleSubmit when updating
            }
          }}
        >
        <div className="form">
            <div className="field field_v1">
                <label htmlFor="country" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">Country</label>
                <input id="Country" type="text" 
                    placeholder="country" 
                    value={form.country} 
                    onChange={e => setForm({...form, country: e.target.value})}
                    className="field__input"></input>
                <span className="absolute inset-0 pointer-events-none cursor-text field__label-wrap">
                    <span className="field__label">country</span>
                </span>
            </div>

            <div className="field field_v2">
                <label htmlFor="State" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">State</label>
                <input type="text" 
                    placeholder="State" 
                    id="state"
                    value={form.state} 
                    onChange={e => setForm({...form, state: e.target.value})} 
                    className="field__input" ></input>
                <span className="field__label-wrap" aria-hidden="true">
                    <span className="field__label">State</span>
                </span>
            </div>

            <div className="field field_v1">
                <label htmlFor="area" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">Area</label>
                <input id="area" type="text" 
                    placeholder="area" 
                    value={form.area} 
                    onChange={e => setForm({...form, area: e.target.value})}
                    className="field__input"></input>
                <span className="absolute inset-0 pointer-events-none cursor-text field__label-wrap">
                    <span className="field__label">Area</span>
                </span>
            </div>

            <div className="field field_v2">
                <label htmlFor="building" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">Building</label>
                <input type="text" 
                    placeholder="building" 
                    id="building"
                    value={form.building} 
                    onChange={e => setForm({...form, building: e.target.value})} 
                    className="field__input" ></input>
                <span className="field__label-wrap" aria-hidden="true">
                    <span className="field__label">building</span>
                </span>
            </div>

            <div className="field field_v1">
                <label htmlFor="floor" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">Country</label>
                <input id="floor" type="text" 
                    placeholder="floor" 
                    value={form.floor} 
                    onChange={e => setForm({...form, floor: e.target.value})}
                    className="field__input"></input>
                <span className="absolute inset-0 pointer-events-none cursor-text field__label-wrap">
                    <span className="field__label">floor</span>
                </span>
            </div>

            <div className="field field_v1">
                <label htmlFor="zone" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">Zone</label>
                <input id="zone" type="text" 
                    placeholder="zone" 
                    value={form.zone} 
                    onChange={e => setForm({...form, zone: e.target.value})}
                    className="field__input"></input>
                <span className="absolute inset-0 pointer-events-none cursor-text field__label-wrap">
                    <span className="field__label">zone</span>
                </span>
            </div>

            <div className="field field_v2">
                <label htmlFor="dimensions" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">Dimensions</label>
                <input type="text" 
                    placeholder="dimensions" 
                    id="dimensions"
                    value={form.dimensions} 
                    onChange={e => setForm({...form, dimensions: e.target.value})} 
                    className="field__input" ></input>
                <span className="field__label-wrap" aria-hidden="true">
                    <span className="field__label">dimensions</span>
                </span>
            </div>
            <div className="field field_v1">
                <label htmlFor="areasq" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">Area (sq ft or sq m)</label>
                <input id="areasq" type="text" 
                    placeholder="areasq" 
                    value={form.areasq} 
                    onChange={e => setForm({...form, areasq: e.target.value})}
                    className="field__input"></input>
                <span className="absolute inset-0 pointer-events-none cursor-text field__label-wrap">
                    <span className="field__label">areasq</span>
                </span>
            </div>

            <div className="field field_v2">
                <label htmlFor="occupancy" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">Occupancy</label>
                <input type="text" 
                    placeholder="occupancy" 
                    id="occupancy"
                    value={form.occupancy} 
                    onChange={e => setForm({...form, occupancy: e.target.value})} 
                    className="field__input" ></input>
                <span className="field__label-wrap" aria-hidden="true">
                    <span className="field__label">occupancy</span>
                </span>
            </div>
        
            <div className="field field_v1">
                <label htmlFor="spacetype" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">Space Type</label>
                <input id="floor" type="text" 
                    placeholder="spacetype" 
                    value={form.spacetype} 
                    onChange={e => setForm({...form, spacetype: e.target.value})}
                    className="field__input"></input>
                <span className="absolute inset-0 pointer-events-none cursor-text field__label-wrap">
                    <span className="field__label">spacetype</span>
                </span>
            </div>

            <div className="field field_v2">
                <label htmlFor="purposeusage" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">Purpose/Usage</label>
                <input type="text" 
                    placeholder="purposeusage" 
                    id="purposeusage"
                    value={form.purposeusage} 
                    onChange={e => setForm({...form, purposeusage: e.target.value})} 
                    className="field__input" ></input>
                <span className="field__label-wrap" aria-hidden="true">
                    <span className="field__label">purposeusage</span>
                </span>
            </div>

            <br></br>
            {newSpace ? (
              <div className='anibtn'>
                <br></br>
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
                className="bg-blue-500 text-white rounded p-1"
              >
                Update
              </button>
              <button
                onClick={handleCancel}
                className="bg-red-500 text-white rounded p-1"
              >
                Cancel
              </button>
            </>
          )}
        </div>
        </form>
    
    </div>

    )
   

}

export default SpaceForm;
