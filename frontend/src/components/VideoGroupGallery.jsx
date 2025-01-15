// VideoGroupGallery.js
import React from 'react';
import Typography from '@mui/material/Typography'; // Import Typography from Material-UI
import { ThumbnailGallery } from './ThumnnailGallery';

const VideoGroupGallery = ({ group, videos, handleThumbnailClick }) => {
  return (
    <div style={styles.galleryContainer}>
      <Typography variant="h6" gutterBottom>{group}</Typography>
      <ThumbnailGallery 
        videos={videos} 
        handleThumbnailClick={handleThumbnailClick} 
      />
    </div>
  );
}

const styles = {
  galleryContainer: {
    marginBottom: '20px', // Space between galleries
  },
};

export default VideoGroupGallery;
