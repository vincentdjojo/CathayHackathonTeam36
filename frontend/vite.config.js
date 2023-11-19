import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

/* proxy option allows you to redirect HTTP requests to a different server, which can be useful in a number of scenarios, 
such as when you need to access data from an API that is hosted on a different domain. 
Vite uses the "http-proxy" library under the hood. */

// server start on port 3000 and proxy all requests to /api to port 5000
export default defineConfig({
  base: '',
  server: {
    // proxy to determine which port to communicate w/ the backend.
    proxy: {
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
        },
        
    },
    // to serve on the 3000 port  
    host: '0.0.0.0',
    port: 3000,

    // enables HMR in App.jsx
    watch: {
      usePolling: true
    },
  },
  plugins: [react({
    // Add this line
    include: "**/*.jsx",
  })],
})