import React from 'react';
import Typography from '@mui/material/Typography'; // Import Typography from Material-UI
import Slider from 'react-slick'; // Import the Slider component
import 'slick-carousel/slick/slick.css'; // Import the slick styles
import 'slick-carousel/slick/slick-theme.css'; // Import the slick theme styles

const VideoCarousel = ({ group, videos, handleThumbnailClick }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Adjust to show one large thumbnail
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 4000, // Set autoplay speed to 5 seconds
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1, // Show one for tablets
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1, // Still show one for mobile
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
         <Typography variant="caption">{videos[0].title}</Typography>
         safksdfad
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
            <Typography variant="caption">{video.title}</Typography>
            sfsdfsldfjxxxxxx
          </div>
        ))}
      </Slider>
      )};
      
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
    // Increase the size of the thumbnails
    width: '200%', // Adjust the width to double the size
  },
    singleThumbnail: {
    height: '200px', // Fixed height for single image
  },
  singleThumbnailImage: {
    height: '100%', // Ensure the image fills the container
    objectFit: 'cover', // Cover the container while preserving aspect ratio
  },
  thumbnailImage: {
    width: '100%',
    borderRadius: '10px',
    transition: 'transform 0.2s',
  },
};

export default VideoCarousel;
