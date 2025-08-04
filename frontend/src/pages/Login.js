import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';



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
        <div>
          <h2>Login</h2>
          <form onSubmit={handleLogin} className="register-form">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            </div>
            <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            <div>
            <button type="submit">Login</button>
            </div>
          </form>

          <div style={{ marginTop: '10px', textAlign:'center'}}>
            <span style={{textalign: 'center', color:'white', width: '100%'}}>Don't yet have an account? </span>
            <Link to="/register" style={{ color: 'blue', textDecoration: 'underline' }}>
              Register here
            </Link>
          </div>

        </div>
  );
}

export default Login;
