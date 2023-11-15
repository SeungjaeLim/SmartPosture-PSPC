import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

function LoginPage({ onLogin, onNavigateRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin();
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