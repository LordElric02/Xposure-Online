import fs from 'fs';
import { v4 } from 'uuid';
import ffmpeg from 'fluent-ffmpeg';
import { readFileSync } from "fs";
import { createRecord } from "./firebaseDB.js";
import { getRecentApprovedVideos, getRecentUserVideos, getVideoGroups,getVideosByGroup, getVideosByGroupByUser } from "./approvedVideos.js";

const outputThumbnailPath = `${process.cwd()}/video/thumbnail${v4()}.jpg`;

let outputVideoFile = '';


// Function to download file from Firebase Storage
export const downloadFile = async (filePath, destination, fileUrl, user, videoTitle, videoGroup, thumbnail, admin) => {
  const bucket = admin.storage().bucket();
  const file = bucket.file(filePath);
  console.log(`A`);
  console.log(`videoTitle: ${videoTitle}`);
  console.log(`videoGroup: ${videoGroup}`);

  return new Promise((resolve, reject) => {
    if (thumbnail) {
      // If thumbnail is not null, write the contents of thumbnail to outputThumbnailPath
      const thumbnailStream = fs.createWriteStream(outputThumbnailPath);
      thumbnailStream.on('error', (err) => {
        console.error('Error writing thumbnail:', err);
        reject(err); // Reject the promise on error
      });

      // Write thumbnail content to file
      thumbnailStream.write(thumbnail, async (err) => {
        if (err) {
          reject(err); // Reject if there's an error writing the thumbnail
        } else {
          console.log(`Thumbnail written to: ${outputThumbnailPath}`);
          thumbnailStream.end(); // End the stream after writing
        }
      });

      thumbnailStream.on('finish', async () => {
        try {
          // Call uploadThumbnail after the thumbnail stream ends
          await uploadThumbnail(outputThumbnailPath, fileUrl, user, videoTitle, videoGroup, admin);
          resolve(); // Resolve the promise after uploading the thumbnail
        } catch (error) {
          reject(error); // Reject if there's an error in uploading the thumbnail
        }
      });
      
    } else {
      // Only execute this block if thumbnail is null
      const destFileStream = fs.createWriteStream(destination);

      file.createReadStream()
        .on('error', (err) => {
          console.error('Error downloading file:', err);
          reject(err); // Reject the promise on error
        })
        .on('end', async () => {
          try {
            console.log(`Preparing to create thumbnail for user ${user}`);
            await createThumbnail(destination, fileUrl, user, videoTitle, videoGroup, admin); // Await the thumbnail creation
            fs.unlinkSync(outputVideoFile);
            resolve(); // Resolve the promise when thumbnail creation is complete
          } catch (error) {
            reject(error); // Reject the promise if thumbnail creation fails
          }
        })
        .pipe(destFileStream);
    }
  });
};

export const createThumbnail = async (outputVideoPath, fileUrl, user,videoTitle,videoGroup, admin) => {    
  const bucket = admin.storage().bucket();
  const thumbnailTime = 5;

  console.log(`B`);
  console.log(`videoTitle: ${videoTitle}`);
  console.log(`videoGroup: ${videoGroup}`);

  // Process the file with FFmpeg
  await new Promise((resolve, reject) => {
      ffmpeg(outputVideoPath)
          .seekInput(thumbnailTime)
          .frames(1)
          .size("300x300")
          .output(outputThumbnailPath)
          .on("end", async () => {
              try {
                console.log(`preparing to upload thumbnail for user ${user}`);
                  await uploadThumbnail(outputThumbnailPath, fileUrl, user,videoTitle,videoGroup,  admin); // Await the upload
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

  export const uploadThumbnail = async (thumbnailPath, fileUrl, user,videoTitle,videoGroup, admin) => {
    console.log(`C`);
    console.log(`videoTitle: ${videoTitle}`);
    console.log(`videoGroup: ${videoGroup}`);
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
    await saveToDatabase(fileUrl, generateThumbnailUrl(thumbnailSuffix), user,videoTitle,videoGroup, admin);

    // Delete the temporary files
     fs.unlinkSync(outputThumbnailPath);   
  };

  const generateThumbnailUrl =  (fileUrl) => {
    const thumbnailFileTemplate = "https://firebasestorage.googleapis.com/v0/b/watch-video-45073.firebasestorage.app/o/thumbnails%2FTOKEN?alt=media&token=d4cdedd4-1e4c-444a-a674-24610cc201ef";
    const thumbnailUrl = thumbnailFileTemplate.replace('TOKEN', fileUrl);
    return thumbnailUrl;
  }

  const saveToDatabase = async (videoUrl, thumbnail, user, videoTitle,videoGroup, admin) => {
    const videoPath = `videos/${v4()}`; // Define the path in the database
    console.log(`D`);
    console.log(`videoTitle: ${videoTitle}`);
    console.log(`videoGroup: ${videoGroup}`);

    const videoId = v4();
    const videoData = {
      id: videoId,
      videoUrl: videoUrl,
      title: videoTitle,
      thumbnailUrl: thumbnail,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      createdBy:user.email,
      group: videoGroup,
      approved: false  
    };    
    console.log(`preparing to save tocreate record for user ${user}`);
    await createRecord(admin, videoPath, videoData);
  }

  export const recordecentApprovedVideos = async (admin) => {
        return getRecentApprovedVideos(admin);
  }

  export const userVideos = async (admin, email) => {
    return getRecentUserVideos(admin, email);
  }

  export const groupVideosByUser = async (admin, email,group) => {
    return getVideosByGroupByUser(admin, email,group);
  }

  export const groupVideos = async (admin, group) => {
    return getVideosByGroup(admin, group);
  }

  export const groupList = async (admin, email) => {
    return getVideoGroups(admin, email);
  }


