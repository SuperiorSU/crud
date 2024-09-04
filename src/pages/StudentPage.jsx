import React, { useEffect, useState } from 'react';
import ButtonHeader from '../components/ButtonHeader'; // Ensure this is the correct path
import ListItem from '../components/ListItem';
import axios from 'axios';

const StudentPage = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', email: '' });
  // const [isAdding, setIsAdding] = useState(false);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:4000/api/v1/students'); // Adjust the API endpoint if necessary
      // Access the data from the response object
      if (response.data.success && Array.isArray(response.data.data)) {
        setStudents(response.data.data);
      } else {
        console.error('Unexpected response format:', response.data);
        setStudents([]);
      }
    } catch (error) {
      console.error('Failed to fetch students', error);
    }
  };

  useEffect(() => {
    // Fetch students data on component mount
    
    fetchStudents();
  }, []);

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:4000/api/v1/students/${id}`);
      setStudents(prevStudents => prevStudents.filter(student => student._id !== id));
      fetchStudents();
       // Fetch updated data
    } catch (error) {
      console.error('Failed to delete student', error);
    }
  };

  // Handle update action
  const handleUpdate = async (id, updatedData) => {
    try {
      await axios.put(`http://127.0.0.1:4000/api/v1/students/${id}`, updatedData);
      setStudents(prevStudents => prevStudents.map(student =>
        student._id === id ? { ...student, ...updatedData } : student
      ));
      
      fetchStudents(); // Fetch updated data
    } catch (error) {
      console.error('Failed to update student', error);
    }
  };

  // Handle add action
  // const handleAdd = async () => {
  //   if (newStudent.name && newStudent.email) {
  //     try {
  //       const response = await axios.post('http://127.0.0.1:4000/api/v1/students', newStudent);
  //       if (response.data.success) {
  //         setStudents(prevStudents => [...prevStudents, response.data.data]);
  //         setNewStudent({ name: '', email: '' }); // Reset form
  //         setIsAdding(false); // Close add form
  //         fetchStudents(); // Fetch updated data
  //       } 
  //       else {
  //         console.error('Failed to add student:', response.data);
  //       }
  //     } catch (error) {
  //       console.error('Failed to add student', error);
  //     }
  //   } else {
  //     console.error('Name and email are required');
  //   }
  // };

  return (
    <div className='bg-slate-200'>
      <ButtonHeader id="students" />
      <div className='mb-8 p-6'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-2xl font-bold'>Students</h2>
          {/* {isAdding ? (
            <div className='mb-4'>
              <h3 className='text-xl font-bold mb-2'>Add New Student</h3>
              <input
                type="text"
                placeholder='Name'
                className='w-full p-2 rounded-md border border-gray-300 mb-2'
                value={newStudent.name}
                onChange={(e) => setNewStudent(prev => ({ ...prev, name: e.target.value }))}
              />
              <input
                type="email"
                placeholder='Email'
                className='w-full p-2 rounded-md border border-gray-300 mb-2'
                value={newStudent.email}
                onChange={(e) => setNewStudent(prev => ({ ...prev, email: e.target.value }))}
              />
              <button
                onClick={handleAdd}
                className='p-2 bg-blue-500 text-white rounded-md mr-2'
              >
                Add Student
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
              Add New Student
            </button>
          )} */}
        </div>
        <div>
          {students.length === 0 ? (
            <p>No students available.</p>
          ) : (
            students.map(student => (
              <ListItem
                key={student._id}
                id='students'
                data={student}
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

export default StudentPage;
