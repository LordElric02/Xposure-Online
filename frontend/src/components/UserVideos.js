import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import VideoPlayer from './PlayVideo'; // Import the new VideoPlayer component
import VideoGroupGallery from './VideoGroupGallery'; // Import the new VideoGroupGallery component
import Loader from './Loader';
import { useSelector } from 'react-redux';


const  UserVideos = ({ refreshVideos }) => {
  const [videoGroups, setVideoGroups] = useState([]);
  const [videosByGroup, setVideosByGroup] = useState({});
  const [currentVideo, setCurrentVideo] = useState(null);
  const [videoTitle, setVideoTitle] = useState('');
  const videoPlayerRef = useRef(null); // Create a ref for the VideoPlayer
  
  const usertoken =  useSelector((state) => state.auth.accessToken);
  const userrole =  useSelector((state) => state.auth.role);
  console.log(`role fetched from redux store: ${userrole}`);
  const email =  useSelector((state) => state.auth.user.email);


  useEffect(() => {
    const fetchVideos = async () => {
      let vgroups = ['Emmy Winners', 'Animations', 'Games', 'Community', 'Educational', 'Other','Featured'];
      if(userrole === 'admin') {
        console.log('role is admin');
        vgroups.push('Spotlight Selections');
      }
      setVideoGroups(vgroups);

      try {
        const videoFetchPromises = vgroups.map(async (group) => {
          let thumbnailEndpoint = ``;
          const isRunningInsideBackend = ((window.location.port === '5000') && (window.location.hostname === 'localhost')) || (window.location.hostname === 'xposure-online.onrender.com');    
        if (!isRunningInsideBackend) {
            // This code runs only in the frontend
            thumbnailEndpoint = `${process.env.REACT_APP_API_URL}/videos/uservideosByGroup?email=${email}&group=${group}`;
        } else {
            // This code runs only in the backend
            thumbnailEndpoint = `/api/videos/uservideosByGroup?email=${email}&group=${group}`;
        }
          const requestBody = { usertoken: usertoken };

          const response = await axios.post(thumbnailEndpoint, requestBody, {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          return JSON.parse(response.data); // Assuming the response is an array of videos
        });

        const allVideos = await Promise.all(videoFetchPromises);
        const videosMap = vgroups.reduce((acc, group, index) => {
          acc[group] = allVideos[index];
          return acc;
        }, {});

        setVideosByGroup(videosMap);
        if (allVideos.length > 0 && allVideos[0].length > 0) {
          setCurrentVideo(allVideos[0][0].videoUrl);
          setVideoTitle(allVideos[0][0].title);
        }

      } catch (err) {
        console.log(err);
      }
    };

    fetchVideos();
  }, [refreshVideos, usertoken]);

  const handleThumbnailClick = (videoUrl, title) => {
    setCurrentVideo(videoUrl);
    setVideoTitle(title); // Update the title when thumbnail is clicked
    if (videoPlayerRef.current) {
      videoPlayerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Scroll to the VideoPlayer
    }
  };

  return (
    <div style={{ ...styles.container, minHeight: '500px', minWidth: '800px' }}>
      {currentVideo ? (
        <div ref={videoPlayerRef}> {/* Attach the ref to a wrapper div */}
          <VideoPlayer currentVideo={currentVideo} videoTitle={videoTitle} />
        </div>
      ) : (
        <Loader /> // A loading component while fetching videos
      )}
      <div style={styles.videoGroups}>
        {videoGroups.map(group => (
          <VideoGroupGallery 
            key={group} 
            group={group} 
            videos={videosByGroup[group] || []} 
            handleThumbnailClick={handleThumbnailClick} 
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#141414',
    color: '#fff',
  },
  videoGroups: {
    display: 'flex',
    flexDirection: 'column',
  },
};

export default UserVideos;
