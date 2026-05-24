import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Pagination
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const size = 10;

  const fetchStudents = async () => {
    setLoading(true);
    try {
      let endpoint = `/students?page=${page}&size=${size}&sortBy=id&sortDir=desc`;
      if (searchTerm) {
        endpoint = `/students/search?keyword=${searchTerm}&page=${page}&size=${size}&sortBy=id&sortDir=desc`;
      }
      
      const response = await api.get(endpoint);
      setStudents(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [page, searchTerm]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await api.delete(`/students/${id}`);
        fetchStudents(); // refresh the list
      } catch (err) {
        console.error("Error deleting student:", err);
        alert("Failed to delete student. You may not have ADMIN privileges.");
      }
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(0); // Reset to first page on search
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Student Directory</h2>
        <Link to="/students/new" className="btn btn-primary">
          + Add New Student
        </Link>
      </div>

      <div className="card" style={{ padding: '0' }}>
        {/* Toolbar */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '1rem' }}>
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            value={searchTerm}
            onChange={handleSearch}
            style={{ maxWidth: '400px' }}
          />
        </div>

        {/* Table */}
        <div className="table-container" style={{ border: 'none', borderRadius: '0' }}>
          {loading ? (
            <div style={{ padding: '3rem', textAlign: 'center' }}>Loading students...</div>
          ) : students.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
              No students found.
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td style={{ color: 'var(--text-secondary)' }}>#{student.id}</td>
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                    <td>{student.email}</td>
                    <td>
                      <span style={{ 
                        padding: '0.25rem 0.75rem', 
                        backgroundColor: 'rgba(79, 70, 229, 0.1)', 
                        color: 'var(--primary-color)',
                        borderRadius: '999px',
                        fontSize: '0.85rem',
                        fontWeight: '500'
                      }}>
                        {student.department || 'N/A'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <Link to={`/students/edit/${student.id}`} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', marginRight: '0.5rem' }}>Edit</Link>
                      <button onClick={() => handleDelete(student.id)} className="btn btn-danger" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination Controls */}
        {!loading && students.length > 0 && (
          <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Showing Page {page + 1} of {totalPages === 0 ? 1 : totalPages}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                onClick={() => setPage(p => Math.max(0, p - 1))} 
                disabled={page === 0}
                className="btn btn-secondary"
              >
                Previous
              </button>
              <button 
                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} 
                disabled={page >= totalPages - 1}
                className="btn btn-secondary"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;
