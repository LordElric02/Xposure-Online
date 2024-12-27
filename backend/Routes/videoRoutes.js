import Router from 'express';
import { v4 } from 'uuid';
import admin from 'firebase-admin';
import { downloadFile, recordecentApprovedVideos, userVideos } from '../components/firebaseUtils.js';
import verifyToken from '../middlewares/auth.js';
import dotenv from 'dotenv';

dotenv.config(); // Load the environment variables from the .env file
const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT);
// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'watch-video-45073.firebasestorage.app',
  databaseURL: 'https://watch-video-45073-default-rtdb.firebaseio.com'
});

const router = Router();

// This route allows anonymous access
router.get('/', async (req, res) => {
  // Set the Content-Type header to application/json
  res.setHeader('Content-Type', 'application/json');
  const videos = await recordecentApprovedVideos(admin);
  const jsonvideos = JSON.stringify(videos);

  res.json(jsonvideos);
});

// Middleware to verify token
router.use(async (req, res, next) => {
  try {
    await verifyToken(req, res, admin, next);
  } catch (error) {
    res.status(401).json({ success: false, message: 'Unauthorized' });
  }
});


router.post('/GenerateThumbnail', async (req, res) => {
  try {
    const filePath = req.query.filebaseName; 
    const fileUrl = req.query.fileUrl;

    const outputVideoPath = `${process.cwd()}/Video/firebasevideo${v4()}.mp4`;

    console.log(`begining download for: ${req.user}`);
    // Download video
    await downloadFile(filePath, outputVideoPath, fileUrl, req.user, admin); // Wait for the downloadFile to complete

    // Here you could add additional processing for generating the thumbnail if needed

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error('Error generating thumbnail:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating thumbnail',
    });
  }
});

router.get('/uservideos', async (req, res) => {
  const emsil = req.query.email; 
  // Set the Content-Type header to application/json
  res.setHeader('Content-Type', 'application/json');
  const videos = await userVideos(admin, emsil);
  const jsonvideos = JSON.stringify(videos);

  res.json(jsonvideos);
});

export default router;