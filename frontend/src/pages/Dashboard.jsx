import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/students?size=1');
        setStats({ total: res.data.totalElements });
      } catch (err) {
        console.error("Failed to load stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>System Dashboard</h2>
        <Link to="/students/new" className="btn btn-primary">
          + Add New Student
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 2rem' }}>
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Total Enrolled Students</h3>
          <div style={{ fontSize: '4rem', fontWeight: '700', color: 'var(--primary-color)' }}>
            {loading ? '...' : stats.total}
          </div>
          <Link to="/students" style={{ marginTop: '1.5rem', textDecoration: 'underline' }}>View Full Directory &rarr;</Link>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '3rem 2rem' }}>
          <h3>Quick Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            <Link to="/students" className="btn btn-secondary">Search Students</Link>
            <Link to="/students/new" className="btn btn-secondary">Register New Student</Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
