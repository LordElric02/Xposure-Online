// src/components/Layout.js
import React from 'react';
import { RootContainer } from './styledaApi';
import NavigationBar from './NavLinks';



const Layout = ({ children }) => {
  return (
    <RootContainer>
      <NavigationBar />
      <main>{children}</main>
    </RootContainer>
  );
};

export default Layout;
