import express from "express";
import cors from  "cors";
import videoRoutes from "./Routes/videoRoutes.js";

const filePath = 'videos/Screen_Recording_20241211_115130_WatchClubTV.mp484bd0119-a983-4354-b91a-fc7400095718';
const app = express();
app.use (cors());

app.use('/api/videos', videoRoutes);

app.listen(5000, () => {            
  console.log("Server started on port 5000");        
});     

