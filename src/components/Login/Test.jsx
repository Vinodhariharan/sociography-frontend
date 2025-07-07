import axios from 'axios';
import React, { useState } from 'react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(`https://sociography-bend-gxfqbzbxhnghg2hz.southeastasia-01.azurewebsites.net/api/auth/login`, null, {
        params: {
          username,
          password
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
  
      if (response.status === 200) {
        // Save token to local storage (or context)
        localStorage.setItem('token', response.data.token);
        // Redirect to home page
        console.log('Login successful');
      }
    } catch (error) {
      setError('Invalid username or password. Please try again.');
    }
  };
  

  return (
    <div>
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
      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPage;
