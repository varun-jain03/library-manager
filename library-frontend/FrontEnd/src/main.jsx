import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CombinedProvider } from './contexts/indexContext.jsx';

createRoot(document.getElementById('root')).render(
  <CombinedProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </CombinedProvider>
)
