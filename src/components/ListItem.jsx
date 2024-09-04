import React, { useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { MdEditDocument, MdAutoDelete, MdSave } from "react-icons/md";
import axios from 'axios';

const ListItem = ({ id, data, onDelete, onUpdate }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState(data);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [error, setError] = useState('');

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission for updates
  const handleSubmit = async (e) => {
    if (e) e.preventDefault(); // Ensure event object is passed

    if (!formData.name || !formData.email || !formData.contact || (id === "students" && (!formData.semester || !formData.year || !formData.batch || !formData.university))) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!/^\d{10}$/.test(formData.contact)) {
      setError('Please enter a valid 10-digit contact number.');
      return;
    }

    setError('');

    try {
      if (id === 'students') {
        await axios.put(`http://127.0.0.1:4000/api/v1/student/${data._id}`, formData);
      } else if (id === 'university') {
        await axios.put(`http://127.0.0.1:4000/api/v1/university/${data._id}`, formData);
      }
      setIsEditMode(false);
      onUpdate(formData);
    } catch (error) {
      console.error(error);
      setError('Failed to update data. Please try again.');
    }
  };

  // Handle delete confirmation
  const handleDelete = async () => {
    try {
      if (id === 'students') {
        await axios.delete(`http://127.0.0.1:4000/api/v1/student/${data._id}`);
      } else if (id === 'university') {
        await axios.delete(`http://127.0.0.1:4000/api/v1/university/${data._id}`);
      }
      onDelete(data._id);
    } catch (error) {
      console.error(error);
    } finally {
      setShowDeleteModal(false);
    }
  };

  return (
    <div className='bg-white px-8 grid grid-cols-12 p-3 overflow-x-auto'>
      <div className='col-span-1'>
        <FaUserCircle size={30} color='#94a3b8' className='inline-block' />
      </div>
      <div className='col-span-1'>
        {!isEditMode ? (
          <p className='text-sm text-slate-600'>{formData.name}</p>
        ) : (
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            className='border rounded-md px-2 py-1 text-sm' 
          />
        )}
      </div>
      <div className='col-span-3'>
        {!isEditMode ? (
          <p className='text-sm text-slate-600'>{formData.email?formData.email:""}</p>
        ) : (
          <input 
            type="email" 
            name="email" 
            value={formData.email?formData.email:""}     
            onChange={handleChange} 
            className='border rounded-md px-2 py-1 text-sm' 
          />
        )}
      </div>
      {id === 'students' && (
        <>
          <div className='col-span-1'>
            {!isEditMode ? (
              <p className='text-sm text-slate-600'>{formData.semester}</p>
            ) : (
              <input 
                type="text" 
                name="semester" 
                value={formData.semester?formData.semester:""} 
                onChange={handleChange} 
                className='border rounded-md px-2 py-1 text-sm' 
              />
            )}
          </div>
          <div className='col-span-1'>
            {!isEditMode ? (
              <p className='text-sm text-slate-600'>{formData.year}</p>
            ) : (
              <input 
                type="number" 
                name="year" 
                value={formData.year?formData.year:""} 
                onChange={handleChange} 
                className='border rounded-md px-2 py-1 text-sm' 
              />
            )}
          </div>
          <div className='col-span-1'>
            {!isEditMode ? (
              <p className='text-sm text-slate-600'>{formData.batch}</p>
            ) : (
              <input 
                type="text" 
                name="batch" 
                value={formData.batch} 
                onChange={handleChange} 
                className='border rounded-md px-2 py-1 text-sm' 
              />
            )}
          </div>
          <div className='col-span-2'>
            {!isEditMode ? (
              <p className='text-sm text-slate-600'>{formData.university}</p>
            ) : (
              <input 
                type="text" 
                name="university" 
                value={formData.university} 
                onChange={handleChange} 
                className='border rounded-md px-2 py-1 text-sm' 
              />
            )}
          </div>
        </>
      )}
      <div>
        <p className='text-sm text-slate-600'>{formData.contact}</p>
      </div>
      <div>
        <div className='flex justify-between gap-x-5 items-center'>
          <div
            className='p-1 w-8 h-8 bg-blue-500 text-center rounded-full hover:bg-blue-700 cursor-pointer'
            onClick={() => isEditMode ? handleSubmit() : setIsEditMode(true)}
          >
            {isEditMode ? (
              <MdSave size={18} color='white' className='mx-auto mt-1' />
            ) : (
              <MdEditDocument size={18} color='white' className='mx-auto mt-1' />
            )}
          </div>
          <div
            className='p-1 w-8 h-8 bg-red-500 hover:bg-red-800 text-center rounded-full cursor-pointer'
            onClick={() => setShowDeleteModal(true)}
          >
            <MdAutoDelete size={18} color='white' className='mx-auto mt-1' />
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
          <div className='bg-white p-6 rounded-md'>
            <h2 className='text-xl font-semibold mb-4'>Confirm Deletion</h2>
            <p className='mb-4'>Are you sure you want to delete this {id === 'students' ? 'student' : 'university'}?</p>
            <div className='flex justify-end gap-3'>
              <button 
                onClick={() => setShowDeleteModal(false)} 
                className='bg-gray-300 text-gray-700 px-4 py-2 rounded-md'
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete} 
                className='bg-red-500 text-white px-4 py-2 rounded-md'
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && <div className='text-red-500 mt-2'>{error}</div>}
    </div>
  );
};

export default ListItem;
