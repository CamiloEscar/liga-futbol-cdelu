import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { LeagueProvider } from './context/LeagueContext.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LeagueProvider>
        <App />
      </LeagueProvider>
    </BrowserRouter>
  </StrictMode>
);