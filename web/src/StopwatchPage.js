import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function StopwatchPage({ onStop }) {
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  

  useEffect(() => {
    const id = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    setIntervalId(id);
    return () => clearInterval(id);
  }, []);

  const handleStop = () => {
    clearInterval(intervalId);
    onStop(time);
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
  
    return [hours, minutes, seconds]
      .map(unit => String(unit).padStart(2, '0'))
      .join(':');
  };
  

  return (
    <Box mt={5} textAlign="center">
      <Typography variant="h4" gutterBottom>
        {formatTime(time)}
      </Typography>
      <Button onClick={handleStop} variant="contained" color="primary">
        Stop
      </Button>
    </Box>
  );
}

export default StopwatchPage;
