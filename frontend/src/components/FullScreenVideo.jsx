// VideoPlayer.js
import React from 'react';
import Typography from '@mui/material/Typography'; // Import Typography from Material-UI
import { useSelector } from 'react-redux'; // Import useSelector


const FullScreenVideo = () => {
  const videoUrl = useSelector((state) => state.video.videoUrl); // Get user info from Redux store{{
  const videoName = useSelector((state) => state.video.videoName);
  console.log(`videoUrl: ${videoUrl}`);
  console.log(`videoName: ${videoName}`);
  
 
  return (
    <div style={styles.videoContainer}>
      Full screen video player
      <Typography variant="h5" gutterBottom>{videoName}</Typography>
      <video
        controls
        style={styles.video}
        src={videoUrl}
        autoPlay
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

const styles = {
  videoContainer: {
    position: 'relative',
    width: '100%',
    maxHeight: '60vh', // Optional: restrict maximum height
    overflow: 'hidden', // Prevent overflow
  },
  video: {
    width: '100%',
    height: '100%', // Set height to 100% to fill the container
    objectFit: 'cover', // Maintain aspect ratio while covering the fixed dimensions
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
  },
};

export default FullScreenVideo;
