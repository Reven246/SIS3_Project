// src/components/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header({ loggedInUser, setLoggedInUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('username');
    setLoggedInUser(null);
    navigate('/login');
  };

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
      <nav style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/">Home</Link>
        {!loggedInUser && <Link to="/login">Login</Link>}
        {!loggedInUser && <Link to="/register">Register</Link>}
      </nav>

      {loggedInUser && (
        <div>
          <span style={{ marginRight: '1rem' }}>Logged in as <strong>{loggedInUser}</strong></span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </header>
  );
}

export default Header;
