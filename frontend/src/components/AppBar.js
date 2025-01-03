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

const MyAppBar = () => {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
      });
  
      return () => unsubscribe();
    }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
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
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
          <MenuItem onClick={handleMenuClose}>Animations</MenuItem>
          {user && <MenuItem onClick={handleMenuClose}>Manage Printint services</MenuItem>}
          <MenuItem onClick={handleMenuClose}>Games</MenuItem>
          <MenuItem onClick={handleMenuClose}>
              Movie & TV
              <Menu>
                <MenuItem onClick={handleMenuClose}>Movies</MenuItem>
                <MenuItem onClick={handleMenuClose}>V Series</MenuItem>
                <MenuItem onClick={handleMenuClose}>Video on demand</MenuItem>
              </Menu>
           </MenuItem>
          <MenuItem onClick={handleMenuClose}>Music</MenuItem>
          <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;
