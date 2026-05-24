import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinkStyle = (path) => ({
    color: location.pathname === path ? 'var(--primary-color)' : 'var(--text-secondary)',
    fontWeight: location.pathname === path ? '600' : '400',
    marginRight: '1.5rem',
    textDecoration: 'none',
    transition: 'color var(--transition-fast)'
  });

  return (
    <div className="app-container">
      <header style={{ 
        backgroundColor: 'var(--surface-dark)', 
        borderBottom: '1px solid var(--border-color)',
        padding: '1rem 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link to={user ? "/dashboard" : "/"} style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)', textDecoration: 'none', marginRight: '3rem' }}>
              <span style={{ color: 'var(--primary-color)' }}>Edu</span>Sys
            </Link>

            {user && (
              <nav>
                <Link to="/dashboard" style={navLinkStyle('/dashboard')}>Dashboard</Link>
                <Link to="/students" style={navLinkStyle('/students')}>Students</Link>
              </nav>
            )}
          </div>

          <div>
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Welcome, <strong style={{ color: 'var(--text-primary)' }}>{user.username}</strong>
                </span>
                <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                  Logout
                </button>
              </div>
            ) : (
              <div>
                <Link to="/login" style={{ ...navLinkStyle('/login'), marginRight: '1rem' }}>Login</Link>
                <Link to="/register" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>Get Started</Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="main-content animate-fade-in">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
