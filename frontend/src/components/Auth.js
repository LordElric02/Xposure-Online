import React, { useState, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { Button, TextField, Typography, Container } from '@mui/material';
import { auth } from './firebase';
import { useAuth} from './AuthContext';

export const Auth = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const provider = new GoogleAuthProvider();
   const { login } = useAuth();

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
        const userData = await signInWithPopup(auth, provider);
        login(userData);
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error("Error during sign-up:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  return (
    <Container>
      {user ? (
        <div>
          <Typography variant="h6">Welcome, {user.displayName || user.email}</Typography>
          <Button variant="contained" color="secondary" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      ) : (
        <div>
          <Typography variant="h6">Sign In / Sign Up</Typography>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleSignUp}>
            Sign Up
          </Button>
          <Button variant="contained" color="secondary" onClick={handleGoogleSignIn}>
            Sign In with Google
          </Button>
        </div>
      )}
    </Container>
  );
};
