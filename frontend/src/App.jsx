import React from 'react';
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