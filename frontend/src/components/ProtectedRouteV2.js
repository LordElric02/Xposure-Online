import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext.js';



const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { user } = useAuth();
    return (
        <Route
        {...rest}
        element={
            user ? (
            <Component />
            ) : (
            <Navigate to="/login" />
            )
        }
        />
    );
};

export default ProtectedRoute;
