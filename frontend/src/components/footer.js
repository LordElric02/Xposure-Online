// src/components/Footer.js
import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

const StyledFooter = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(12, 1, 1, 0.9)', 
  color: 'white',
  padding: theme.spacing(2),
  textAlign: 'center',
  position: 'relative',
  bottom: 0,
  width: '100%',
}));

const Footer = () => {
  return (
    <StyledFooter>
      <Typography variant="body2">
        © {new Date().getFullYear()} My Website. All rights reserved.
      </Typography>
      <Typography variant="body2">
        <a href="/privacy-policy" style={{ color: 'white', textDecoration: 'none' }}>
          Privacy Policy
        </a>{' '}
        |{' '}
        <a href="/terms-of-service" style={{ color: 'white', textDecoration: 'none' }}>
          Terms of Service
        </a>
      </Typography>
    </StyledFooter>
  );
};

export default Footer;
