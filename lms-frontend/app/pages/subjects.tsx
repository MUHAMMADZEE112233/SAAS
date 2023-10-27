import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Subject {
  id: number;
  name: string;
}

const SubjectList = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/subjects');
        setSubjects(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSubjects();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/subjects/${id}`);
      setSubjects(subjects.filter((subject) => subject.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (id: number) => {
    const name = prompt('Enter new subject name:');
    if (name) {
      try {
        await axios.put(`http://127.0.0.1:8000/subjects/${id}`, { name });
        setSubjects(
          subjects.map((subject) =>
            subject.id === id ? { ...subject, name } : subject
          )
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h1>Subject List</h1>
      <ul>
        {subjects.map((subject) => (
          <li key={subject.id}>
            {subject.name}
            <button onClick={() => handleDelete(subject.id)}>Delete</button>
            <button onClick={() => handleUpdate(subject.id)}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubjectList;
