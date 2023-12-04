import './App.css';
import React, { useState, useEffect } from 'react';
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
  const [studyData, setStudyData] = useState([]);
  const [advise, setAdvise] = useState('');

  const fetchAdvise = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/advise`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      let data = await response.text();
      if (data.startsWith('"') && data.endsWith('"')) {
        data = data.substring(1, data.length - 1);
      }
      setAdvise(data);
    } catch (error) {
      console.error('Error fetching Advise:', error);
    }
  }

  // Fetch study data from API
  const fetchStudyData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/study-data`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setStudyData(data);
    } catch (error) {
      console.error('Error fetching study data:', error);
    }
  };

  useEffect(() => {
    fetchStudyData();
    fetchAdvise();
  }, []);

  const [currentTemp, setCurrentTemp] = useState(22);
  const [currentHumid, setCurrentHumid] = useState(45);
  const [preferredTemp, setPreferredTemp] = useState(24);
  const [preferredHumid, setPreferredHumid] = useState(50);

  const handleLogin = () => setLoggedIn(true);
  const handleStartStudy = () => setOnStopwatchPage(true);
  const handleStopStudy = async (studiedTime) => {
    setOnStopwatchPage(false);
    // Process the studied time if needed
    console.log('Studied Time:', studiedTime);
    // Fetch updated study data from API
    await fetchStudyData();
    await fetchAdvise();
  };

  const handleSetIOT = () => {
    // Set IOT logic here
  };

  const handleRegister = (username, email, password) => {
    // Handle the registration logic here
    console.log(username, email, password);
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
    const totalSecondsToday = (todayData ? (todayData.correctPostureTime + todayData.incorrectPostureTime) : 0) * 60;
    return formatTime(totalSecondsToday);
  };

  const [onRegisterPage, setOnRegisterPage] = useState(false);
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
              {advise && <Typography>{advise}</Typography>}
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
                    <TableCell align="center">--</TableCell>
                    <TableCell align="center">--</TableCell>
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
