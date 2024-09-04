import React, { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AnalysisPage = () => {
  const [studentData, setStudentData] = useState([]);
  const [collegeData, setCollegeData] = useState([]);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:4000/api/v1/students');
        setStudentData(response.data.data || []);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    const fetchCollegeData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:4000/api/v1/universities');
        setCollegeData(response.data.data || []);
      } catch (error) {
        console.error('Error fetching college data:', error);
      }
    };

    fetchStudentData();
    fetchCollegeData();
  }, []);

  // Define college names
  const collegeNames = ['SVIET', 'Chandigarh University', 'CGC Jhanjeri', 'Panjab University', 'Parul University'];

  // Store student counts in an object
  const studentCounts = collegeNames.reduce((acc, name) => {
    acc[name] = studentData.filter(student => student.college === name).length;
    return acc;
  }, {});

  // Prepare data for the number of students per college bar chart
  const studentsPerCollegeChartData = {
    labels: collegeNames,
    datasets: [
      {
        label: 'Number of Students',
        data: collegeNames.map(name => studentCounts[name]),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  // Prepare data for the number of colleges doughnut chart
  const numberOfCollegesChartData = {
    labels: collegeNames,
    datasets: [
      {
        data: collegeNames.map(() => 1),  // Each college counts as 1
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)'],
      },
    ],
  };

  return (
    <div className='p-8'>
      <h2 className='text-2xl font-bold mb-8'>Analysis Page</h2>
      <div className='grid grid-cols-4 p-10 gap-x-7'>
        <div className='col-span-2'>
          <h3 className='text-xl font-bold mb-4'>Number of Students per College</h3>
          <Bar data={studentsPerCollegeChartData} />
        </div>
        <div className='col-span-2'>
          <h3 className='text-xl font-bold mb-4'>Total Number of Colleges</h3>
          <Doughnut data={numberOfCollegesChartData} />
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
