import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';



const NavigationBar = () => {
      const [user, setUser] = useState(null);
      const [anchorEl, setAnchorEl] = React.useState(null);
      const navigate = useNavigate();
    
       useEffect(() => {
          const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
          });
      
          return () => unsubscribe();
        }, []);
    
      const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
    
    
      const handleNavigation = (path) => {
        handleClose(); // Close the menu
        navigate(path); // Navigate to the specified route
      };
    
    
      const handleMenuClose = () => {
        setAnchorEl(null);
      };
    
  return (
    <AppBar position="static">
      <Toolbar>
        {/* Directly using Button components without ToolbarGroup */}
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        {user && (
        <Button color="inherit" onClick={() => handleNavigation('/myvideos')}>
          My Videos
        </Button>
            )}
        {user && (
               <Button color="inherit" component={Link} to="/myaccount">
               Profile
             </Button>
        )}
          {user ? (
                 <Button color="inherit" component={Link} to="/login">
                 Logout
               </Button>
     ) : (
        <Button color="inherit" component={Link} to="/login">
               Login
             </Button>
     )}
     
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
