import Router from 'express';
import { v4 } from 'uuid';
import { downloadFile, recordecentApprovedVideos } from '../components/firebaseUtils.js';
//import verifyToken   from '../middlewares/auth.js';

const router = Router();
// Middleware to verify token
// router.use(verifyToken);

router.get('/GenerateThumbnail', async (req, res) => {
      try {
        const filePath = req.query.filebaseName; 
        const fileUrl = req.query.fileUrl;
    
        const outputVideoPath = `${process.cwd()}/Video/firebasevideo${v4()}.mp4`;
        
        // Download video
        await downloadFile(filePath, outputVideoPath, fileUrl); // Wait for the downloadFile to complete
    
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
    
router.get('/', async (req, res) => {
      
      // Set the Content-Type header to application/json
      res.setHeader('Content-Type', 'application/json');
      const videos = await recordecentApprovedVideos();
      const jsonvideos =JSON.stringify(videos);

      res.json(jsonvideos);
      
})


export default router;
