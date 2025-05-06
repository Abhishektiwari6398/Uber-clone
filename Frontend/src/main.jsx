import { createRoot } from 'react-dom/client';
import './index.css';
import './App.css'
import React from 'react';

import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import UserContext from './context/userContext.jsx';
import CaptainContext from './context/captainContext.jsx';
import SocketProvider from './context/SocketContext.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SocketProvider>
      <CaptainContext>
        <UserContext>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UserContext>
      </CaptainContext>
    </SocketProvider>
  </React.StrictMode>
);