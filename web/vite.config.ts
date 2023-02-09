import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [react()],
   server: {
      port: 3333,
      watch: {
         usePolling: true,
      },
   },
})


// ,
//       { "source": "/CreatePost/(.*)", "destination": "/" },
//       { "source": "/home/(.*)", "destination": "/" },
//       { "source": "/login/(.*)", "destination": "/" },
//       { "source": "/post/(.*)", "destination": "/" },
//       { "source": "/profile/(.*)", "destination": "/" },
//       { "source": "/record/(.*)", "destination": "/" }