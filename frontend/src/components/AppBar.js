import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';

const MyAppBar = () => {
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
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuClick}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Xpososure Online
        </Typography>
        <IconButton color="inherit">
          <NotificationsIcon />
        </IconButton>
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleMenuClick}
        >
          <AccountCircle />
        </IconButton>
        <Menu
     anchorEl={anchorEl}
     open={Boolean(anchorEl)}
     onClose={handleMenuClose}
   >
      <MenuItem onClick={() => handleNavigation('/')}>
         Home
       </MenuItem>
       <MenuItem onClick={() => handleNavigation('/animations')}>
         Animations
       </MenuItem>
     {user && 
         <MenuItem onClick={() => handleNavigation('/printingservices')}>
         Printing Servides
       </MenuItem>
      }
     {user && (
       <MenuItem onClick={() => handleNavigation('/myvideos')}>
         My Videos
       </MenuItem>
     )}
     <MenuItem onClick={handleMenuClose}>Games</MenuItem>
     <MenuItem onClick={handleMenuClose}>Music</MenuItem>
     {user && (
       <MenuItem onClick={() => handleNavigation('/myaccount')}>
         My Account
       </MenuItem>
     )}
     {user ? (
       <MenuItem onClick={() => handleNavigation('/login')}>Logout</MenuItem>
     ) : (
       <MenuItem onClick={() => handleNavigation('/login')}>Login</MenuItem>
     )}
    </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;
