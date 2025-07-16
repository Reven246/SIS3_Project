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
    <header>
      <nav>
        <Link  className="nav-link" to="/">Home</Link>
        {!loggedInUser && <Link  className="nav-link" to="/login">Login</Link>}
        {!loggedInUser && <Link  className="nav-link" to="/register">Register</Link>}
      </nav>

      {loggedInUser && (
        <div className="user-status">
          <span className="username">Logged in as <strong>{loggedInUser}</strong></span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </header>
  );
}

export default Header;
