import React, { useState } from 'react';
import axios from 'axios';
import { Button, Snackbar, Alert } from '@mui/material';
import Input from '@mui/material/Input';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';
import { v4 } from 'uuid';
import { firebaseName } from '../Utils/fileNameExtractor';

export const FileUpload = ({ onUploadComplete, user }) => {
  const [file, setFile] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  const [uploading, setUploading] = useState(false); // New state for uploading

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setSnackbarMessage('Please select a file to upload.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    const videosListRef = ref(storage, `videos/uploadvideos_${v4()}`);
    const thumbnailEndpoint = ''; // This should be defined after you create the URL.

    try {
      setUploading(true); // Start showing the uploading toast

      // Start the upload process
      const snapshot = await uploadBytes(videosListRef, file);
      const url = await getDownloadURL(snapshot.ref);

      // Generate the file name and thumbnail endpoint
      const fileName = firebaseName(url);
      const encodedUrl = encodeURIComponent(url);
      const usertoken = user.stsTokenManager.accessToken;
      const thumbnailEndpoint = `http://localhost:5000/api/videos/GenerateThumbnail?filebaseName=${fileName}&fileUrl=${encodedUrl}`;
      const requestBody = {
        usertoken: usertoken
      };
      try {
        const response = await axios.post(thumbnailEndpoint, requestBody, {
          headers: {
            'Content-Type': 'application/json', // Ensure the content type is set
          },
        });

      } catch (err) {
        console.log(err);
      }    

      // On success, update the snackbar message to "File uploaded successfully!"
      setSnackbarMessage('File uploaded successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      // Optionally, you can call onUploadComplete here if needed
      onUploadComplete();
    } catch (error) {
      // Handle errors from both upload and API call
      
      setSnackbarMessage('Error uploading file.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setUploading(false); // Hide the uploading toast
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Input type="file" onChange={handleFileChange} />
      <Button variant="contained" onClick={handleUpload}>
        Upload
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbarSeverity} 
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Uploading Toast */}
      <Snackbar
        open={uploading}
        anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
        autoHideDuration={null} // Keep it open until manually closed
      >
        <Alert 
          severity="info" 
          sx={{ backgroundColor: 'red', color: 'white', width: 'auto' }}
        >
          Uploading video...
        </Alert>
      </Snackbar>
    </div>
  );
};
