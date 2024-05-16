import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from "react-dom/client";
import App from './App';
import Register from './pages/Register';
import reportWebVitals from './reportWebVitals';
import "./style.scss";
import { AuthContextProvider } from './context/AuthContext';
import { ChatContextProvider } from './context/chatContext';


const root = createRoot(document.getElementById('root'));
root.render(

  <AuthContextProvider>
    <ChatContextProvider>

     <React.StrictMode>
        <App />
      </React.StrictMode>

    </ChatContextProvider>
  </AuthContextProvider>
  
  
 
);

reportWebVitals();
