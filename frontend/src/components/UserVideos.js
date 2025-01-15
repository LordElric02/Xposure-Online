import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import VideoPlayer from './PlayVideo'; // Import the new VideoPlayer component
import VideoGroupGallery from './VideoGroupGallery'; // Import the new VideoGroupGallery component

const UserVideos = ({ refreshVideos, user }) => {
  const [videoGroups, setVideoGroups] = useState([]);
  const [videosByGroup, setVideosByGroup] = useState({});
  const [currentVideo, setCurrentVideo] = useState(null);
  const [videoTitle, setVideoTitle] = useState('');

  useEffect(() => {
    const fetchVideos = async () => {
      const vgroups = ['Emmy Winners', 'Animations', 'Games', 'Community', 'Educational'];
      setVideoGroups(vgroups);

      const usertoken = user.stsTokenManager.accessToken;

      try {
        const videoFetchPromises = vgroups.map(async (group) => {
          const thumbnailEndpoint = `http://localhost:5000/api/videos/uservideosByGroup?email=${user.email}&group=${group}`;
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
  }, [refreshVideos, user]);

  const handleThumbnailClick = (videoUrl, title) => {
    setCurrentVideo(videoUrl);
    setVideoTitle(title); // Update the title when thumbnail is clicked
  };

  return (
    <div>
      <VideoPlayer currentVideo={currentVideo} videoTitle={videoTitle} />
      {videoGroups.map(group => (
        <VideoGroupGallery 
          key={group} 
          group={group} 
          videos={videosByGroup[group] || []} 
          handleThumbnailClick={handleThumbnailClick} 
        />
      ))}
    </div>
  );
}

export default UserVideos;
