import { StyledPaper, Header, UploadSection, VideoPlayerContainer } from './styledaApi'; // Adjust the path as necessary
import '../App.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Grid2 } from '@mui/material';
import { FileUpload } from './UploadFileAndWait';
import SearchVideos from './SearchVideos';
import { useState, useEffect, use } from 'react';
import { Auth } from './Auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import 'fontsource-roboto';
import UserVideos from './UserVideos';
import PublicVideos from './PublicVideos';
import FeaturedVideos from './FeaturedVideos'; // New component for featured videos
import { useSelector } from 'react-redux'; // Import useSelector
import { useNavigate } from 'react-router-dom';


const HomeVideos = () => {
   // const [user, setUser] = useState(null);
   const [refreshVideos, setRefreshVideos] = useState(false);
   const navigate = useNavigate(); // Initialize navigate
   const user = useSelector((state) => state.auth.user); // Get user info from Redux store{{
   const role = useSelector((state) => state.auth.role);

   useEffect(() => {
      if (user) {
         console.log(`user from redux store: ${user.email}`);
         console.log(`user role: ${role}`);
      } else {
         console.log('No user found in Redux store'); }
   }, [user, navigate]); // Add user and navigate as dependencies
  


  
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
