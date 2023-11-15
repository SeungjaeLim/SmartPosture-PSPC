import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

function RegisterPage({ onRegister, onNavigateLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(''); // Additional field for email

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here, you'll handle the registration logic
    onRegister(username, email, password);
  };

  return (
    <Box mt={5}>
        <img src={`${process.env.PUBLIC_URL}/images/reg_title.jfif`} alt="Title" style={{ maxWidth: '100%', height: 'auto' }} />
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
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          Register
        </Button>
        <Button
        variant="text"
        color="primary"
        onClick={onNavigateLogin}
        sx={{ mt: 2 }}
      >
        Already have an account? Login
      </Button>
      </form>
    </Box>
  );
}

export default RegisterPage;
