import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import VideoGroupGallery from './VideoGroupGallery'; // Import the new VideoGroupGallery component
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setVideo, clearVideo } from '../reducers/videoPlayerReducer';
import { useSelector } from 'react-redux';
import VideoCarousel from './VideoCarousel';

const  PublicVideos = ({ refreshVideos }) => {
  const [videoGroups, setVideoGroups] = useState([]);
  const [videosByGroup, setVideosByGroup] = useState({});
  const [currentVideo, setCurrentVideo] = useState(null);
  const [videoTitle, setVideoTitle] = useState('');
  const videoPlayerRef = useRef(null); // Create a ref for the VideoPlayer
  const navigate = useNavigate(); // Initialize navigate
  const dispatch = useDispatch();
  const usertoken =  useSelector((state) => state.auth.accessToken);
  const userrole =  useSelector((state) => state.auth.role);
  const user =  useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchVideos = async () => {
      let vgroups = ['Emmy Winners', 'Animations', 'Games', 'Community', 'Educational','Other'];
      const requestBody = {
        usertoken: usertoken
      };

      let videoGroupEndpoint = ``;
      const isRunningInsideBackend = ((window.location.port === '5000') && (window.location.hostname === 'localhost')) || (window.location.hostname === 'xposure-online.onrender.com');    
      if (!isRunningInsideBackend) {
          videoGroupEndpoint = `${process.env.REACT_APP_API_URL}/videos/videoGroups?email=${user.email}&role=${userrole}`;
      } else {
          videoGroupEndpoint = `/api/videos/videoGroups?email=${user.email}&role=${userrole}`;
      }
      try {
        const response = await axios.post(videoGroupEndpoint, requestBody, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const tempArray = JSON.parse(response.data);
        const groupArray = tempArray.map(item => item.group);
        vgroups = groupArray
     
      } catch (err) {
        console.error(err);
      }
      setVideoGroups(vgroups);

      try {
        console.log(`vgroups before promises: ${vgroups}`);
        const videoFetchPromises = vgroups.map(async (group) => {
          console.log(`window.location.hostname: ${window.location.hostname}`); // Log the window.location.hostnam
          const isRunningInsideBackend = ((window.location.port === '5000') && (window.location.hostname === 'localhost')) || (window.location.hostname === 'xposure-online.onrender.com');    
          let videoEndpoint = ``;
          if (!isRunningInsideBackend) {
            videoEndpoint = `${process.env.REACT_APP_API_URL}/videos/videosByGroup?group=${group}`;
          } else {
            videoEndpoint = `/api/videos/videosByGroup?group=${group}`;
          }
          const response = await axios.post(videoEndpoint, {
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

        console.log(`videos map:${JSON.stringify(videosMap)}`);
        setVideosByGroup(videosMap);
        console.log(`videosByGroup: ${JSON.stringify(videosMap)}`);
        if (allVideos.length > 0 && allVideos[0].length > 0) {
          setCurrentVideo(allVideos[0][0].videoUrl);
          setVideoTitle(allVideos[0][0].title);
        }

      } catch (err) {
        console.log(err);
      }
    };

    fetchVideos();
  }, [refreshVideos]);

  const handleNavigation = (path) => {
    navigate(path); // Navigate to the specified route
  };

  const handleThumbnailClick = (videoUrl, title) => {
    setCurrentVideo(videoUrl);
    setVideoTitle(title); // Update the title when thumbnail is clicked
    const videoInfo = {
      video: {
        title: title,
        url: videoUrl,
      }
    };
    dispatch(setVideo({ videoUrl: videoUrl, videoName: title }));
    handleNavigation(`/fullscreenvideo`);
    // console.log('navigated');
  };

  return (
    <div style={{ ...styles.container, minHeight: '500px', minWidth: '800px' }}>
     
      <div style={styles.videoGroups}>
      {videosByGroup['Spotlight Videos'] && (
          <VideoCarousel group="Spotlight Videos" videos={videosByGroup['Spotlight Videos']} handleThumbnailClick={handleThumbnailClick} />
        )
        }
        <br />
        {videoGroups
        .filter(group => group !== 'Spotlight Videos' && group !== 'Featured Videos') // Exclude specified groups
        .map(group => (
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

export default PublicVideos;
