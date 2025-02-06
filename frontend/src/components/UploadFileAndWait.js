import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Box, Input } from '@mui/material';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';
import { v4 } from 'uuid';
import { firebaseName } from '../Utils/fileNameExtractor';
import VideoGroupSelect from './videoGroupsSelect';
import { useSelector } from 'react-redux';
import SnackbarNotification from './SnackbarNotification';

export const FileUpload = ({ onUploadComplete }) => {
  const [file, setFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoGroup, setVideoGroup] = useState('');
  const [videoGroups, setVideoGroups] = useState([]);
  const [snackbarData, setSnackbarData] = useState({ open: false, message: '', severity: 'info' });
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  const user = useSelector((state) => state.auth.user);
  const usertoken = useSelector((state) => state.auth.accessToken);
  const userRole = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetchVideoGroups = async () => {
      if (!user) return;
      const requestBody = { usertoken };
      let videoGroupEndpoint = 
        (window.location.port === '5000' && window.location.hostname === 'localhost') ||
        window.location.hostname === 'xposure-online.onrender.com'
          ? `/api/videos/videoGroups?email=${user.email}&role=${userRole}`
          : `${process.env.REACT_APP_API_URL}/videos/videoGroups?email=${user.email}&role=${userRole}`;

      try {
        const response = await axios.post(videoGroupEndpoint, requestBody, {
          headers: { 'Content-Type': 'application/json' },
        });
        setVideoGroups(JSON.parse(response.data));
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchVideoGroups();
  }, [user]);

  const handleFileChange = (event) => setFile(event.target.files[0]);
  const handleThumbnailChange = (event) => setThumbnail(event.target.files[0]);


  const handleUpload = async () => {
    if (!file) {
      setSnackbarData({ open: true, message: 'Please select a file to upload.', severity: 'error' });
      return;
    }
  
    if (!thumbnail) {
      setSnackbarData({ open: true, message: 'Please select a thumbnail to upload.', severity: 'error' });
      return;
    }
  
    if (!videoTitle) {
      setSnackbarData({ open: true, message: 'Video title is required.', severity: 'error' });
      return;
    }
  
    if (!videoGroup) {
      setSnackbarData({ open: true, message: 'Please select a video group.', severity: 'error' });
      return;
    }
  
    const videosListRef = ref(storage, `videos/uploadvideos_${v4()}`);
  
    try {
      setUploading(true);
      setSnackbarData({ open: true, message: 'Uploading video...', severity: 'info' }); // Show uploading Snackbar
  
      const snapshot = await uploadBytes(videosListRef, file);
      const url = await getDownloadURL(snapshot.ref);
      const fileName = firebaseName(url);
      const encodedUrl = encodeURIComponent(url);
      let thumbnailEndpoint = 
        (window.location.port === '5000' && window.location.hostname === 'localhost') ||
        window.location.hostname === 'xposure-online.onrender.com'
          ? `/api/videos/GenerateThumbnail?filebaseName=${fileName}&fileUrl=${encodedUrl}&videotitle=${videoTitle}&videogroup=${videoGroup}`
          : `${process.env.REACT_APP_API_URL}/videos/GenerateThumbnail?filebaseName=${fileName}&fileUrl=${encodedUrl}&videotitle=${videoTitle}&videogroup=${videoGroup}`;
  
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64Thumbnail = btoa(new Uint8Array(event.target.result)
          .reduce((data, byte) => data + String.fromCharCode(byte), ''));
        
        const requestBody = { usertoken, thumbnail: base64Thumbnail };
  
        try {
          await axios.post(thumbnailEndpoint, JSON.stringify(requestBody), {
            headers: { 'Content-Type': 'application/json' },
          });
  
          setSnackbarData({ open: true, message: 'File uploaded successfully!', severity: 'success' });
          onUploadComplete();
        } catch (err) {
          setSnackbarData({ open: true, message: 'Error uploading thumbnail.', severity: 'error' });
        }
      };
      reader.readAsArrayBuffer(thumbnail);
    } catch (error) {
      setSnackbarData({ open: true, message: 'Error uploading file.', severity: 'error' });
    } finally {
      setUploading(false);
      // Close the uploading Snackbar after the upload is complete
      setSnackbarData({ open: false, message: '', severity: 'info' });
    }
  };
  
  // In the return statement of your component
  {uploading && (
    <SnackbarNotification 
      open={uploading} 
      message="Uploading video..." 
      severity="info" 
    />
  )}
  
  return (
    <div style={{ position: 'relative' }}>
      <div>
      <label htmlFor="vtitle" style={{ display: 'block', marginBottom: '4px', color: 'white' }}>
    Video Title
  </label>
        <Input
          id="vtitle"
          type="text"
          placeholder="Video Title"
          value={videoTitle}
          onChange={(e) => setVideoTitle(e.target.value)}
          style={{ marginBottom: '8px', width: '100%', backgroundColor: 'white', color: 'black' }}
        />
        {loading ? <div>Loading...</div> : (
          <VideoGroupSelect videoGroup={videoGroup} setVideoGroup={setVideoGroup} videoGroups={videoGroups} />
        )}
      </div>

      <Box mt={2}>
        <label htmlFor="thumbnail-upload">
          <Button variant="contained" component="span">
            Choose Thumbnail
          </Button>
        </label>
        <Input
          id="thumbnail-upload"
          type="file"
          onChange={handleThumbnailChange}
          required
          style={{ display: 'none' }}
        />
      </Box>
      <Box mt={2}>
        <label htmlFor="video-upload">
          <Button variant="contained" component="span">
            Choose Video
          </Button>
        </label>
        <Input
          id="video-upload"
          type="file"
          onChange={handleFileChange}
          required
          style={{ display: 'none' }}
        />
      </Box>
      <Box mt={2}>
      <Button variant="contained" onClick={handleUpload}>Upload Video</Button>

      </Box>


      <SnackbarNotification 
        open={snackbarData.open} 
        message={snackbarData.message} 
        severity={snackbarData.severity} 
        onClose={() => setSnackbarData({ ...snackbarData, open: false })} 
      />

      {uploading && (
        <SnackbarNotification 
          open={uploading} 
          message="Uploading video..." 
          severity="info" 
        />
      )}
    </div>
  );
};
