import { StyledPaper, VideoPlayerContainer } from './styledaApi'; // Adjust the path as necessary
import '../App.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Grid2 } from '@mui/material';
import { useState } from 'react';
import 'fontsource-roboto';
import PublicVideos from './PublicVideos';
import FeaturedVideos from './FeaturedVideos'; // New component for featured videos
import { useSelector } from 'react-redux'; // Import useSelector

const HomeVideos = () => {
   // const [user, setUser] = useState(null);
   const [refreshVideos, setRefreshVideos] = useState(false);
   const user = useSelector((state) => state.auth.user); // Get user info from Redux store{{

  
   const handleFileUploadComplete = () => {
      setRefreshVideos((prev) => !prev); // Toggle to trigger re-render
   };
  
   return (
      <>
      {user? (
         <StyledPaper>
            <Grid2 container spacing={2}>
               <Grid2 container item xs={12} alignItems="flex-start">
                  {/* Any Header or Search bar can go here */}
               </Grid2>
                  <Grid2 container item xs={12} spacing={2} alignItems="flex-start">
                     <VideoPlayerContainer item xs={8}>
                        <PublicVideos refreshVideos={refreshVideos} />
                     </VideoPlayerContainer>
                  </Grid2>
            </Grid2>
         </StyledPaper>
   ): (
      <>      
        <div container item xs={12} alignItems="flex-start">
                        <h2>Welcome to Our Video Platform!</h2>
                        <p>Explore amazing content and join our community.</p>
                        <p><strong>Sign up</strong> to upload your own videos and connect with others!</p>
                     </div>
                     <FeaturedVideos /> {/* Show featured videos for anonymous users */}
                </>
   )   
   }
      </>
   );


}

export default HomeVideos;
