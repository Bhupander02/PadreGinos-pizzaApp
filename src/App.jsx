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
              background: '#ffffff',
              color: '#2a2019',
              border: '1px solid #efe1cb',
            },
            success: {
              className: 'toast-success',
              iconTheme: {
                primary: '#2f9e52',
                secondary: '#fff',
              },
            },
            error: {
              className: 'toast-error',
              iconTheme: {
                primary: '#d6412c',
                secondary: '#fff',
              },
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
