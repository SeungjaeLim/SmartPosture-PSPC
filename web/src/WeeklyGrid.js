import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

function WeeklyGrid({ studyData }) {
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({});

  const handleOpen = (data) => {
    setSelectedData(data);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const COLORS = ['#0088FE', '#FF8042']; // Blue for correct, Orange for incorrect

  return (
    <Box mt={2}>
      <Grid container spacing={2}>
        {studyData.map((entry, index) => {
          const data = [
            { name: 'Correct Posture', value: entry.correctPostureTime },
            { name: 'Incorrect Posture', value: entry.incorrectPostureTime },
          ];

          return (
            <Grid item xs={12} sm={4} key={index} onClick={() => handleOpen(entry)}>
              <Paper elevation={3} sx={{ padding: 2, cursor: 'pointer', textAlign: 'center' }}>
                <Typography variant="subtitle1">{entry.date}</Typography>
                <PieChart width={200} height={200}>
                  <Pie data={data} cx="35%" cy="50%" outerRadius={60} dataKey="value">
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="study-details"
  aria-describedby="study-details-description"
>
  <Box sx={{ 
      position: 'absolute', 
      top: '50%', 
      left: '50%', 
      transform: 'translate(-50%, -50%)', 
      bgcolor: 'background.paper', 
      boxShadow: 24, 
      p: 4, 
      maxWidth: 500
    }}>
    <Typography id="study-details" variant="h6" component="h2">
      Study Details - {selectedData.date}
    </Typography>
    <img src={`${process.env.PUBLIC_URL}/images/cat1.jpg`} alt="Cat" style={{ maxWidth: '100%', height: 'auto', marginTop: '20px' }} />
    <Typography id="study-details-description" sx={{ mt: 2 }}>
      Correct Posture Time: {selectedData.correctPostureTime} minutes
    </Typography>
    <Typography id="study-details-description">
      Incorrect Posture Time: {selectedData.incorrectPostureTime} minutes
    </Typography>
  </Box>
</Modal>
    </Box>
  );
}

export default WeeklyGrid;
