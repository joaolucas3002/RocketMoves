import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [react()],
   server: {
      port: 5000,
      watch: {
         usePolling: true,
      },
   },
});

//   http://0.0.0.0:3000/
