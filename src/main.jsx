import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'

// Find the empty <div id="root"> in index.html and draw our app inside it.
// StrictMode only runs in development and warns us about common mistakes.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
