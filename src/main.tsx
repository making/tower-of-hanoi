import React from 'react';
import ReactDOM from 'react-dom/client';
import '/index.css'; // Tailwind base+components+utilities
import TowerOfHanoi from './TowerOfHanoi';

// Render the main Hanoi component into #root
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TowerOfHanoi />
  </React.StrictMode>
);