import React from 'react';
import Typography from '@mui/material/Typography'; // Import Typography from Material-UI
import Slider from 'react-slick'; // Import the Slider component
import 'slick-carousel/slick/slick.css'; // Import the slick styles
import 'slick-carousel/slick/slick-theme.css'; // Import the slick theme styles

const VideoGroupGallery = ({ group, videos, handleThumbnailClick }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Number of thumbnails to show at once
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div style={styles.galleryContainer}>
      <Typography variant="h6" gutterBottom>{group}</Typography>
      {videos.length === 1 ? (
        <div 
          onClick={() => handleThumbnailClick(videos[0].videoUrl, videos[0].title)}
          style={{ ...styles.thumbnail, ...styles.singleThumbnail }}
        >
          <img src={videos[0].thumbnailUrl} alt={videos[0].title} style={{ ...styles.thumbnailImage, ...styles.singleThumbnailImage }} />
          <Typography variant="caption" sx={{ ...styles.caption }}>{videos[0].title}</Typography>
        </div>
      ) : (
        <Slider {...settings} style={styles.thumbnailSlider}>
          {videos.map(video => (
            <div 
              key={video.id}
              onClick={() => handleThumbnailClick(video.videoUrl, video.title)}
              style={styles.thumbnail}
            >
              <img src={video.thumbnailUrl} alt={video.title} style={styles.thumbnailImage} />
              <Typography variant="caption" sx={{ color: 'white' }}>{video.title}</Typography> 
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

const styles = {
  galleryContainer: {
    marginBottom: '20px',
  },
  thumbnailSlider: {
    margin: '0 auto',
  },
  thumbnail: {
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '10px',
    transition: 'transform 0.2s',
    height: '200px', // Fixed height for thumbnails
  },
  thumbnailImage: {
    width: '100%',
    height: '100%', // Ensure the image fills the container
    objectFit: 'cover', // Cover the container while preserving aspect ratio
    borderRadius: '10px',
    transition: 'transform 0.2s',
  },
  singleThumbnail: {
    height: '200px', // Fixed height for single image
  },
  singleThumbnailImage: {
    height: '100%', // Ensure the image fills the container
    objectFit: 'cover', // Cover the container while preserving aspect ratio
  },
  caption: {
    color: 'white',
    position: 'absolute',
    bottom: '8px',
    left: '8px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add a semi-transparent background for better visibility
    borderRadius: '4px',
    padding: '4px',
  },
};

export default VideoGroupGallery;
