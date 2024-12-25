import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import { AuthProvider } from './components/AuthContext';

const App = () => {
  return (
    <div>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    
    </div>
  )
}

export default App