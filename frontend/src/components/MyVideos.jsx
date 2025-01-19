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
  const [isUploadSectionOpen, setIsUploadSectionOpen] = useState(false); // State for collapsible section

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleFileUploadComplete = () => {
    setRefreshVideos((prev) => !prev); // Toggle to trigger re-render
  };

  const toggleUploadSection = () => {
    setIsUploadSectionOpen((prev) => !prev); // Toggle upload section visibility
  };

  return (
    <>
      <StyledPaper>
        <Header variant="h2">
          My Videos
        </Header>
        <Grid2 container spacing={2}>
          <Grid2 container item xs={12} alignItems="flex-start">
            <Grid2 item xs={4}>
              <Button
                onClick={toggleUploadSection}
                startIcon={<Icon />} // Add the icon here
      color="primary" 
                sx={{
                  backgroundColor: 'black',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'darkgray', // Optional: change color on hover
                  },
                }}
              >
                {isUploadSectionOpen ? 'Hide Upload Section' : 'Show Upload Section'}
              </Button>
              {isUploadSectionOpen && user && ( // Conditional rendering based on the state
                <UploadSection>
                  <FileUpload onUploadComplete={handleFileUploadComplete} user={user} />
                </UploadSection>
              )}
            </Grid2>
            <Grid2 item xs={8} alignItems="flex-start">
              <SearchVideos />
            </Grid2>
          </Grid2>
          {user && (
            <Grid2 container item xs={12} spacing={2} alignItems="flex-start">
              <VideoPlayerContainer item xs={8}>
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
