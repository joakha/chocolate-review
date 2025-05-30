import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UserProvider } from './context/UserProvider.tsx'
import { FindProvider } from './context/FindProvider.tsx'

//disable query retries
const reactQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0
    }
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={reactQueryClient}>
        <UserProvider>
          <FindProvider>
            <App />
          </FindProvider>
        </UserProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
