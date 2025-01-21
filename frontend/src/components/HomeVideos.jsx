import { StyledPaper, Header, UploadSection, VideoPlayerContainer } from './styledaApi'; // Adjust the path as necessary
import '../App.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Grid2 } from '@mui/material';
import {FileUpload } from './UploadFileAndWait';
import SearchVideos from './SearchVideos';
import { useState, useEffect } from 'react';
import { Auth } from './Auth';
import {  onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import'fontsource-roboto';
import UserVideos from './UserVideos';

const HomeVideos = () => {
   const [user, setUser] = useState(null);
   const [refreshVideos, setRefreshVideos] = useState(false);
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
      });
  
      return () => unsubscribe();
    }, []);
  
    const handleFileUploadComplete = () => {
      setRefreshVideos((prev) => !prev); // Toggle to trigger re-render
    };
  
  return (
    <>
      <StyledPaper>
  <Grid2 container spacing={2}>
  <Grid2 container item xs={12} alignItems="flex-start">


</Grid2>
{user  && (
    <Grid2 container item xs={12} spacing={2} alignItems="flex-start">
      <VideoPlayerContainer item xs={8}>
        <UserVideos refreshVideos={refreshVideos} user={user}  />
      </VideoPlayerContainer>
    </Grid2>)}
  </Grid2>
</StyledPaper>

     </>
  )
}

export default HomeVideos