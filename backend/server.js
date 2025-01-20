import express from "express";
import path from "path";
import cors from  "cors";
import videoRoutes from "./Routes/videoRoutes.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = 'videos/Screen_Recording_20241211_115130_WatchClubTV.mp484bd0119-a983-4354-b91a-fc7400095718';
const app = express();
app.use (cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '10mb' })); // Adjust limit as
//  needed

app.use('/api/videos', videoRoutes);

// The "catchall" handler: for any request that doesn't
// match one above, send back the React app.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
