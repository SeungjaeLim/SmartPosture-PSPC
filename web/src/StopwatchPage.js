import React, { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function StopwatchPage({ onStop }) {
  const [time, setTime] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const intervalId = useRef(null);
  const warningTimeout = useRef(null);

  useEffect(() => {
    intervalId.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime % 60 === 0) { // Every 60 seconds
          sendPeriodicUpdate();
        }
        return prevTime + 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId.current);
      if (warningTimeout.current) {
        clearTimeout(warningTimeout.current);
      }
    };
  }, []);

  const sendPeriodicUpdate = async () => {
    try {
      const response = await fetch('http://localhost:8000/update-study', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data.result)
      if (data.result !== 'correct') {
        displayWarning();
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };

  const displayWarning = () => {
    setShowWarning(true);
    if (warningTimeout.current) {
      clearTimeout(warningTimeout.current);
    }
    warningTimeout.current = setTimeout(() => {
      setShowWarning(false);
    }, 10000); // Hide the warning after 10 seconds
  };

  const handleStop = () => {
    clearInterval(intervalId.current);
    onStop(time);
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
  
    return [hours, minutes, seconds].map(unit => String(unit).padStart(2, '0')).join(':');
  };

  return (
    <Box mt={5} textAlign="center">
      <Typography variant="h4" gutterBottom>
        {formatTime(time)}
      </Typography>
      <Button onClick={handleStop} variant="contained" color="primary">
        Stop
      </Button>
      {showWarning && (
        <Box mt={2} style={{ color: 'red' }}>
          <Typography>Warning: Please correct your posture!</Typography>
        </Box>
      )}
    </Box>
  );
}

export default StopwatchPage;
