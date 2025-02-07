import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, styled } from '@mui/material';
import { useState, useEffect } from 'react';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector


// Styled AppBar to match RootContainer's background
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'rgba(12, 1, 1, 0.9)', // Match the RootContainer background
  '& .MuiButton-root': {
    color: 'white',
    '&:hover': {
      color: 'yellow', // Change color to yellow on hover
    },
  },
}));

const NavigationBar = () => {
  const user = useSelector((state) => state.auth.user); // Get user info from Redux store{{
  const role = useSelector((state) => state.auth.role );
  const isAdminUser  = role === "admin";

  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();


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
    <StyledAppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        {user  && (
          <Button color="inherit" onClick={() => handleNavigation('/animations')}>
           Animations
          </Button>
        )}
         {user  && (
          <Button color="inherit" onClick={() => handleNavigation('/moviesandtv')}>
           Movies  & TV
          </Button>
        )}
         {user  && (
          <Button color="inherit" onClick={() => handleNavigation('/emmywinners')}>
           SX Emmy Winners
          </Button>
        )}
          {user  && (
          <Button color="inherit" onClick={() => handleNavigation('/emmynominated')}>
           16X Emmy Nominated
          </Button>
        )}
          {user  && (
          <Button color="inherit" onClick={() => handleNavigation('/musicvideos')}>
           Music Videos
          </Button>
        )}
          {user  && (
          <Button color="inherit" onClick={() => handleNavigation('/About')}>
           Music Videos
          </Button>
        )}
        {user && isAdminUser && (
          <Button color="inherit" onClick={() => handleNavigation('/myvideos')}>
            My Videos
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
    </StyledAppBar>
  );
};

export default NavigationBar;
