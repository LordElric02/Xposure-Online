import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { v4 } from 'uuid';

const VideoCarousel = () => {
  const [videoArray , setVideoArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modifiedVideos, setModifiedVideos] = useState([
    { videoUrl: ' ', thumbnailUrl: ' ', title: ' ', id: v4() },   
  ]);
  

  useEffect(() => {
    setLoading(true);
    const source = axios.CancelToken.source();
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/videos');
        const tempArray = JSON.parse(response.data);
        setVideoArray(tempArray);
        //console.log(response.data);
        videoArray.map((video) => {
            const { videoUrl, thumbnailUrl, title } = video;
            setModifiedVideos((prev) => [...prev,  { videoUrl, thumbnailUrl,title }]); 
     
        });

 
      } catch (err) {   
        setError(err);
      } finally {
        console.log('finallyx');
        console.log(modifiedVideos);
        videoArray.map((video) => {
          const { videoUrl, thumbnailUrl, title } = video;
          setModifiedVideos((prev) => [...prev,  { videoUrl, thumbnailUrl,title }]); 
   
      });
        setLoading(false);
      }
    };

    fetchVideos();

    
    return () => {
      source.cancel('Component unmounted, request canceled');
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading videos: {error.message}</div>;

  return (
    <div className="video-carousel">
      <h2>Video Carousel</h2>
      <Slider {...settings}>
        {modifiedVideos.map((video) => (
       <div key={v4()}>Title:{video.id}</div>
        ))}
      </Slider>
    </div>
  );
};

export default VideoCarousel;
