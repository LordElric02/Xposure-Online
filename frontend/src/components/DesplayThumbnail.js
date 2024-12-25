import React from 'react';
// @ts-ignore
import VideoThumbnail from 'react-video-thumbnail';

const VideoThumbnailExample = () => {
  const videoUrl = 'https://firebasestorage.googleapis.com/v0/b/watch-video-45073.firebasestorage.app/o/random-videos%2Fvideo_02.mp4?alt=media&token=345b5a45-8070-4948-8c7d-1486f57ad5d7'; // Replace with your video URL

  return (
    <div>
      <h1>Video Thumbnail Example</h1>
      <VideoThumbnail
        videoUrl={videoUrl}
        thumbnailHandler={(thumbnail) => {
          console.log('Thumbnail URL:', thumbnail);
        }}
        width={300} // Adjust the width as needed
        height={200} // Adjust the height as needed
      />
    </div>
  );
};

export default VideoThumbnailExample;
