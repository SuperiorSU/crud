import React, { useEffect, useState } from 'react';
import ListItem from '../components/ListItem';
import UniListItem from '../components/UniListItem';
import ButtonHeader from '../components/ButtonHeader';
import axios from 'axios';

const MainPage = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('');

  
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:4000/api/v1/students');
        const normalizedStudents = response.data.data || response.data;
        setStudents(normalizedStudents);
        setFilteredStudents(normalizedStudents); // Initialize filtered students
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    const fetchUniversities = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:4000/api/v1/universities');
        const normalizedUniversities = response.data.data;
        setUniversities(normalizedUniversities);
        setFilteredUniversities(normalizedUniversities); // Initialize filtered universities
      } catch (error) {
        console.error("Error fetching universities:", error);
      }
    };

    fetchStudents();
    fetchUniversities();
  }, []);

  // Filter and search function
  useEffect(() => {
    // Filter students based on search type and query
    const filtered = students.filter(student => {
      if (searchType === 'batch') {
        return student.batch && student.batch.toLowerCase().includes(searchQuery.toLowerCase());
      } else if (searchType === 'uni') {
        return student.college && student.college.toLowerCase().includes(searchQuery.toLowerCase());
      } else if (searchType === 'email') {
        return student.email && student.email.toLowerCase().includes(searchQuery.toLowerCase());
      } else {
        return true;
      }
    });

    // Filter universities based on search query
    const filteredUni = universities.filter(university => {
      return university.name && university.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    setFilteredStudents(filtered);
    setFilteredUniversities(filteredUni);
  }, [searchQuery, searchType, students, universities]);

  // Handle delete item
  const handleDelete = (id, type) => {
    if (type === 'students') {
      setStudents(prevStudents => prevStudents.filter(student => student._id !== id));
      setFilteredStudents(prevStudents => prevStudents.filter(student => student._id !== id));
    } else if (type === 'university') {
      setUniversities(prevUniversities => prevUniversities.filter(university => university._id !== id));
      setFilteredUniversities(prevUniversities => prevUniversities.filter(university => university._id !== id));
    }
  };

  // Handle update item
  const handleUpdate = (updatedData, type) => {
    if (type === 'students') {
      setStudents(prevStudents => prevStudents.map(student => student._id === updatedData._id ? updatedData : student));
      setFilteredStudents(prevStudents => prevStudents.map(student => student._id === updatedData._id ? updatedData : student));
    } else if (type === 'university') {
      setUniversities(prevUniversities => prevUniversities.map(university => university._id === updatedData._id ? updatedData : university));
      setFilteredUniversities(prevUniversities => prevUniversities.map(university => university._id === updatedData._id ? updatedData : university));
    }
  };

  return (
    <div className='bg-slate-100'>
      <ButtonHeader id="students" />
      <div className='container mx-auto p-4'>
        <div className='mb-8'>
          <div className='flex justify-between items-center '>
            <h2 className='text-2xl font-bold'>Students</h2>
            <div>
              <select
                name="searchType"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className='border rounded-md p-2 mx-5'
              >
                <option value="">Select Search Type</option>
                <option value="batch">Batch</option>
                <option value="email">Email</option>
              </select>
              <input
                type="text"
                placeholder='Search students'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-64 p-2 rounded-md border'
              />
            </div>
          </div>
          <div className='mt-4'>
            {filteredStudents.length === 0 ? (
              <p>No students available.</p>
            ) : (
              filteredStudents.map(student => (
                <ListItem
                  key={student._id}
                  id='students'
                  data={student}
                  onDelete={(id) => handleDelete(id, 'students')}
                  onUpdate={(updatedData) => handleUpdate(updatedData, 'students')}
                />
              ))
            )}
          </div>
        </div>

        <div className='p-20'></div>

        <div>
          <ButtonHeader id="university" />
          <h2 className='text-2xl font-bold'>Universities</h2>
          <div className='mt-4'>
             {(
              universities.map(university => (
                <UniListItem
                  key={university._id}
                  id={university._id}
                  data={university}
                  onDelete={(id) => handleDelete(id, 'university')}
                  onUpdate={(updatedData) => handleUpdate(updatedData, 'university')}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
