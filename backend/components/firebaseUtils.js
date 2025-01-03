import fs from 'fs';
import { v4 } from 'uuid';
import ffmpeg from 'fluent-ffmpeg';
import { readFileSync } from "fs";
import { createRecord } from "./firebaseDB.js";
import { getRecentApprovedVideos, getRecentUserVideos } from "./approvedVideos.js";
import { title } from 'process';
import dotenv from 'dotenv';

const outputThmbnailPath = `${process.cwd()}/video/thumbnail${v4()}.jpg`;


dotenv.config(); // Load the environment variables from the .env file

const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT);

let outputVideoFile = '';

// Function to download file from Firebase Storage
export const downloadFile = async (filePath, destination, fileUrl, user, admin) => {
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
          console.log(`preparing to creae thumnail for user ${user} `);
          await createThumbnail(destination, fileUrl, user, admin); // Await the thumbnail creation
          resolve(); // Resolve the promise when thumbnail creation is complete
        } catch (error) {
          reject(error); // Reject the promise if thumbnail creation fails
        }
      })
      .pipe(destFileStream);
  });
};

export const createThumbnail = async (outputVideoPath, fileUrl, user, admin) => {    
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
                console.log(`preparing to upload thumbnail for user ${user}`);
                  await uploadThumbnail(outputThmbnailPath, fileUrl, user, admin); // Await the upload
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

  export const uploadThumbnail = async (thumbnailPath, fileUrl, user,admin) => {

    const bucket = admin.storage().bucket();
    const thumbnailPrefix = 'thumbnails/';
    const thumbnailSuffix = `thumbnails_${v4()}`;
    const thumbnailName = thumbnailPrefix + thumbnailSuffix;
      // Upload the processed file to storage
    await bucket.upload(thumbnailPath, {
      destination: thumbnailName,
      contentType: 'image/jpeg'

    });
    console.log(`preparing to save to database for user ${user}`);
    await saveToDatabase(fileUrl, generateThumbnailUrl(thumbnailSuffix), user, admin);

    // Delete the temporary files
    fs.unlinkSync(outputVideoFile);
    fs.unlinkSync(outputThmbnailPath);   
  };

  const generateThumbnailUrl =  (fileUrl) => {
    const thumbnailFileTemplate = "https://firebasestorage.googleapis.com/v0/b/watch-video-45073.firebasestorage.app/o/thumbnails%2FTOKEN?alt=media&token=d4cdedd4-1e4c-444a-a674-24610cc201ef";
    const thumbnailUrl = thumbnailFileTemplate.replace('TOKEN', fileUrl);
    return thumbnailUrl;
  }

  const saveToDatabase = async (videoUrl, thumbnail, user, admin) => {
    const videoPath = `videos/video_${v4()}`; // Define the path in the database
    const videoId = v4();
    const videoData = {
      id: videoId,
      videoUrl: videoUrl,
      title: `Video ${videoId}`,
      thumbnailUrl: thumbnail,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      createdBy:user.email,
      group:'Group A',
      approved: true  
    };    
    console.log(`preparing to save tocreate record for user ${user}`);
    await createRecord(admin, videoPath, videoData);
  }

  export const recordecentApprovedVideos = async (admin) => {
        return getRecentApprovedVideos(admin);
  }

  export const userVideos = async (admin, user) => {
    return getRecentUserVideos(admin, user);
}


