// src/Routes.js
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Home from './components/Home';
import { Auth} from './components/Auth'
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRouteV2';
import About from './components/About';
import Layout from './components/Layout';
import MyVideos from './components/MyVideos';


const MyRoutes = () => {
  return (
   <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/myvideos" element={MyVideos} /> 
        <Route path="/About" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
    </Router> 
  );
};

export default MyRoutes;
