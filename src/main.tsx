import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import App from './App.tsx'
import './vendor/normalize.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
