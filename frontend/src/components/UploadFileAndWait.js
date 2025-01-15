import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Snackbar, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { TextField } from '@mui/material';
import Input from '@mui/material/Input';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';
import { v4 } from 'uuid';
import { firebaseName } from '../Utils/fileNameExtractor';
import  VideoGroupSelect  from './videoGroupsSelect';


export const FileUpload = ({ onUploadComplete, user }) => {
  const [file, setFile] = useState(null);
  const[videoTitle, setVideoTitle] = useState('');
  const[videoGroup, setVideoGroup] = useState('');
  const[videoGroups, setVideoGroups] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideoGroups = async () => {
      const usertoken = user.stsTokenManager.accessToken;
      const requestBody = {
        usertoken: usertoken
      };
      const videoGroupEndpoint = `http://localhost:5000/api/videos/videoGroups?email=${user.email}`;
      try {
        const response = await axios.post(videoGroupEndpoint, requestBody, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const tempArray = JSON.parse(response.data);
        console.log(`response from videoGroups: ${tempArray.length}`);
        setVideoGroups(tempArray); 
        setLoading(false); // Set loading to false after fetching
      } catch (err) {
        console.error(err);
      }
    };
  
    // Call the async function
    if (user) {
      fetchVideoGroups();
    }
  }, [user]); // Add `user` as a dependency
  

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
    const thumbnailEndpoint = '';

    try {
      setUploading(true);

      const snapshot = await uploadBytes(videosListRef, file);
      const url = await getDownloadURL(snapshot.ref);
      const fileName = firebaseName(url);
      const encodedUrl = encodeURIComponent(url);
      const usertoken = user.stsTokenManager.accessToken;
      const thumbnailEndpoint = `http://localhost:5000/api/videos/GenerateThumbnail?filebaseName=${fileName}&fileUrl=${encodedUrl}&videotitle=${videoTitle}&videogroup=${videoGroup}`;
      const requestBody = {
        usertoken: usertoken
      };

      try {
        const response = await axios.post(thumbnailEndpoint, requestBody, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

      } catch (err) {
        console.log(err);
      } 
      
     

      setSnackbarMessage('File uploaded successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      onUploadComplete();
    } catch (error) {
      setSnackbarMessage('Error uploading file.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setUploading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div style={{ position: 'relative' }}>
     <div>
     <label htmlFor="vtitle" style={{ display: 'block', marginBottom: '4px' }}>
  Video Title
</label>
<Input 
  id="vtitle"
  type="text" 
  placeholder="Video Title" 
  value={videoTitle} 
  onChange={(e) => setVideoTitle(e.target.value)} 
  style={{ 
    marginBottom: '8px', 
    width: '100%', 
    backgroundColor: 'white', 
    color: 'black' // Changed to black for visibility
  }} 
/>
{loading ? (
               <div>Loading...</div>
           ) : (
            <VideoGroupSelect videoGroup={videoGroup} setVideoGroup={setVideoGroup} videoGroups={videoGroups}   />
           )}
     
  
</div>

      <Input type="file" onChange={handleFileChange} />
      <Button variant="contained" onClick={handleUpload}>
        Upload
      </Button>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Change position to top center
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbarSeverity} 
          sx={{ 
            width: '100%', 
            fontSize: '2rem', // Increase font size
            padding: '16px', // Increase padding
            textAlign: 'center', // Center text
            position: 'absolute', // Use absolute positioning
            top: '50%', // Center vertically
            left: '50%', // Center horizontally
            transform: 'translate(-50%, -50%)', // Adjust for centering
            zIndex: 1300 // Make sure it's on top
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={uploading}
        anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
        autoHideDuration={null}
      >
        <Alert 
          severity="info" 
          sx={{ backgroundColor: 'red', color: 'white', width: 'auto', fontSize: '2rem', padding: '16px', textAlign: 'center' }}
        >
          Uploading video...
        </Alert>
      </Snackbar>
    </div>
  );
};