import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // I have added this line to get the access through mobile also
  // server: {
  //    host: '0.0.0.0'     
  // }
  server:{
    host: '0.0.0.0'
  }
})
