import { title } from "process";

// Function to get videos
export const getRecentApprovedVideos = async (admin) => {
    const db = admin.database();  
    try {
        const videosRef = db.ref('videos'); // Assuming your videos are stored under 'videos'
        const snapshot = await videosRef.once('value');
        
        const currentTime = Date.now();
        const oneMonthAgo = currentTime - (30 * 24 * 60 * 60 * 1000); // One month in milliseconds

        const videos = [];
        
        snapshot.forEach((childSnapshot) => {
        const video = childSnapshot.val();
        const createdAt = new Date(video.CreatedAt).getTime(); // Ensure CreatedAt is a timestamp

        if (video.approved === true) {
            videos.push({
            id: childSnapshot.key,
            thumbnailUrl: video.thumbnailUrl,
            videoUrl: video.videoUrl,
            title: video.title,
            thumbnail: video.thumbnail
            });
        }
        });

        return videos;
    } catch (error) {
        console.error('Error fetching videos:', error);
    }
};


