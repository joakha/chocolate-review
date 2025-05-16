import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UserProvider } from './context/UserProvider.tsx'

//disable query retries
const reactQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0
    }
  },
  queryCache: new QueryCache({
    onError: (error) => {
      
    }
  })
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={reactQueryClient}>
        <UserProvider>
          <App />
        </UserProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
