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
            thumbnail: video.thumbnail,
            group: video.group
            });
        }
        });

        return videos;
    } catch (error) {
        console.error('Error fetching videos:', error);
    }
};


export const getRecentUserVideos = async (admin, email) => {
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

        if (video.createdBy === email) {
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

export const getVideosByGroup = async (admin, group) => {
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

            if (video.approved === true && video.group === group) {
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

export const getVideosByGroupByUser = async (admin, email,group) => {
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

            console.log(`video.tittle: ${video.title} video group: ${video.group} email: ${email} `);
            if (video.createdBy === email && video.group === group) {
                videos.push({
                id: childSnapshot.key,
                thumbnailUrl: video.thumbnailUrl,
                videoUrl: video.videoUrl,
                title: video.title
                });
            }
        });

        return videos;
    } catch (error) {
        console.error('Error fetching videos:', error);
    }
};


export const getVideoGroups = async (admin, email,role) => {
    const db = admin.database();  
    try {
        const groups = [];
     
        groups.push({
        id: 1,
        group: 'Emmy Winners'
        });

        groups.push({
        id: 2,
        group: 'Animations'
        });

        groups.push({
        id: 3,
        group: 'Games'
        });

        groups.push({
            id: 4,
            group: 'Community'
            });

        groups.push({
            id: 5,
            group: 'Educational'
            });

        groups.push({
        id: 6,
        group: 'Other'
        });

        //if(role === 'admin') {
            groups.push({
                id: 7,
                group: 'Spotlight Videos'
                });
            groups.push({
                id: 7,
                group: 'Featured Videos'
                });
        //};

        return groups;
    } catch (error) {
        console.error('Error fetching video groups:', error);
    }
};


