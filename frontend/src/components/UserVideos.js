import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import  { ThumbnailGallery } from './ThumnnailGallery';
import { ThumbnailGalleryForUser } from './ThumnnailGalleryForUser';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';  

const UserVideos  =({ refreshVideos }) =>{
  const [user, setUser] = useState(null);
  const [videos, setVideoList] = useState([]); 
  const [currentVideo, setCurrentVideo] = useState(null);
  const videoRef = useRef(null); // Crea

   useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user);
        });
    
        return () => unsubscribe();
      }, []);
    

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        console.log(`check for user in user videos: ${user}`); 
        const response = await axios.get('http://localhost:5000/api/videos');
        const tempArray = JSON.parse(response.data);
        setCurrentVideo(tempArray[1].videoUrl);
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

export default UserVideos;
