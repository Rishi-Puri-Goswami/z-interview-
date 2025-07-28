import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {GoogleOAuthProvider} from"@react-oauth/google"


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <GoogleOAuthProvider clientId="54258098139-rt2nauf0ek5348fp752sdjb52spcihig.apps.googleusercontent.com" >
    <App />
    </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>
)
