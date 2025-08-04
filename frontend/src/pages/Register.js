import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Register() {
  const navigate = useNavigate();
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [gameTag, setGameTag] = useState('');

//Handle REGISTER
const handleRegister = (e) => {
  e.preventDefault();

  fetch('${process.env.REACT_APP_API_URL}/users/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: regUsername, password: regPassword, game_tag: gameTag,}),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        alert('Registracija uspešna, sedaj se lahko prijavite');
        setRegUsername('');
        setRegPassword('');
        setGameTag('');
        navigate('/login');
      }
    })
    .catch((err) => console.error('Register error:', err));
};

  return (
<div>
          <h2>Register</h2>
          <form onSubmit={handleRegister} className="register-form">
            <div>
            <input
              type="text"
              placeholder="Username"
              value={regUsername}
              onChange={(e) => setRegUsername(e.target.value)}
            />
            </div>

            <div>
            <input
              type="password"
              placeholder="Password"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
            />
            </div>
            <div>
            <input
              type="text"
              placeholder="Game Tag" // New field for game tag
              value={gameTag}
              onChange={(e) => setGameTag(e.target.value)}  // Handle game tag input
            />
          </div>
            <div>
            <button type="submit">Create an account</button>
            </div>
          </form>
        </div>
  );
}

export default Register;
