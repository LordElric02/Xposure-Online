import { RootContainer, StyledPaper, Header, UploadSection, VideoPlayerContainer } from './styledaApi'; // Adjust the path as necessary
import '../App.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import VideoPlayer from './VideoPlayer';
import { Grid2 } from '@mui/material';
import {FileUpload } from './UploadFileAndWait';
import SearchVideos from './SearchVideos';
import { useState, useEffect } from 'react';
import { Auth } from './Auth';
import {  onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import'fontsource-roboto';
import MyAppBar from './AppBar';


function Home() {
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
    <RootContainer>
      <MyAppBar />
      <StyledPaper>
        <Header variant="h2">
          {user ? 'Welcome Back!' : 'Please Log In'}
        </Header>
        <Grid2 container spacing={2}>
          <Grid2 item xs={12}>
            <Auth />
          </Grid2>
          <Grid2 item xs={12}>
            <SearchVideos />
          </Grid2>
          <Grid2 container item xs={12} spacing={2} alignItems="flex-start">
            <VideoPlayerContainer item xs={8}>
              <VideoPlayer refreshVideos={refreshVideos} />
            </VideoPlayerContainer>
            {user && (
              <UploadSection item xs={4}>
                <FileUpload onUploadComplete={handleFileUploadComplete} user={user} />
              </UploadSection>
            )}
          </Grid2>
        </Grid2>
      </StyledPaper>
    </RootContainer>
  );
}  

export default Home;