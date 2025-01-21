import { StyledPaper, Header, UploadSection, VideoPlayerContainer } from './styledaApi'; // Adjust the path as necessary
import '../App.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Grid2, Button } from '@mui/material';
import Icon from '@mui/icons-material/AccessAlarm';
import { FileUpload } from './UploadFileAndWait';
import SearchVideos from './SearchVideos';
import { useState, useEffect } from 'react';
import { Auth } from './Auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import 'fontsource-roboto';
import UserVideos from './UserVideos';

const MyVideos = () => {
  const [user, setUser] = useState(null);
  const [refreshVideos, setRefreshVideos] = useState(false);
  const [isUploadSectionOpen, setIsUploadSectionOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleFileUploadComplete = () => {
    setRefreshVideos((prev) => !prev);
  };

  const toggleUploadSection = () => {
    setIsUploadSectionOpen((prev) => !prev);
  };

  return (
    <>
      <StyledPaper>
        <Grid2 container spacing={2}>
          <Grid2 item xs={12}>
            <Button
              onClick={toggleUploadSection}
              startIcon={<Icon />}
              sx={{
                backgroundColor: 'black',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'darkgray',
                },
                width: '100%',
                borderRadius: 8,
                padding: '12px',
              }}
            >
              {isUploadSectionOpen ? 'Hide Upload Section' : 'Show Upload Section'}
            </Button>
            {isUploadSectionOpen && user && (
              <UploadSection container>
                <FileUpload onUploadComplete={handleFileUploadComplete} user={user} />
              </UploadSection>
            )}
          </Grid2>
          <Grid2 item xs={12}>
            <SearchVideos />
          </Grid2>
          {user && (
            <Grid2 item xs={12}>
              <VideoPlayerContainer>
                <UserVideos refreshVideos={refreshVideos} user={user} />
              </VideoPlayerContainer>
            </Grid2>
          )}
        </Grid2>
      </StyledPaper>
    </>
  );
};

export default MyVideos;
