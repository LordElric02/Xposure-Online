// VideoPlayer.js
import React from 'react';
import Typography from '@mui/material/Typography'; // Import Typography from Material-UI

const PlayVideo = ({ currentVideo, videoTitle }) => {
  return (
    <div style={styles.videoContainer}>
      <Typography variant="h5" gutterBottom>{videoTitle}</Typography>
      <video
        controls
        style={styles.video}
        src={currentVideo}
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

export default PlayVideo;
