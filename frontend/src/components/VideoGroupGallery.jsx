// VideoGroupGallery.js
import React from 'react';
import Typography from '@mui/material/Typography'; // Import Typography from Material-UI
import { ThumbnailGallery } from './ThumnnailGallery';

const VideoGroupGallery = ({ group, videos, handleThumbnailClick }) => {
    return (
      <div style={styles.galleryContainer}>
        <Typography variant="h6" gutterBottom>{group}</Typography>
        <div style={styles.thumbnailGrid}>
          {videos.map(video => (
            <div 
              key={video.id}
              onClick={() => handleThumbnailClick(video.videoUrl, video.title)}
              style={styles.thumbnail}
            >
              <img src={video.thumbnailUrl} alt={video.title} style={styles.thumbnailImage} />
              <Typography variant="caption">{video.title}</Typography>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  const styles = {
    galleryContainer: {
      marginBottom: '20px',
    },
    thumbnailGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
      gap: '10px',
    },
    thumbnail: {
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '10px',
      transition: 'transform 0.2s',
    },
    thumbnailImage: {
      width: '100%',
      borderRadius: '10px',
      transition: 'transform 0.2s',
    },
    thumbnailHover: {
      transform: 'scale(1.05)',
    },
  };
  
export default VideoGroupGallery;
