import  admin  from 'firebase-admin';
import fs from 'fs';
import { v4 } from 'uuid';
import ffmpeg from 'fluent-ffmpeg';
// import serviceAccount  from "../Data/serviceAccountKey.json"  assert { type: 'json' };
import { readFileSync } from "fs";
const serviceAccount = JSON.parse(readFileSync("./Data/clscountKey.json"));
import { createRecord } from "./firebaseDB.js";
import { getRecentApprovedVideos } from "./approvedVideos.js";
import { title } from 'process';

const outputThmbnailPath = `${process.cwd()}/video/thumbnail${v4()}.jpg`;
let outputVideoFile = '';

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'watch-video-45073.firebasestorage.app',
  databaseURL: 'https://watch-video-45073-default-rtdb.firebaseio.com'
});

// Function to download file from Firebase Storage
export const downloadFile = async (filePath, destination, fileUrl) => {
  outputVideoFile = destination;
  const bucket = admin.storage().bucket();
  const file = bucket.file(filePath);

  return new Promise((resolve, reject) => {
    const destFileStream = fs.createWriteStream(destination);

    file.createReadStream()
      .on('error', (err) => {
        console.error('Error downloading file:', err);
        reject(err); // Reject the promise on error
      })
      .on('end', async () => {
        try {
          await createThumbnail(destination, fileUrl); // Await the thumbnail creation
          resolve(); // Resolve the promise when thumbnail creation is complete
        } catch (error) {
          reject(error); // Reject the promise if thumbnail creation fails
        }
      })
      .pipe(destFileStream);
  });
};

export const createThumbnail = async (outputVideoPath, fileUrl) => {    
  const bucket = admin.storage().bucket();
  const thumbnailTime = 5;

  // Process the file with FFmpeg
  await new Promise((resolve, reject) => {
      ffmpeg(outputVideoPath)
          .seekInput(thumbnailTime)
          .frames(1)
          .size("300x300")
          .output(outputThmbnailPath)
          .on("end", async () => {
              try {
                  await uploadThumbnail(outputThmbnailPath, fileUrl); // Await the upload
                  resolve(); // Resolve the promise after upload is complete
              } catch (error) {
                  reject(error); // Reject the promise if upload fails
              }
          })
          .on("error", (err) => {
              console.error('Error processing video:', err);
              reject(err); // Reject if FFmpeg encounters an error
          })
          .run();
  });

  return {
      success: true,
  };
}

  export const uploadThumbnail = async (thumbnailPath, fileUrl) => {

    const bucket = admin.storage().bucket();
    const thumbnailPrefix = 'thumbnails/';
    const thumbnailSuffix = `thumbnails_${v4()}`;
    const thumbnailName = thumbnailPrefix + thumbnailSuffix;
      // Upload the processed file to storage
    await bucket.upload(thumbnailPath, {
      destination: thumbnailName,
      contentType: 'image/jpeg'

    });
    
    await saveToDatabase(fileUrl, generateThumbnailUrl(thumbnailSuffix));

    // Delete the temporary files
    fs.unlinkSync(outputVideoFile);
    fs.unlinkSync(outputThmbnailPath);   
  };

  const generateThumbnailUrl =  (fileUrl) => {
    const thumbnailFileTemplate = "https://firebasestorage.googleapis.com/v0/b/watch-video-45073.firebasestorage.app/o/thumbnails%2FTOKEN?alt=media&token=d4cdedd4-1e4c-444a-a674-24610cc201ef";
    const thumbnailUrl = thumbnailFileTemplate.replace('TOKEN', fileUrl);
    return thumbnailUrl;
  }

  const saveToDatabase = async (videoUrl, thumbnail) => {
    const videoPath = `videos/video_${v4()}`; // Define the path in the database
    const videoId = v4();
    const videoData = {
      id: videoId,
      videoUrl: videoUrl,
      title: `Video ${videoId}`,
      thumbnailUrl: thumbnail,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      createdBy:'system',
      group:'Group A',
      approved: true  
    };    
    await createRecord(admin, videoPath, videoData);
  }

  export const recordecentApprovedVideos = async () => {
        return getRecentApprovedVideos(admin);
  }

