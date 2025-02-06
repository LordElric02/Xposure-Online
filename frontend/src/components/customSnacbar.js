// CustomSnackbar.js
import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const CustomSnackbar = ({ open, message, severity, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Position at the top center
      sx={{ marginTop: '20px' }} // Add margin to ensure it's away from the top edge
    >
      <Alert 
        onClose={onClose} 
        severity={severity} 
        sx={{ 
          width: 'auto', // Set width to auto for better content fitting
          fontSize: '1rem', // Adjust font size for visibility
          padding: '16px', // Increase padding
          textAlign: 'center', // Center text
          zIndex: 1300 // Make sure it's on top
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
