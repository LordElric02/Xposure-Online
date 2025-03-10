import React from 'react'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';    
import Input from '@mui/material/Input';
import { useState } from 'react';
import { Paper } from '@mui/material';
import { ref, uploadBytes,  getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid';
import { storage } from './firebase';
import axios from 'axios';
import { firebaseName } from '../Utils/fileNameExtractor'

export const UploadVideoMui = () => {
    const [videoUpload  , setVideoUpload] = useState(null);
    let apiUrl = "";
    const isRunningInsideBackend = ((window.location.port === '5000') && (window.location.hostname === 'localhost')) || (window.location.hostname === 'xposure-online.onrender.com');    
    if (!isRunningInsideBackend) {
        // This code runs only in the frontend
       apiUrl = `${process.env.REACT_APP_API_URL}/videos/GenerateThumbnail?filebaseName=${fileName}&fileUrl=${encodedUrl}`;
    } else {
        // This code runs only in the backend
        apiUrl = `/api/videos/GenerateThumbnail?filebaseName=${fileName}&fileUrl=${encodedUrl}`;
    }
    const uploadVideo = () => {  
        if(videoUpload === null) return null;
        const videosListRef = ref(storage, `videos/uploadvideos_${ v4()}`);  
        uploadBytes(videosListRef, videoUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then(async (url) => {
            //generate 
            const fileName = firebaseName(url);
            const encodedUrl = encodeURIComponent(url);
            const response = await axios.get(apiUrl);
            })
            
      });
  };


  return (
    <div>
         <Paper style={{height:75, width:250}}>
            <Input
                accept="image/*" // You can specify file types here
                id="file-upload"
                type="file"
                onChange={(e) => setVideoUpload(e.target.files[0])}
                
            /> 
                <ButtonGroup  variant='contained' size='large'>
                <Button 
                    startIcon={<SaveIcon />}
                    onClick={uploadVideo}>Upload
                </Button>
                <Button 
                    startIcon={<DeleteIcon />}
                    onClick={uploadVideo}>Discard
                </Button>
                </ButtonGroup>
        </Paper>
    </div>
  )
}