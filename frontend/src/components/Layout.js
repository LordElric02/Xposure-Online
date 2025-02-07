// src/components/Layout.js
import React from 'react';
import { RootContainer } from './styledaApi';
import NavigationBar from './NavLinks';
import Footer from './footer';


const Layout = ({ children }) => {
  return (
    <RootContainer>
      <NavigationBar />
      <main>{children}</main>
      <Footer /> {/* Include the Footer here */}
    </RootContainer>
  );
};

export default Layout;
