import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const verifyToken = async (req, res,admin, next) => {
    dotenv.config(); // Load the environment variables from the .env file
    // Initialize Firebase Admin SDK
      const usertoken = req.body.usertoken; // Get the Firebase ID token from the request body
    if (!usertoken) return res.status(401).json({ message: 'Unauthorized' });

    // Verify the ID token
    const decodedToken = await admin.auth().verifyIdToken(usertoken);

    // Attach the decoded token to the request object
    if (!decodedToken) return res.status(403).json({ message: 'Invalid token' });
   
    // You can optionally fetch additional user information from Firebase
    const user = await admin.auth().getUser(decodedToken.uid);
    req.user = user;

    const payload = {
      username: user.displayName || user.email, // Use displayName if available
      email: user.email
    };
    next();
};

export default verifyToken ;
