import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // CRITICAL FIX: Sets the base public path for the application. 
  // This ensures assets (like your main JS file) are loaded correctly 
  // from the root ('/') regardless of the Vercel deployment URL structure.
  base: '/',

  plugins: [react()],
})