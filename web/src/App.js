import './App.css';
import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import LoginPage from './LoginPage';
import StopwatchPage from './StopwatchPage';
import WeeklyGrid from './WeeklyGrid';
import IOTSettings from './IOTSettings';
import RegisterPage from './RegisterPage';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
import LightModeIcon from '@mui/icons-material/LightMode';
import Typography from '@mui/material/Typography';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff7f50',
    },
    background: {
      default: '#fff',
    },
  },
});

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [onStopwatchPage, setOnStopwatchPage] = useState(false);
  const [studyData, setStudyData] = useState([
    { date: '2023-11-01', correctPostureTime: 120, incorrectPostureTime: 30 },
    { date: '2023-11-02', correctPostureTime: 90, incorrectPostureTime: 15 },
    // ... more dates with times
  ]);
  const [currentTemp, setCurrentTemp] = useState(22);
  const [currentHumid, setCurrentHumid] = useState(45);
  const [preferredTemp, setPreferredTemp] = useState(24);
  const [preferredHumid, setPreferredHumid] = useState(50);

  const handleLogin = () => setLoggedIn(true);
  const handleStartStudy = () => setOnStopwatchPage(true);
  const handleStopStudy = (studiedTime) => {
    setOnStopwatchPage(false);
    // Update study data logic here
  };
  const handleSetIOT = () => {
    // Set IOT logic here
  };
  const handleRegister = (username, email, password) => {
    // Handle the registration logic here
    // For now, just log the details
    console.log(username, email, password);
    // You might want to set loggedIn to true after successful registration
  };


  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
  
    return [hours, minutes, seconds]
      .map(unit => String(unit).padStart(2, '0'))
      .join(':');
  };

  
  const getTodaysStudyTime = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayData = studyData.find(entry => entry.date === today);
    // Assuming study times are stored in minutes in your data
    const totalSecondsToday = (todayData ? (todayData.correctPostureTime + todayData.incorrectPostureTime) : 0) * 60;
    return formatTime(totalSecondsToday);
  };

  const [onRegisterPage, setOnRegisterPage] = useState(false); // State to track the registration page
  const navigateToRegister = () => setOnRegisterPage(true);
  const navigateToLogin = () => setOnRegisterPage(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box display="flex">
        <Container maxWidth="sm">
        {!loggedIn && !onRegisterPage ? (
            <LoginPage onLogin={handleLogin} onNavigateRegister={navigateToRegister} />
          ) : onRegisterPage ? (
            <RegisterPage onRegister={handleRegister} onNavigateLogin={navigateToLogin} />
          ) : onStopwatchPage ? (
            <StopwatchPage onStop={handleStopStudy} />
          ) : (
            <Box textAlign="center" mt={5}>
              <Typography variant="h4" sx={{ mb: 2 }}>
                {getTodaysStudyTime()}
              </Typography>
              <Button variant="contained" color="primary" onClick={handleStartStudy} sx={{ mb: 2 }}>
                Start Study
              </Button>
              <WeeklyGrid studyData={studyData} />
              <Table sx={{ mt: 2, mx: 'auto' }}>
                <TableBody>
                  <TableRow>
                    <TableCell align="center"><ThermostatIcon /></TableCell>
                    <TableCell align="center">{currentTemp}°C</TableCell>
                    <TableCell align="center">{preferredTemp}°C</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center"><OpacityIcon /></TableCell>
                    <TableCell align="center">{currentHumid}%</TableCell>
                    <TableCell align="center">{preferredHumid}%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center"><LightModeIcon /></TableCell>
                    <TableCell align="center">--</TableCell> {/* Replace -- with actual data */}
                    <TableCell align="center">--</TableCell> {/* Replace -- with actual data */}
                  </TableRow>
                </TableBody>
              </Table>
              <IOTSettings onSetIOT={handleSetIOT} />
              
            </Box>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
