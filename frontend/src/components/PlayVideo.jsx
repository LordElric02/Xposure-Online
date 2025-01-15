// VideoPlayer.js
import React from 'react';
import Typography from '@mui/material/Typography'; // Import Typography from Material-UI

const PlayVideo = ({ currentVideo, videoTitle }) => {
  return (
    <div>
      <Typography variant="h5" gutterBottom>{videoTitle}</Typography>
      <video
        controls
        style={styles.video}
        src={currentVideo}
        autoPlay
      />
    </div>
  );
}

const styles = {
  video: {
    width: '80%',
    maxHeight: '60vh',
    marginBottom: '20px',
  },
};

export default PlayVideo;
