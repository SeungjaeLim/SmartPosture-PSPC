import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

function LoginPage({ onLogin, onNavigateRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: username,
          password: password,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Or handle the successful login
        onLogin(); // Assuming this updates the loggedIn state
      } else {
        console.error('Login failed');
        // Handle login failure
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Box mt={5}>
        <img src={`${process.env.PUBLIC_URL}/images/title.jpg`} alt="Title" style={{ maxWidth: '100%', height: 'auto' }} />
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
      <Button
        variant="text"
        color="primary"
        onClick={onNavigateRegister}
        sx={{ mt: 2 }}
      >
        Don't have an account? Register
      </Button>
    </Box>
  );
}

export default LoginPage;
