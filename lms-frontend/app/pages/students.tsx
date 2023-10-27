import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Student {
  id: number;
  name: string;
}

const StudentList = () => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/students');
        setStudents(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStudents();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/students/${id}`);
      setStudents(students.filter((student) => student.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (id: number) => {
    const name = prompt('Enter new name:');
    if (name) {
      try {
        await axios.put(`http://127.0.0.1:8000/students/${id}`, { name });
        setStudents(
          students.map((student) =>
            student.id === id ? { ...student, name } : student
          )
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h1>Student List</h1>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name}
            <button onClick={() => handleDelete(student.id)}>Delete</button>
            <button onClick={() => handleUpdate(student.id)}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
