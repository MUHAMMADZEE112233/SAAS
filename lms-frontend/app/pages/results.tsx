import { useState, useEffect } from 'react';
import axios from 'axios';

interface Result {
  id: number;
  score: string;
  result_feedback: string;
  student: number;
  subject: number;
}

interface Student {
  id: number;
  name: string;
}

interface Subject {
  id: number;
  name: string;
}

const Results = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedResult, setSelectedResult] = useState<Result | null>(null);
  const [updatedScore, setUpdatedScore] = useState<string>('');

  useEffect(() => {
    axios.get<Result[]>('http://127.0.0.1:8000/results').then((response) => {
      setResults(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get<Student[]>('http://127.0.0.1:8000/students').then((response) => {
      setStudents(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get<Subject[]>('http://127.0.0.1:8000/subjects').then((response) => {
      setSubjects(response.data);
    });
  }, []);

  const getStudentName = (studentId: number) => {
    const student = students.find((student) => student.id === studentId);
    return student ? student.name : '';
  };

  const getSubjectName = (subjectId: number) => {
    const subject = subjects.find((subject) => subject.id === subjectId);
    return subject ? subject.name : '';
  };

  const handleUpdateClick = (result: Result) => {
    setSelectedResult(result);
    setUpdatedScore(result.score);
  };

  const handleScoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedScore(event.target.value);
  };

  const handleUpdateSubmit = () => {
    if (selectedResult) {
      axios
        .put(`http://127.0.0.1:8000/results/${selectedResult.id}`, {
          score: updatedScore,
        })
        .then(() => {
          axios
            .get<Result[]>('http://127.0.0.1:8000/results')
            .then((response) => {
              setResults(response.data);
            });
        });
      setSelectedResult(null);
      setUpdatedScore('');
    }
  };

  const handleDeleteClick = (result: Result) => {
    axios.delete(`http://127.0.0.1:8000/results/${result.id}`).then(() => {
      axios.get<Result[]>('http://127.0.0.1:8000/results').then((response) => {
        setResults(response.data);
      });
    });
  };

  return (
    <div>
      <h1>Results</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Score</th>
            <th>Feedback</th>
            <th>Student</th>
            <th>Subject</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.id}>
              <td>{result.id}</td>
              <td>
                {result === selectedResult ? (
                  <input
                    type='text'
                    value={updatedScore}
                    onChange={handleScoreChange}
                  />
                ) : (
                  result.score
                )}
              </td>
              <td>{result.result_feedback}</td>
              <td>{getStudentName(result.student)}</td>
              <td>{getSubjectName(result.subject)}</td>
              <td>
                {result === selectedResult ? (
                  <div>
                    <button onClick={handleUpdateSubmit}>Update</button>
                    <button onClick={() => setSelectedResult(null)}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div>
                    <button onClick={() => handleUpdateClick(result)}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteClick(result)}>
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Results;
