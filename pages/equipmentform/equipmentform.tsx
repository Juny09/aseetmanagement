"use client";

import { FaFileUpload } from "react-icons/fa";
import Link from "next/link"
import React, { useState } from 'react';
import { Asset } from './index'; // Make sure the path to the index.ts file is correct


interface FormData {
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
  
  interface CombinedData extends Asset, FormData {}
  
  interface AssetFormProps {
    initialForm: FormData;
    newAsset: boolean;
    handleSubmit: (data: FormData) => void;
    handleCancel: () => void;
  }
  


  const AssetForm: React.FC<AssetFormProps> = ({
    initialForm,
    newAsset,
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
            <title>Asset</title>
        </header>
        <form
          className="w-auto min-w-[25%] max-w-min mx-auto space-y-6 flex flex-col items-stretch"
          onSubmit={(e) => {
            e.preventDefault();
            if (newAsset) {
              handleAdd(); // Call handleAdd when adding a new note
            } else {
              handleSubmit(form); // Call handleSubmit when updating
            }
          }}
        >
        <div className="form">
            <div className="field field_v2">
                <label htmlFor="ename" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">Equipment Name </label>
                <input id="ename" type="text" 
                    placeholder="Equipment Name" 
                    value={form.ename} 
                    onChange={e => setForm({...form, ename: e.target.value})}
                    className="field__input"></input>
                <span className="absolute inset-0 pointer-events-none cursor-text field__label-wrap">
                    <span className="field__label">Equipment Name</span>
                </span>
            </div>

            <div className="field field_v2">
                <label htmlFor="id" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">ID</label>
                <input type="text" 
                    placeholder="Equipment ID" 
                    id="id"
                    value={form.ide} 
                    onChange={e => setForm({...form, ide: e.target.value})} 
                    className="field__input" ></input>
                <span className="field__label-wrap" aria-hidden="true">
                    <span className="field__label">ID</span>
                </span>
                
            </div>
        
            <div className="">
            <br></br>
                <label htmlFor="type" className="select_label">Equipment Type/Category</label>
                <br></br>
                <select className="option" id="type" value={form.type} 
                    onChange={e => setForm({...form, type: e.target.value})}>
                    <option value="">Select Option</option>
                    <option value="Production">Production</option>
                    <option value="ACMV">ACMV</option>
                    <option value="Lighting">Lighting</option>
                    <option value="External">External</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Other">Other</option>
                </select>

            </div>

            <br></br>

            <div className="">
                <label htmlFor="subtype" className="select_label">Equipment Sub-Type/Sub-Category</label>
                <br></br>
                <select className="option" id="subtype" 
                    value={form.subtype} 
                    onChange={e => setForm({...form, subtype: e.target.value})}>
                    <option value="">Select Option</option>
                    <option value="Machine">Machine</option>
                    <option value="Pump">Pump</option>
                    <option value="Motor">Motor</option>
                    <option value="Compressor">Compressor</option>
                    <option value="Chiller">Chiller</option>
                    <option value="Other">Other</option>
                </select>
            </div>


            <div className="field field_v2">
                <label htmlFor="manufacturer" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">Manufacturer</label>
                <input id="manufacturer" 
                    type="text" 
                    placeholder="Name of the Company manufactured equipment"               
                    value={form.manufacturer} 
                    onChange={e => setForm({...form, manufacturer: e.target.value})}
                    className="field__input"></input>
                <span className="field__label-wrap" aria-hidden="true">
                    <span className="field__label">Manufacturer</span>
                </span>
            </div>

            <div className="field field_v2">
                <label htmlFor="modelnum" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">Model Number</label> 
                <input id="modelnum" 
                    type="text" 
                    placeholder="Specific model number of the equipment"
                    value={form.modelnum} 
                    onChange={e => setForm({...form, modelnum: e.target.value})} 
                    className="field__input" >
                </input>
                <span className="field__label-wrap" aria-hidden="true">
                    <span className="field__label">Model Number</span>
                </span>
            </div>

            <div className="field field_v2">
                <label htmlFor="serialnum" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">Serial Number</label>
                <input id="serialnum" 
                    type="text" 
                    placeholder="Unique serial number of the equipment"
                    value={form.serialnum} 
                    onChange={e => setForm({...form, serialnum: e.target.value})} 
                    className="field__input" >
                </input>
                <span className="field__label-wrap" aria-hidden="true">
                    <span className="field__label">Serial Number</span>
                </span>
            </div>

            <div className="field field_v2">
                <label htmlFor="datepurc" className="">Date Of Purchase</label>
                <input id="datepurc" 
                    type="date" 
                    placeholder="The equipment purchased date"              
                    value={form.datepurc} 
                    onChange={e => setForm({...form, datepurc: e.target.value})} 
                    className="field__input -webkit-calendar-picker-indicator" 
                />

            </div>
            <br></br>

            <div className="field field_v2">
            <label htmlFor="install" className="">Installation Date </label>
            <input id="install" 
                type="date" 
                placeholder="DD/MM/Y"              
                value={form.install} 
                onChange={e => setForm({...form, install: e.target.value})} 
                className="field__input -webkit-calendar-picker-indicator" 
            />


          </div>

            <div className="">
            <br></br>
            <label htmlFor="controlsys" className="select_label">Control System : </label>
                <select className="option" id="controlsys"                 
                value={form.controlsys} 
                onChange={e => setForm({...form, controlsys: e.target.value})} >
                    <option value="">Select Option</option>
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                    <option value="Programmable">Programmable</option>
                    <option value="Other">Other</option>
                </select>

            </div>
            <br></br>

            <div className="field field_v2">
                <label htmlFor="commission" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden" >Commissioning Date</label>
                <br></br>
                <input 
                    aria-describedby="user_avatar_help" 
                    id="user_avatar" 
                    type="file" 
                    multiple             
                     
                    value={form.commission} 
                    onChange={e => setForm({...form, commission: e.target.value})} 
                    className="field__input" 
                />
                 <span className="field__label-wrap" aria-hidden="true">
                   <span className="field__label">Commissioning Date</span>
                 </span>
             </div>

            <div className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="datasheet">Upload your file here</div>
            <br></br>
            <div className="field field_v2">
                <label htmlFor="datasheet" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">Datasheet </label>
                <input id="datasheet" type="url" 
                    placeholder="https://example.com" 
                    pattern="https://.*"               
                    value={form.datasheet} 
                    onChange={e => setForm({...form, datasheet: e.target.value})} 
                    className="field__input" 
                />
                <span className="field__label-wrap" aria-hidden="true">
                    <span className="field__label">Datasheet</span>
                </span>
            </div>
            <br></br>

            <div className="">
            <br></br>
                <label htmlFor="connection" className="select_label">Connection Type : </label>
                <select className="optionCT" id="connection"       
                    value={form.connection} 
                    onChange={e => setForm({...form, connection: e.target.value})} >
                    <option value="">Select Option</option>
                    <option value="Single Phase">Single Phase</option>
                    <option value="Single Phase VSD">Single Phase VSD</option>
                    <option value="Single Phase DOL">Single Phase DOL</option>
                    <option value="3-Phase VSD">3-Phase VSD</option>
                    <option value="3-Phase DOL">3-Phase DOL</option>
                </select>
            </div>
            <br></br>

            <div className="">
                <label htmlFor="foundation" className="select_label">Foundation : </label>
                <select className="optionF" id="foundation"
                    value={form.foundation} 
                    onChange={e => setForm({...form, foundation: e.target.value})} >
                    <option value="">Select Option</option>
                    <option value="Rigid">Rigid</option>
                    <option value="Flexible">Flexible</option>
                </select>

            </div>
            <br></br>

            <div className="field field_v2">
                <label htmlFor="mechanical" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">Mechanical Power Rating (kW)</label>
                <input id="mechanical" type="number" placeholder="kW"              
                    value={form.mechanical} 
                    onChange={e => setForm({...form, mechanical: e.target.value})} 
                    className="field__input" 
                />
                <span className="field__label-wrap" aria-hidden="true">
                    <span className="field__label">Mechanical Power Rating (kW)</span>
                </span>
            </div>

            <div className="field field_v2">
                <label htmlFor="electrical" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">Electrical Power Rating (kW)</label>
                <input id="electrical" type="number" placeholder="kW"              
                    value={form.electrical} 
                    onChange={e => setForm({...form, electrical: e.target.value})} 
                    className="field__input" 
                />
                <span className="field__label-wrap" aria-hidden="true">
                    <span className="field__label">Electrical Power Rating (kW)</span>
                </span>
            </div>

            <div className="field field_v2">
                <label htmlFor="ratedeffiency" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">Rated Efficiency</label>
                <input id="ratedeffiency" type="text" placeholder=""               
                    value={form.ratedeffiency} 
                    onChange={e => setForm({...form, ratedeffiency: e.target.value})} 
                    className="field__input" 
                />
                <span className="field__label-wrap" aria-hidden="true">
                    <span className="field__label">Rated Efficiency</span>
                </span>
                
            </div>


            <div className="">
            <br></br>
                <label htmlFor="deviceassociation" className="select_label">Device Association : </label>
                <select className="optionDA" id="deviceassociation"                    
                    value={form.deviceassociation}
                    onChange={e => setForm({...form, deviceassociation: e.target.value})} >
                    <option value="">Select Option</option>
                    <option value="">Choose a type</option>
                    <option value="DPM 1">DPM 1</option>
                    <option value="DPM 2">DPM 2</option>
                    <option value="DPM 3">DPM 3</option>
                    <option value="Machine Health Page 1">Machine Health Page 1</option>
                    <option value="Machine Health Page 2">Machine Health Page 2</option>
                </select>

            </div>

            <div className="field field_v2">
                <label htmlFor="general" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden" >General Notes</label>
                <br></br>
                <textarea id="generalnote" rows={5}
                    placeholder="Leave a comment..."              
                    value={form.generalnote} 
                    onChange={e => setForm({...form, generalnote: e.target.value})} 
                    className="field__input" 
                />
                <span className="field__label-wrap" aria-hidden="true">
                    <span className="field__label" >General Notes</span>
                </span>
                
                
            </div>

            <br></br>
            {newAsset ? (
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

export default AssetForm;
