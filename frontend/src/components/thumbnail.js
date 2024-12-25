
import React, { useState } from 'react';
import VideoThumbnail from 'react-video-thumbnail';

function VideoThumbnailGenerator() {
    const [thumbnail, setThumbnail] = useState(null);
  
    const handleVideoUpload = (event) => {
        alert('trying to upload');   
      const file = event.target.files[0];
      if(file){
      
        console.log(`file: ${file}`); 
        const reader = new FileReader();
    
        reader.onloadend  = (e) => {
            console.log(`e.target.result: ${e.target.result}`); // base64 encoded string (data:video/mp4;base64,xxxxx    ) console.log(e.target.result);
            
            setThumbnail(e.target.result);
        };
    
        reader.readAsDataURL(file);
    }
    };
  
    return (
      <div>
        <input type="file" accept="video/*" onChange={handleVideoUpload} />
        <br></br>
        {thumbnail && (
          <VideoThumbnail
            videoUrl={thumbnail}
            snapshotAtTime={1} // Time in seconds to take the thumbnail
            width={200}
            height={150}
          />
        )}
      </div>
    );
  }
  
  export default VideoThumbnailGenerator;