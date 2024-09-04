import React, { useState } from 'react';
import { FaUniversity } from "react-icons/fa";
import { MdEditDocument, MdAutoDelete, MdSave } from "react-icons/md";
import axios from 'axios';

const UniListItem = ({ id, data, onDelete, onUpdate }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState(data);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    // Validate form data
    if (!formData.university || !formData.address || !formData.contact) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!/^\d{10}$/.test(formData.contact)) {
      setError('Please enter a valid 10-digit contact number.');
      return;
    }

    setError('');

    try {
      // Send PUT request to update university record
      await axios.put(`http://127.0.0.1:4000/api/v1/university/${id}`, formData);
      setIsEditMode(false);
      onUpdate(formData, 'university'); // Notify parent component about the update
    } catch (error) {
      console.error(error);
      setError('Failed to update data. Please try again.');
    }
  };

  const handleDelete = async () => {
    try {
      // Send DELETE request to remove university record
      await axios.delete(`http://127.0.0.1:4000/api/v1/university/${id}`);
      onDelete(id); // Notify parent component about the deletion
    } catch (error) {
      console.error(error);
    } finally {
      setShowDeleteModal(false);
    }
  };

  return (
    <div className='bg-white px-8 p-3 overflow-x-auto'>
      <div className='grid grid-cols-12 gap-2 items-center'>
        <div className='col-span-1'>
          <FaUniversity size={30} color='#94a3b8' className='inline-block' />
        </div>
        <div className='col-span-4'>
          {!isEditMode ? (
            <p className='text-sm text-slate-600'>{formData.university}</p>
          ) : (
            <input 
              type="text" 
              name="university" 
              value={formData.university} 
              onChange={handleChange} 
              className='border rounded-md p-2 w-full' 
            />
          )}
        </div>
        <div className='col-span-3'>
          {!isEditMode ? (
            <p className='text-sm text-slate-600'>{formData.address}</p>
          ) : (
            <input 
              type="text" 
              name="address" 
              value={formData.address} 
              onChange={handleChange} 
              className='border rounded-md p-2 w-full' 
            />
          )}
        </div>
        <div className='col-span-2'>
          {!isEditMode ? (
            <p className='text-sm text-slate-600'>{formData.contact}</p>
          ) : (
            <input 
              type="text" 
              name="contact" 
              value={formData.contact} 
              onChange={handleChange} 
              className='border rounded-md p-2 w-full' 
            />
          )}
        </div>
        <div className='col-span-1'>
          <button className='p-1 w-8 h-8 bg-blue-500 hover:bg-blue-800 text-center rounded-full cursor-pointer' onClick={() => setIsEditMode(!isEditMode)}>
            {isEditMode ? <MdSave size={20} color='white' className='ms-1' /> : <MdEditDocument size={20} color='white' className='ms-1'/>}
          </button>
        </div>
        <div className='col-span-1'>
          <button className='p-1 w-8 h-8 bg-red-500 hover:bg-red-800 text-center rounded-full cursor-pointer' onClick={() => setShowDeleteModal(true)}>
            <MdAutoDelete size={20} color='white' className='ms-1' />
          </button>
        </div>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {isEditMode && (
        <div className='flex justify-end mt-4'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="mb-4">Are you sure you want to delete this university?</p>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={handleDelete}
            >
              Yes, Delete
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UniListItem;
