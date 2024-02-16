import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Directorio de salida (puedes ajustarlo según tu estructura)
    rollupOptions: {
      output: {
        manualChunks: undefined, // Desactiva la creación de "chunks" manuales
      },
    },
  },
})