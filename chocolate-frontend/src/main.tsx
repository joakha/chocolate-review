import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import AuthenticationProvider from './context/AuthenticationProvider.tsx'
import TypeProvider from './context/TypeProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthenticationProvider>
      <TypeProvider>
        <BrowserRouter>
          <App />
        </ BrowserRouter>
      </TypeProvider>
    </AuthenticationProvider>
  </StrictMode>,
)
