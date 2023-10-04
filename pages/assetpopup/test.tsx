import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { prisma } from '../../lib/prisma'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react';
import MultiSelect from 'react-select'; // Replace with your actual multi-select library import

interface FormData {
  id: string;
  type: string;
  subtype: string;
  manufacturer: string;
  modelnum: string;
  serialnum: string;
  controlsys: string;
  connection: string;
  partid: string;
  status: string;
  abrand: string;
}

interface Assets {
  assets: {
    id: string;
    type: string;
    subtype: string;
    manufacturer: string;
    modelnum: string;
    serialnum: string;
    controlsys: string;
    connection: string;
    partid: string;
    status: string;
    abrand: string;
  }[];
  parts: {
    brand: string;
    idp: string;
    quantity: string;
    description: string;
    id: string;
  }[];
}

const Home: NextPage<Assets> = ({ assets, parts }) => {
  const [form, setForm] = useState<FormData>({
    id: '',
    type: '',
    subtype: '',
    manufacturer: '',
    modelnum: '',
    serialnum: '',
    controlsys: '',
    connection: '',
    partid: '',
    status: '',
    abrand: '',
  });
  const [newAsset, setNewAsset] = useState<Boolean>(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editedAssetId, setEditedAssetId] = useState<string | null>(null);
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  async function handleSubmit(data: FormData) {
    try {
      if (newAsset) {
        if (data.abrand && data.modelnum) {
          await fetch('api/assetcreate', {
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          });
        } else {
          alert("Asset Name and ID can not be blank");
        }
      } else {
        // Find the selected part details (brand and idp) based on partid
        const selectedPart = parts.find((part) => part.idp === data.partid);

        if (selectedPart) {
          // Include the selected part details in the data object
          const updatedData = {
            ...data,
            partBrand: selectedPart.brand,
            partIdp: selectedPart.idp,
          };

          await fetch(`api/asset/${data.id}`, {
            body: JSON.stringify(updatedData),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'PUT',
          });
        } else {
          console.error('Selected part not found');
          return;
        }
      }

      setForm({
        id: '',
        type: '',
        subtype: '',
        manufacturer: '',
        modelnum: '',
        serialnum: '',
        controlsys: '',
        connection: '',
        partid: '',
        status: '',
        abrand: '',
      });

      setNewAsset(true);
      setIsFormOpen(false);

      // Reload the page to reflect the updated data
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  async function updateAsset(
    id: string,
    type: string,
    subtype: string,
    manufacturer: string,
    modelnum: string,
    serialnum: string,
    controlsys: string,
    connection: string,
    partid: string,
    status: string,
    abrand: string,
  ) {
    setForm({
      id,
      type,
      subtype,
      manufacturer,
      modelnum,
      serialnum,
      controlsys,
      connection,
      partid,
      status,
      abrand,
    });
    setNewAsset(false);
    setIsFormOpen(true);
    setEditedAssetId(id);
  }

  async function deleteAsset(id: string) {
    try {
      const shouldDelete = window.confirm('Are you sure you want to delete this Asset?'); // Show confirmation dialog

      if (shouldDelete) {
        // User confirmed deletion
        await fetch(`api/asset/${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'DELETE',
        });

        // Update the filteredAssets state to remove the deleted Asset
        setFilteredAssets((prevAssets) => prevAssets.filter((asset) => asset.id !== id));
      }
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  function handleCancel() {
    setForm({
      id: '',
      type: '',
      subtype: '',
      manufacturer: '',
      modelnum: '',
      serialnum: '',
      controlsys: '',
      connection: '',
      partid: '',
      status: '',
      abrand: '',
    });
    setNewAsset(true);
    setIsFormOpen(false);
    setEditedAssetId(null);
  }

  // Sort function
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.kryogenix.org/code/browser/sorttable/sorttable.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const [isNavOpen, setIsNavOpen] = React.useState(true);
  const [filteredAssets, setFilteredAssets] = React.useState(assets);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;
    if (type === 'ALL') {
      setFilteredAssets(assets);
    } else {
      const filtered = assets.filter((asset) => asset.type === type);
      setFilteredAssets(filtered);
    }
  };
  

  const types = ['ALL', 'Type1', 'Type2', 'Type3']; // Update with your actual types

  return (
    <div>
      <Head>
        <title>Assets</title>
        <meta name="description" content="Assets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-gray-100 min-h-screen">
        <div className="container mx-auto p-8">
          <div className="bg-white p-4 rounded-md shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">Assets</h1>
              <div className="relative">
                <button
                  onClick={() => setIsFormOpen(!isFormOpen)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md transition duration-300 hover:bg-blue-600"
                >
                  {isFormOpen ? 'Close Form' : 'Add Asset'}
                </button>
                {isFormOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-md">
                    <form
                      className="p-4"
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit(form);
                      }}
                    >
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Asset ID
                        </label>
                        <input
                          type="text"
                          className="mt-1 p-2 w-full border rounded-md"
                          placeholder="Asset ID"
                          value={form.id}
                          onChange={(e) => setForm({ ...form, id: e.target.value })}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Asset Type
                        </label>
                        <select
                          className="mt-1 p-2 w-full border rounded-md"
                          value={form.type}
                          onChange={(e) => setForm({ ...form, type: e.target.value })}
                        >
                          <option value="">Select Type</option>
                          <option value="Production">Production</option>
                          <option value="ACMV">ACMV</option>
                          <option value="Lighting">Lighting</option>
                          <option value="External">External</option>
                          <option value="Agriculture">Agriculture</option>
                        </select>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Asset Subtype
                        </label>
                        <select
                          className="mt-1 p-2 w-full border rounded-md"
                          value={form.subtype}
                          onChange={(e) => setForm({ ...form, subtype: e.target.value })}
                        >
                          <option value="">Select Sub-Type</option>
                          <option value="Machine">Machine</option>
                          <option value="Pump">Pump</option>
                          <option value="Motor">Motor</option>
                          <option value="Compressor">Compressor</option>
                          <option value="Chiller">Chiller</option>
                        </select>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Manufacturer
                        </label>
                        <input
                          type="text"
                          className="mt-1 p-2 w-full border rounded-md"
                          placeholder="Manufacturer"
                          value={form.manufacturer}
                          onChange={(e) => setForm({ ...form, manufacturer: e.target.value })}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Model Number
                        </label>
                        <input
                          type="text"
                          className="mt-1 p-2 w-full border rounded-md"
                          placeholder="Model Number"
                          value={form.modelnum}
                          onChange={(e) => setForm({ ...form, modelnum: e.target.value })}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Serial Number
                        </label>
                        <input
                          type="text"
                          className="mt-1 p-2 w-full border rounded-md"
                          placeholder="Serial Number"
                          value={form.serialnum}
                          onChange={(e) => setForm({ ...form, serialnum: e.target.value })}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Control System
                        </label>
                        <select
                          className="mt-1 p-2 w-full border rounded-md"
                          value={form.controlsys}
                          onChange={(e) => setForm({ ...form, controlsys: e.target.value })}
                        >
                          <option value="">Select Control System</option>
                          <option value="Manual">Manual</option>
                          <option value="Automatic">Automatic</option>
                          <option value="Programmable">Programmable</option>
                        </select>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Connection
                        </label>
                        <select
                          className="mt-1 p-2 w-full border rounded-md"
                          value={form.connection}
                          onChange={(e) => setForm({ ...form, connection: e.target.value })}
                        >
                          <option value="">Select Connection</option>
                          <option value="Single Phase">Single Phase</option>
                          <option value="Single Phase VSD">Single Phase VSD</option>
                          <option value="Single Phase DOL">Single Phase DOL</option>
                          <option value="3-Phase VSD">3-Phase VSD</option>
                          <option value="3-Phase DOL">3-Phase DOL</option>
                        </select>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Part ID
                        </label>
                        <input
                          type="text"
                          className="mt-1 p-2 w-full border rounded-md"
                          placeholder="Part ID"
                          value={form.partid}
                          onChange={(e) => setForm({ ...form, partid: e.target.value })}
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Asset Brand
                        </label>
                        <input
                          type="text"
                          className="mt-1 p-2 w-full border rounded-md"
                          placeholder="Asset Brand"
                          value={form.abrand}
                          onChange={(e) => setForm({ ...form, abrand: e.target.value })}
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Status
                        </label>
                        <select
                          className="mt-1 p-2 w-full border rounded-md"
                          value={form.status}
                          onChange={(e) => setForm({ ...form, status: e.target.value })}
                        >
                            <option value="">Select Status</option>
                            <option value="In Service">In Service</option>
                            <option value="Under Maintain">Under Maintain</option>
                            <option value="Out of Service">Out of Service</option>
                        </select>
                      </div>
                      
                      <div className="flex justify-end space-x-4">
                        <button
                          type="submit"
                          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md transition duration-300 hover:bg-blue-600"
                        >
                          {newAsset ? 'Create Asset' : 'Update Asset'}
                        </button>
                        <button
                          type="button"
                          onClick={handleCancel}
                          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-md transition duration-300 hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Filter by Type
              </label>
              <select
                className="mt-1 p-2 w-1/4 border rounded-md"
                value={form.type}
                onChange={handleTypeChange}
              >
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Subtype
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Manufacturer
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Model Number
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Serial Number
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Control System
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Connection
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Part ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Asset Brand
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAssets.map((asset) => (
                  <tr key={asset.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{asset.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{asset.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{asset.subtype}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{asset.manufacturer}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{asset.modelnum}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{asset.serialnum}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{asset.controlsys}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{asset.connection}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{asset.partid}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{asset.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{asset.abrand}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() =>
                          updateAsset(
                            asset.id,
                            asset.type,
                            asset.subtype,
                            asset.manufacturer,
                            asset.modelnum,
                            asset.serialnum,
                            asset.controlsys,
                            asset.connection,
                            asset.partid,
                            asset.status,
                            asset.abrand,
                          )
                        }
                        className="text-blue-600 hover:underline cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteAsset(asset.id)}
                        className="text-red-600 hover:underline cursor-pointer ml-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const assets = await prisma.asset.findMany({
    select: {
      id: true,
      type: true,
      subtype: true,
      manufacturer: true,
      modelnum: true,
      serialnum: true,
      controlsys: true,
      connection: true,
      partid: true,
      status: true,
      abrand: true,
    },
  });
  const parts = await prisma.part.findMany({
    select: {
      brand: true,
      idp: true,
      quantity: true,
      description: true,
      id: true,
    },
  });

  return {
    props: {
      assets,
      parts,
    },
  };
};


export default Home;
