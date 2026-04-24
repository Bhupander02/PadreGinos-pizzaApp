import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './style.css';
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { routeTree } from './routeTree.gen';
import { Toaster } from 'react-hot-toast';

const router = createRouter({ routeTree });
const queryClient = new QueryClient();

const App = () => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1a1a2e',
              color: '#fff',
            },
            success: {
              className: 'toast-success',
              iconTheme: {
                primary: '#4ecdc4',
                secondary: '#fff',
              },
            },
            error: {
              className: 'toast-error',
            },
          }}
        />
      </QueryClientProvider>
    </StrictMode>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
