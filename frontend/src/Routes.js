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
import MyAccount from './components/MyAccount';
import Animations from './components/Animations';
import PrintingServices from './components/PrintingServices';
import HomeVideos from './components/HomeVideos';
import FullScreenVideo from './components/FullScreenVideo';
import MoviesAndTv  from './components/MoviesAndTv';
import EmmyWinners from './components/EmmyWinners';
import EmmyNominated from './components/EmmyNominated';
import MusicVideos from './components/MusicVideos';



const MyRoutes = () => {
  return (
   <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<HomeVideos />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/myvideos" element={<MyVideos /> } /> 
        <Route path="/myaccount" element={<MyAccount  /> } /> 
        <Route path="/animations" element={<Animations  /> } /> 
        <Route path="/moviesandtv" element={<MoviesAndTv  /> } /> 
        <Route path="/emmywinners" element={<EmmyWinners  /> } /> 
        <Route path="/emmynominated" element={<EmmyNominated  /> } /> 
        <Route path="/musicvideos" element={<MusicVideos  /> } /> 
        <Route path="/login" element={<Auth  /> } /> 
        <Route path="/printingservices" element={<PrintingServices  /> } /> 
        <Route path="/fullscreenvideo" element={<FullScreenVideo />} />
        <Route path="/About" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
    </Router> 
  );
};

export default MyRoutes;
