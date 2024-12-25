import React from 'react';
import { useAuth } from './AuthContext';
import { auth } from './firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export const FirebaseGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    const { login } = useAuth();

    const handleLogin = async () => {
        // Simulate Google login and fetch user data
        const userData = await signInWithPopup(auth, provider);
        login(userData);
    };

    return (
        <button onClick={handleLogin}>Login with Google</button>
    );
};

