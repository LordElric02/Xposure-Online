import React from 'react';
import { Grid2, Paper } from '@mui/material';
import { Typography } from '@mui/material';


export const ThumbnailGallery = ({ videos, handleThumbnailClick }) => {
  return (
    <Grid2 container spacing={2}>
      {videos.map((video, index) => (
        <Grid2 item xs={2} key={index}> {/* Set width for 6 items per row */}
          <Typography variant="h5" gutterBottom>{video.title}</Typography> {/* Use Material-UI Typography */}
          <Paper elevation={4}>
            <img
              src={video.thumbnailUrl}
              alt={`Thumbnail ${index + 1}`}
              style={{ width: '150px', height: 'auto', cursor: 'pointer' }}
              onClick={() => handleThumbnailClick(video.videoUrl,video.title)}
            />
          </Paper>
        </Grid2>
      ))}
    </Grid2>
  );
};    