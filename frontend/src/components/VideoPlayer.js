import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {ThumbnailGallery} from './ThumnnailGallery';
import Typography from '@mui/material/Typography'; // Import Typography from Material-UI

const VideoPlayer = ({ refreshVideos }) => {
  const [videos, setVideoList] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [videoTitle, setVideoTitle] = useState('');
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/videos`);
        const tempArray = JSON.parse(response.data);
        setCurrentVideo(tempArray[1].videoUrl);
        setVideoTitle(tempArray[1].title); // Assuming the title is in the response
        setVideoList(tempArray);
      } catch (err) {
        console.log(err);
      } finally {
        console.log('finallyx');
      }
    };

    fetchVideos();
  }, [refreshVideos]);

  const handleThumbnailClick = (videoUrl, title) => {
    setCurrentVideo(videoUrl);
    setVideoTitle(title); // Update the title when thumbnail is clicked
  };

  return (
    <div style={styles.container}>
      <Typography variant="h5" gutterBottom>{videoTitle}</Typography> {/* Use Material-UI Typography */}
      <video 
        ref={videoRef}
        controls 
        style={styles.video} 
        src={currentVideo} 
        autoPlay
      />
      <ThumbnailGallery videos={videos} handleThumbnailClick={handleThumbnailClick} />
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  video: {
    width: '80%',
    maxHeight: '60vh',
    marginBottom: '20px',
  },
  thumbnailContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  thumbnail: {
    width: '120px',
    height: 'auto',
    margin: '5px',
    cursor: 'pointer',
    border: '2px solid transparent',
    transition: 'border 0.2s',
  },
};

export default VideoPlayer;
