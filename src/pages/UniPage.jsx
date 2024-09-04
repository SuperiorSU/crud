import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ButtonHeader from '../components/ButtonHeader'; // Ensure this is the correct path
import UniListItem from '../components/UniListItem'; // Import UniversityListItem

const UniPage = () => {
  const [universities, setUniversities] = useState([]);
  const [newUniversity, setNewUniversity] = useState({ university: '', address: '', contact: '' });
  const [isAdding, setIsAdding] = useState(false);

  const fetchUniversities = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:4000/api/v1/universities'); // Adjust the API endpoint if necessary
      // Access the data from the response object
      if (response.data.success && Array.isArray(response.data.data)) {
        setUniversities(response.data.data);
        console.log(response.data.data);
      } else {
        console.error('Unexpected response format:', response.data);
        setUniversities([]);
      }
    } catch (error) {
      console.error('Failed to fetch universities', error);
    }
  };
  useEffect(() => {
    // Fetch universities data on component mount

    fetchUniversities();
  }, []);

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:4000/api/v1/university/${id}`);
      setUniversities(prevUniversities => prevUniversities.filter(university => university._id !== id));
      fetchUniversities()
    } catch (error) {
      console.error('Failed to delete university', error);
    }
  };

  // Handle update action
  const handleUpdate = async (id, updatedData) => {
    try {
      await axios.put(`http://127.0.0.1:4000/api/v1/university/${id}`, updatedData);
      setUniversities(prevUniversities => prevUniversities.map(university =>
        university._id === id ? { ...university, ...updatedData } : university
      ));
      fetchUniversities(); // Fetch updated data
    } catch (error) {
      console.error('Failed to update university', error);
    }
  };

  // Handle add action
  const handleAdd = async () => {
    if (newUniversity.university && newUniversity.address && newUniversity.contact) {
      try {
        const response = await axios.post('http://127.0.0.1:4000/api/v1/university', newUniversity);
        if (response.data.success) {
          setUniversities(prevUniversities => [...prevUniversities, response.data.data]);
          setNewUniversity({ university: '', address: '', contact: '' }); // Reset form
          setIsAdding(false); // Close add form
        
        } else {
          console.error('Failed to add university:', response.data);
        }
      } catch (error) {
        console.error('Failed to add university', error);
      }
    } else {
      console.error('All fields are required');
    }
  };

  return (
    <div className='bg-slate-200'>
      <ButtonHeader id="universities" />
      <div className='mb-8 p-6'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-2xl font-bold'>Universities</h2>
          {/* {isAdding ? (
            <div className='mb-4'>
              <h3 className='text-xl font-bold mb-2'>Add New University</h3>
              <input
                type="text"
                placeholder='University Name'
                className='w-full p-2 rounded-md border border-gray-300 mb-2'
                value={newUniversity.university}
                onChange={(e) => setNewUniversity(prev => ({ ...prev, university: e.target.value }))}
              />
              <input
                type="text"
                placeholder='Address'
                className='w-full p-2 rounded-md border border-gray-300 mb-2'
                value={newUniversity.address}
                onChange={(e) => setNewUniversity(prev => ({ ...prev, address: e.target.value }))}
              />
              <input
                type="text"
                placeholder='Contact'
                className='w-full p-2 rounded-md border border-gray-300 mb-2'
                value={newUniversity.contact}
                onChange={(e) => setNewUniversity(prev => ({ ...prev, contact: e.target.value }))}
              />
              <button
                onClick={handleAdd}
                className='p-2 bg-blue-500 text-white rounded-md mr-2'
              >
                Add University
              </button>
              <button
                onClick={() => setIsAdding(false)}
                className='p-2 bg-gray-500 text-white rounded-md'
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAdding(true)}
              className='p-2 bg-green-500 text-white rounded-md mb-4'
            >
              Add New University
            </button>
          )} */}
        </div>
        <div>
          {universities.length === 0 ? (
            <p>No universities available.</p>
          ) : (
            universities.map(university => (
              <UniListItem
                key={university._id}
                id={university._id}
                data={university}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UniPage;
