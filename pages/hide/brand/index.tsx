import React, { useState, useEffect } from 'react';
import { prisma } from '../../lib/prisma';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

interface FormData {
  name: string;
  id: string;
  bid: string;
}

interface Brands {
  brands: {
    id: string;
    name: string;
    bid: string;
  }[];
}

const Brand: React.FC<Brands> = ({ brands }) => {
  const [form, setForm] = useState<FormData>({ name: '', bid: '', id: '' });
  const [newBrand, setNewBrand] = useState<boolean>(true);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
    setForm({ name: '', bid: '', id: '' }); // Reset form when showing/hiding
    setNewBrand(true);
  };

  const handleSubmit = async (data: FormData) => {
    try {
      if (newBrand) {
        // Check input is not blank
        if (data.name) {
          // CREATE
          fetch('api/brandcreate', {
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          }).then(() => {
            setForm({ name: '', bid: '', id: '' });
            refreshData();
          });
        } else {
          alert('Brand Name and ID can not be blank');
        }
      } else {
        // UPDATE
        fetch(`api/brand/${data.id}`, {
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'PUT',
        }).then(() => {
          setForm({ name: '', bid: '', id: '' });
          setNewBrand(true);
          refreshData();
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateBrand = (name: string, bid: string, id: string) => {
    setForm({ name, bid, id });
    setNewBrand(false);
    setIsFormVisible(true); // Show the form when editing
  };

  const deleteBrand = async (id: string) => {
    try {
      fetch(`api/brand/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'DELETE',
      }).then(() => {
        refreshData();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setForm({ name: '', bid: '', id: '' });
    setNewBrand(true);
    setIsFormVisible(false); // Hide the form when canceled
  };

  return (
    <div className="">
      {/* Add button */}
      <button
        onClick={toggleForm}
        className="bg-green-500 text-white rounded p-1"
      >
        {isFormVisible ? 'Close' : 'Add Brand'}
      </button>

      {/* Form */}
      {isFormVisible && (
        <form
          className="w-auto min-w-[25%] max-w-min mx-auto space-y-6 flex flex-col items-stretch"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(form);
          }}
        >
          <div className="field field_v1">
            <label
              htmlFor="name"
              className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden"
            >
              Brand Name
            </label>
            <input
              type="text"
              placeholder="Enter Brand Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="field__input"
            />
            <span className="absolute inset-0 pointer-events-none cursor-text field__label-wrap">
              <span className="field__label">Brand Name</span>
            </span>
          </div>

          <div className="field field_v1">
            <label
              htmlFor="bid"
              className="w-1 h-1 p-0 border-0 absolute clip w-[1px] h-[1px] overflow-hidden"
            >
              Brand ID
            </label>
            <input
              type="text"
              placeholder="Enter Brand ID"
              value={form.bid}
              onChange={(e) => setForm({ ...form, bid: e.target.value })}
              className="field__input"
            />
            <span className="absolute inset-0 pointer-events-none cursor-text field__label-wrap">
              <span className="field__label">Brand ID</span>
            </span>
          </div>

          {newBrand ? (
            <div className="anibtn">
              <button
                type="submit"
                className="relative left-1/2 transform -translate-x-1/2 font-bold text-white bg-white border-3 border-black rounded-full w-44 h-11 text-center transition-all duration-350 hover:bg-black hover:text-white"
              >
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
              <button type="submit" className="bg-blue-500 text-white rounded p-1">
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
        </form>
      )}

      {/* Brand List */}
      <div className="w-auto min-w-[25%] max-w-min mt-10 mx-auto space-y-6 flex flex-col items-stretch text-white">
        <h2 className="text-center font-bold text-xl mt-4 ">Brand List</h2>
        <table id="Data" className="sortable">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Brand name
              </th>
              <th>Brand ID</th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand, index) => (
              <tr key={brand.id}>
                <td>{index + 1}</td>
                <td>{brand.name}</td>
                <td>{brand.bid}</td>
                <td className="flex justify-center space-x-1">
                  <button
                    onClick={() => updateBrand(brand.name, brand.id, brand.id)}
                    className="bg-blue-500 px-3 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteBrand(brand.id)}
                    className="bg-red-500 px-3 text-white rounded"
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
      </div>
    </div>
  );
};

export default Brand;

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
