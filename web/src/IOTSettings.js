import React from 'react';
import Button from '@mui/material/Button';

function IOTSettings({ onSetIOT }) {
  return (
    <Button onClick={onSetIOT} variant="contained" color="primary" sx={{ mt: 2 }}>
      Set IOT Preferences
    </Button>
  );
}

export default IOTSettings;
