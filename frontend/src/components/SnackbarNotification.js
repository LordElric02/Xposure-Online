import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const SnackbarNotification = ({ open, message, severity, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Floats to the top center
      sx={{ top: 10 }} // Ensures it's always at the very top
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{
          width: '90%', // Ensures visibility across different screens
          maxWidth: '600px', // Prevents excessive stretching
          fontSize: '1.2rem', // Increases readability
          padding: '16px',
          textAlign: 'center',
          backgroundColor: '#1976d2', // Blue background (Material-UI primary blue)
          color: 'white', // White text for better contrast
          border: '2px solid white', // Simple white border
          borderRadius: '8px', // Soft rounded corners
          wordWrap: 'break-word', // Ensures long messages don't get cut off
          whiteSpace: 'normal', // Allows multiline messages
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarNotification;
