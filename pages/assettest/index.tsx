import React, { useState } from "react";

interface AssetFormProps {
  onSubmit: (formData: FormData) => void;
}

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

const AssetForm: React.FC<AssetFormProps> = ({ onSubmit }) => {
  const [form, setForm] = useState<FormData>({
    id: "",
    type: "",
    subtype: "",
    manufacturer: "",
    modelnum: "",
    serialnum: "",
    controlsys: "",
    connection: "",
    partid: "",
    status: "",
    abrand: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      id: "",
      type: "",
      subtype: "",
      manufacturer: "",
      modelnum: "",
      serialnum: "",
      controlsys: "",
      connection: "",
      partid: "",
      status: "",
      abrand: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <div className="mb-4">
        <label htmlFor="abrand" className="block text-gray-700 font-bold">
          Brand
        </label>
        <input
          type="text"
          id="abrand"
          name="abrand"
          value={form.abrand}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      {/* Add more fields here */}
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

interface AssetTableProps {
  assets: Asset[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

interface Asset {
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

const AssetTable: React.FC<AssetTableProps> = ({ assets, onEdit, onDelete }) => {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="px-4 py-2">ID</th>
          <th className="px-4 py-2">Type</th>
          <th className="px-4 py-2">Subtype</th>
          <th className="px-4 py-2">Manufacturer</th>
          <th className="px-4 py-2">Model Number</th>
          <th className="px-4 py-2">Serial Number</th>
          <th className="px-4 py-2">Control System</th>
          <th className="px-4 py-2">Connection</th>
          <th className="px-4 py-2">Part ID</th>
          <th className="px-4 py-2">Status</th>
          <th className="px-4 py-2">Brand</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {assets.map((asset) => (
          <tr key={asset.id}>
            <td className="px-4 py-2">{asset.id}</td>
            <td className="px-4 py-2">{asset.type}</td>
            <td className="px-4 py-2">{asset.subtype}</td>
            <td className="px-4 py-2">{asset.manufacturer}</td>
            <td className="px-4 py-2">{asset.modelnum}</td>
            <td className="px-4 py-2">{asset.serialnum}</td>
            <td className="px-4 py-2">{asset.controlsys}</td>
            <td className="px-4 py-2">{asset.connection}</td>
            <td className="px-4 py-2">{asset.partid}</td>
            <td className="px-4 py-2">{asset.status}</td>
            <td className="px-4 py-2">{asset.abrand}</td>
            <td className="px-4 py-2">
              <button
                onClick={() => onEdit(asset.id)}
                className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(asset.id)}
                className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 focus:outline-none focus:bg-red-600 ml-2"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Home: React.FC = () => {
  // You can use these dummy assets as an example
  const dummyAssets: Asset[] = [
    {
      id: "1",
      type: "Type A",
      subtype: "Subtype A",
      manufacturer: "Manufacturer A",
      modelnum: "Model A",
      serialnum: "Serial A",
      controlsys: "Control A",
      connection: "Connection A",
      partid: "Part A",
      status: "Status A",
      abrand: "Brand A",
    },
    // Add more dummy assets here
  ];

  const handleFormSubmit = (formData: FormData) => {
    // Handle form submission, e.g., send data to an API or update state
    console.log("Form submitted with data:", formData);
  };

  const handleEditAsset = (id: string) => {
    // Handle editing an asset, e.g., open a modal or navigate to edit page
    console.log("Edit asset with ID:", id);
  };

  const handleDeleteAsset = (id: string) => {
    // Handle deleting an asset, e.g., send delete request to an API
    console.log("Delete asset with ID:", id);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Asset Management</h1>
      <AssetForm onSubmit={handleFormSubmit} />
      <AssetTable assets={dummyAssets} onEdit={handleEditAsset} onDelete={handleDeleteAsset} />
    </div>
  );
};

export default Home;
