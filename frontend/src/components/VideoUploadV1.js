import '../App.css';
import { useState } from 'react';
import { storage } from './firebase';
import { ref, uploadBytes,  getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid';
import { firebaseName } from '../Utils/fileNameExtractor'
import axios from 'axios';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import VideoPlayer from './VideoPlayer';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { ButtonGroup, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import { ThemeProvider   } from '@mui/material/styles';
import { makeStyles   } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import {orange} from  '@mui/material/colors'
import {amber} from  '@mui/material/colors'
import Topography from '@mui/material/Typography';
import { Container } from '@mui/material';
import Paper from '@mui/material/Paper';  
import { Grid2 } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Box } from '@mui/material/Box';  
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';  
import'fontsource-roboto';
import Auth from './Auth';



 

  return (
    
    <div>
       <Grid2 container spacing={2}>
          
          <Grid2 item>
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
          </Grid2>
        </Grid2>
  
     
    </div>

  );

