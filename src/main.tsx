import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// Test simple pour diagnostiquer
function TestApp() {
  return (
    <div style={{padding: '20px', backgroundColor: 'lightblue'}}>
      <h1>TEST - Si vous voyez ceci, React fonctionne!</h1>
      <p>Date: {new Date().toLocaleString()}</p>
    </div>
  );
}

console.log('main.tsx: Tentative de rendu...');
const rootElement = document.getElementById("root");
console.log('main.tsx: Element root trouvé:', rootElement);

if (rootElement) {
  const root = createRoot(rootElement);
  console.log('main.tsx: Root créé, tentative de rendu...');
  root.render(<TestApp />);
  console.log('main.tsx: Rendu terminé');
} else {
  console.error('main.tsx: Element root non trouvé!');
}
