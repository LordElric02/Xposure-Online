import React, { useState, useEffect } from 'react';
import axios from 'axios';
import  { ThumbnailGallery } from './ThumnnailGallery';
import { ThumbnailGalleryForUser } from './ThumnnailGalleryForUser';

const VideoPlayerUser  =({ refreshVideos, user }) =>{
  const [videos, setVideoList] = useState([]); 
  const [userVideos, setUserVideoList] = useState([]); 
  const [currentVideo, setCurrentVideo] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('${process.env.REACT_APP_API_URL}/videos');
        const tempArray = JSON.parse(response.data);
        setVideoList(tempArray);  
 
      } catch (err) {   
        console.log(err);
      } finally {
        console.log('finallyx');
       
      }
    };

    fetchVideos();
 
  }, [refreshVideos]);


  const handleThumbnailClick = (videoUrl) => {
    setCurrentVideo(videoUrl);
  };

  return (
    <div>
      <video controls style={styles.video} src={currentVideo} autoPlay/>
      <h2>Your Videos</h2>
      <ThumbnailGallery videos={videos} handleThumbnailClick={handleThumbnailClick} />
      <ThumbnailGalleryForUser videos={userVideos} handleThumbnailClick={handleThumbnailClick} />
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

export default VideoPlayerUser;
