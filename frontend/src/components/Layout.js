// src/components/Layout.js
import React from 'react';
import AppBar from './AppBar'; // Your AppBar component
import { RootContainer } from './styledaApi';


const Layout = ({ children }) => {
  return (
    <RootContainer>
      <AppBar />
      <main>{children}</main>
    </RootContainer>
  );
};

export default Layout;
