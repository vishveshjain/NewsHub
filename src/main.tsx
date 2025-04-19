import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

console.log('Starting application...');

const rootElement = document.getElementById('root');
console.log('Root element:', rootElement);

if (!rootElement) {
  console.error('Root element not found');
  document.body.innerHTML = `
    <div style="padding: 20px; max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <h1 style="color: #0066cc;">NewsHub Application</h1>
      <p>Error: Root element not found</p>
    </div>
  `;
} else {
  
  // Dynamically import App to catch any module-level errors
  import('./App.tsx')
    .then(module => {
      const App = module.default;
      console.log('App module loaded successfully');
      try {
        console.log('Creating root and rendering app...');
        const root = createRoot(rootElement);
        root.render(
          <StrictMode>
            <App />
          </StrictMode>
        );
        console.log('App rendered successfully');
      } catch (error: any) {
        console.error('Error rendering app:', error);
        rootElement.innerHTML = `
          <div style="padding: 20px; max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h1 style="color: #0066cc;">NewsHub Application</h1>
            <p>There was an error rendering the React application.</p>
            <p>Error: ${error?.message || 'Unknown error'}</p>
            <pre style="background-color: #f5f5f5; padding: 10px; border-radius: 4px; overflow: auto;">${error?.stack || ''}</pre>
          </div>
        `;
      }
    })
    .catch(error => {
      console.error('Error importing App module:', error);
      rootElement.innerHTML = `
        <div style="padding: 20px; max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h1 style="color: #0066cc;">NewsHub Application</h1>
          <p>There was an error loading the application module.</p>
          <p>Error: ${error?.message || 'Unknown error'}</p>
          <pre style="background-color: #f5f5f5; padding: 10px; border-radius: 4px; overflow: auto;">${error?.stack || ''}</pre>
        </div>
      `;
    });
}
