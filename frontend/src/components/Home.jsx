import '../App.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import VideoPlayer from './VideoPlayer';
import { makeStyles   } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import { Container } from '@mui/material';
import { Grid2 } from '@mui/material';
import {FileUpload } from './UploadFileAndWait';
import SearchVideos from './SearchVideos';
import { useState, useEffect } from 'react';
import { Auth } from './Auth';
import {  onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import'fontsource-roboto';
import MyAppBar from './AppBar';


const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg,rgb(151, 133, 139) 30%,rgb(91, 18, 139) 90%)',
    border: 10,
    marginBottom: 30,
    borderRadius: 15,
    color: 'white',
    padding: '35px 30px',
  },
});

const theme = createTheme({
  typography: {
    h2: {
      fontSize: 36,
      marginBottom: 20
    }
  },
 
});

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
      setRefreshVideos(prev => !prev); // Toggle to trigger re-render
  };

  return (
      <Container>
          <MyAppBar />
          {user ? (
              <Grid2 container spacing={2}>
                  <Grid2 item xs={12} alignContent={'center'}>
                      <Auth />
                  </Grid2>
                  <br />
                  <Grid2 item xs={12} alignContent={'center'}>
                      <SearchVideos />
                  </Grid2>
                  <Grid2 container item xs={12} spacing={2} alignItems="flex-start">
                      <Grid2 item xs={8}>
                          <VideoPlayer refreshVideos={refreshVideos} />
                      </Grid2>
                      <Grid2 item xs={4}>
                          <FileUpload onUploadComplete={handleFileUploadComplete} />
                      </Grid2>
                  </Grid2>
              </Grid2>
          ) : (
              <Grid2 container spacing={2}>
                {/* Row 1: Component A */}
                <Grid2 item xs={12} alignContent={'center'}>
                    <Auth />
                </Grid2>
                {/* Row 2: Component B */}
                <br />
              
                {/* Row 3: Components C and D */}
                <Grid2 item xs={12} alignContent={'center'}>
                    <SearchVideos />
                </Grid2>
                <Grid2 container item xs={12} spacing={2} alignItems="flex-start" > {/* Align items to the top */}
            
                        <Grid2 item xs={12}> {/* Adjust this value for more/less space for C */}
                            <VideoPlayer />
                        </Grid2>
                        
                    </Grid2>
            </Grid2>              
        )
        }
        
    </Container>
  );
} 

export default Home; 
