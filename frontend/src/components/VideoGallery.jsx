import React from 'react';
import Typography from '@mui/material/Typography';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const VideoGroupGallery = ({ group, videos, handleThumbnailClick }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: videos.length === 1 ? 1 : 3,
    infinite: false,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: videos.length === 1 ? 1 : 2,
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
     
        <Slider {...settings} style={styles.thumbnailSlider}>
          {videos.length !=1 && videos.map(video => (
            <div 
              key={video.id}
              onClick={() => handleThumbnailClick(video.videoUrl, video.title)}
              style={styles.thumbnail}
            >
              <img src={video.thumbnailUrl} alt={video.title} style={styles.thumbnailImage} />
              <Typography variant="caption">{video.title}</Typography>
            </div>
          ))}
        </Slider>
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
  },
  thumbnailImage: {
    width: '100%',
    borderRadius: '10px',
    transition: 'transform 0.2s',
  },
};

export default VideoGroupGallery;
