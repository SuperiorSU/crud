import React, { useState } from 'react';
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import axios from 'axios';
import * as XLSX from 'xlsx';

const ButtonHeader = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentFormData, setStudentFormData] = useState({
    name: '',
    email: '',
    contact: '',
    semester: '',
    year: '',
    batch: '',
    university: ''
  });
  const [universityFormData, setUniversityFormData] = useState({
    university: '',
    address: '',
    contact: ''
  });
  const [error, setError] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id === 'students') {
      // Basic form validation for students
      if (!studentFormData.name || !studentFormData.email || !studentFormData.contact || !studentFormData.semester || !studentFormData.year || !studentFormData.batch || !studentFormData.university) {
        setError('Please fill in all required fields.');
        return;
      }
    } else if (id === 'university') {
      // Basic form validation for universities
      if (!universityFormData.university || !universityFormData.contact || !universityFormData.address) {
        setError('Please fill in all required fields.');
        return;
      }
    }

    if (!/^\d{10}$/.test(id === 'students' ? studentFormData.contact : universityFormData.contact)) {
      setError('Please enter a valid 10-digit contact number.');
      return;
    }

    setError('');

    try {
      if (id === 'students') {
        await axios.post('http://127.0.0.1:4000/api/v1/student', studentFormData);
      } else if (id === 'university') {
        await axios.post('http://127.0.0.1:4000/api/v1/university', universityFormData);
      }
      setIsModalOpen(false);
      // Reset form data
      setStudentFormData({ name: '', email: '', contact: '', semester: '', year: '', batch: '', university: '' });
      setUniversityFormData({ university: '', contact: '', address: '' });
      alert(`${id === 'students' ? 'Student' : 'University'} added successfully!`);
    } catch (error) {
      console.error(error);
      setError('Failed to add data. Please try again.');
    }
  };

  // Function to download data as Excel
  const downloadExcel = async () => {
    try {
      let response;
      let data;
      
      if (id === 'students') {
        response = await axios.get('http://127.0.0.1:4000/api/v1/students', { responseType: 'json' });
        data = response.data;
        console.log('Students Data:', data);
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, 'Students');
        XLSX.writeFile(wb, 'students.xlsx');
      } else if (id === 'university') {
        response = await axios.get('http://127.0.0.1:4000/api/v1/universities', { responseType: 'json' });
        data = response.data;
        console.log('Universities Data:', data);
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, 'Universities');
        XLSX.writeFile(wb, 'universities.xlsx');
      }
    } catch (error) {
      console.error('Error downloading data:', error);
      alert('Failed to download data. Please try again.');
    }
  };
  

  return (
    <div className='flex justify-between items-center px-6 p-3'>
      <div>
        <div className='flex justify-around items-center gap-x-5'>
          <div>
            <h2 className='text-xl font-bold'>{id === 'students' ? 'All Students' : 'All Universities'}</h2>
          </div>
          <div>
            <button onClick={() => setIsModalOpen(true)} className='bg-purple-500 text-white font-semibold rounded-md px-3 py-2'>
              Add New +
            </button>
          </div>
          <div>
            <button onClick={downloadExcel} className='hover:bg-purple-500 border-2 border-purple-500 text-purple-500 transition-all duration-100 hover:text-white font-semibold rounded-md px-2 py-[6px]'>
              <PiMicrosoftExcelLogoFill className='inline-block mb-1 me-1' size={20} />Download Excel
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
          <div className='bg-white p-6 rounded-md w-96'>
            <h2 className='text-xl font-semibold mb-4'>Add New {id === 'students' ? 'Student' : 'University'}</h2>
            {error && <div className='text-red-500 mb-2'>{error}</div>}
            <form onSubmit={handleSubmit}>
              {id === 'students' && (
                <>
                  {/* Student-specific fields */}
                  <div className='mb-4'>
                    <label className='block text-gray-700'>Name</label>
                    <input 
                      type='text'
                      className='border rounded-md px-3 py-2 w-full'
                      value={studentFormData.name}
                      onChange={(e) => setStudentFormData({ ...studentFormData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className='mb-4'>
                    <label className='block text-gray-700'>Email</label>
                    <input 
                      type='email'
                      className='border rounded-md px-3 py-2 w-full'
                      value={studentFormData.email}
                      onChange={(e) => setStudentFormData({ ...studentFormData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className='mb-4'>
                    <label className='block text-gray-700'>Contact</label>
                    <input 
                      type='text'
                      className='border rounded-md px-3 py-2 w-full'
                      value={studentFormData.contact}
                      onChange={(e) => setStudentFormData({ ...studentFormData, contact: e.target.value })}
                      required
                    />
                  </div>
                  <div className='mb-4'>
                    <label className='block text-gray-700'>Semester</label>
                    <input 
                      type='text'
                      className='border rounded-md px-3 py-2 w-full'
                      value={studentFormData.semester}
                      onChange={(e) => setStudentFormData({ ...studentFormData, semester: e.target.value })}
                      required
                    />
                  </div>
                  <div className='mb-4'>
                    <label className='block text-gray-700'>Year</label>
                    <input 
                      type='number'
                      className='border rounded-md px-3 py-2 w-full'
                      value={studentFormData.year}
                      onChange={(e) => setStudentFormData({ ...studentFormData, year: e.target.value })}
                      required
                    />
                  </div>
                  <div className='mb-4'>
                    <label className='block text-gray-700'>Batch</label>
                    <input 
                      type='text'
                      className='border rounded-md px-3 py-2 w-full'
                      value={studentFormData.batch}
                      onChange={(e) => setStudentFormData({ ...studentFormData, batch: e.target.value })}
                      required
                    />
                  </div>
                  <div className='mb-4'>
                    <label className='block text-gray-700'>University</label>
                    <input 
                      type='text'
                      className='border rounded-md px-3 py-2 w-full'
                      value={studentFormData.university}
                      onChange={(e) => setStudentFormData({ ...studentFormData, university: e.target.value })}
                      required
                    />
                  </div>
                </>
              )}

              {id === 'university' && (
                <>
                  {/* University-specific fields */}
                  <div className='mb-4'>
                    <label className='block text-gray-700'>Name</label>
                    <input 
                      type='text'
                      className='border rounded-md px-3 py-2 w-full'
                      value={universityFormData.university}
                      onChange={(e) => setUniversityFormData({ ...universityFormData, university: e.target.value })}
                      required
                    />
                  </div>
                  <div className='mb-4'>
                    <label className='block text-gray-700'>Address</label>
                    <input 
                      type='text'
                      className='border rounded-md px-3 py-2 w-full'
                      value={universityFormData.address}
                      onChange={(e) => setUniversityFormData({ ...universityFormData, address: e.target.value })}
                      required
                    />
                  </div>
                  <div className='mb-4'>
                    <label className='block text-gray-700'>Contact</label>
                    <input 
                      type='text'
                      className='border rounded-md px-3 py-2 w-full'
                      value={universityFormData.contact}
                      onChange={(e) => setUniversityFormData({ ...universityFormData, contact: e.target.value })}
                      required
                    />
                  </div>
                </>
              )}

              <div className='flex justify-end'>
                <button type='button' onClick={() => setIsModalOpen(false)} className='bg-gray-300 text-black rounded-md px-4 py-2 mr-2'>
                  Cancel
                </button>
                <button type='submit' className='bg-blue-500 text-white rounded-md px-4 py-2'>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ButtonHeader;
