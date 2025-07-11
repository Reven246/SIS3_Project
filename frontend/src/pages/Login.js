import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login( {setLoggedInUser}) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  //handle LOGIN
  const handleLogin = (e) => {
  e.preventDefault();

  fetch('http://localhost:3001/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        localStorage.setItem('username', data.user.username);
        setLoggedInUser(data.user.username);
        setUsername('');
        setPassword('');
        alert('Prijava uspešna')
        navigate('/');
      }
    })
    .catch((err) => console.error('Login error:', err));
};
  return (
        <div style={{ marginBottom: '2rem' }}>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
        </div>
  );
}

export default Login;
