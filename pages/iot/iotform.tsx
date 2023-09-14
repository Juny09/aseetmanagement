"use client";
import React, { useState } from 'react';
import { Iot } from './index'; // Make sure the path to the index.ts file is correct
import { GetServerSideProps } from 'next';

interface FormData {
    id: string;
    devname: string;
    devid: string;
    devtype: string;
    deveui: string;
    brandId: string;
  }
  
  interface CombinedData extends Iot, FormData {}
  
  interface IotFormProps {
    initialForm: FormData;
    newIot: boolean;
    handleSubmit: (data: FormData) => void;
    handleCancel: () => void;
    brands: { id: string; name: string; bid: string }[];
  }
  


  const IotForm: React.FC<IotFormProps> = ({
    initialForm,
    newIot,
    handleSubmit,
    handleCancel,
    brands,
  }) => {
    const [form, setForm] = useState<FormData>(initialForm);
  
    const handleAdd = () => {
      handleSubmit(form);
      setForm(initialForm); // Reset the form to initial values after submitting
    };

 

    return(
        <div className=''>
        <header>
            <title>Iot</title>
        </header>
        <form
          className="w-auto min-w-[25%] max-w-min mx-auto space-y-6 flex flex-col items-stretch"
          onSubmit={(e) => {
            e.preventDefault();
            if (newIot) {
              handleAdd(); // Call handleAdd when adding a new note
            } else {
              handleSubmit(form); // Call handleSubmit when updating
            }
          }}
        >
       <div className="form">
            <div className="field field_v2">
                <label htmlFor="devname" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">Iot Device Name </label>
                <input id="devname" type="text" 
                    placeholder="Iot Device Name " 
                    value={form.devname} 
                    onChange={e => setForm({...form, devname: e.target.value})}
                    className="field__input"></input>
                <span className="absolute inset-0 pointer-events-none cursor-text field__label-wrap">
                    <span className="field__label">Iot Device Name </span>
                </span>
            </div>

            <div className="field field_v2">
                <label htmlFor="devid" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">Iot Device ID</label>
                <input type="text" 
                    placeholder="Iot device model id" 
                    id="devid"
                    value={form.devid} 
                    onChange={e => setForm({...form, devid: e.target.value})} 
                    className="field__input" ></input>
                <span className="field__label-wrap" aria-hidden="true">
                    <span className="field__label">Iot Device ID</span>
                </span>
            </div>
        
            <label htmlFor="brandId" className="select_label">Brand</label>
            <select
                id="part-select"
                value={form.brandId}
                onChange={(e) => setForm({ ...form, brandId: e.target.value })}
                required
                className="block py-2.5 px-0 w-full text-m text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-white dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
                <option className="bg-gray-600" value="">
                Choose a Brand
                </option>

                {brands.map((brand) => (
                <option
                    key={brand.id}
                    value={brand.id}
                    className="bg-gray-600"
                >
                    {brand.name}
                </option>
                ))}
            </select>

            <div className="">
            <br></br>
                <label htmlFor="devtype" className="select_label">Type</label>
                <br></br>
                <select className="option" id="devtype" value={form.devtype} 
                    onChange={e => setForm({...form, devtype: e.target.value})}>
                    <option value="">Select Option</option>
                    <option value="Modbus Interface Device for Meter">Modbus Interface Device for Meter</option>
                    <option value="Modbus Interface Device for Equipment">Modbus Interface Device for Equipment</option>
                    <option value="Water Leak Sensor">Water Leak Sensor</option>
                    <option value="IAQ Device">IAQ Device</option>
                    <option value="Sound Level">Sound Level</option>
                    <option value="Environmental Gas Sensor">Environmental Gas Sensor</option>
                    <option value="People Counting Sensor">People Counting Sensor</option>
                    <option value="Occupancy Sensor">Occupancy Sensor</option>
                </select>

            </div>

            <br></br>

            <div className="field field_v2">
                <label htmlFor="deveui" className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden">Iot Device EUI</label>
                <input type="text" 
                    placeholder="Enter Iot device EUI" 
                    id="deveui"
                    value={form.deveui} 
                    onChange={e => setForm({...form, deveui: e.target.value})} 
                    className="field__input" ></input>
                <span className="field__label-wrap" aria-hidden="true">
                    <span className="field__label">Iot Device EUI</span>
                </span>
            </div>

            <br></br>
            {newIot ? (
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

export default IotForm;

export const getServerSideProps: GetServerSideProps = async () => {
  const brands = await prisma?.brand.findMany({
    select: {
      id: true,
      name: true,
      bid: true,
    },
  });

  return {
    props: {
      brands: brands || [],
    },
  };
};   