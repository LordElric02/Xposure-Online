import React from 'react';
import { Paper } from '@mui/material';

const VideoPlayerMui = ({ videoUrl }) => {
  return (
    <Paper>
      <video controls src={videoUrl} style={{ width: '100%' }} />
    </Paper>
  );
};

export default VideoPlayerMui;
