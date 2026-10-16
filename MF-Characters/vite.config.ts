import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'

export default defineConfig({
  base: process.env.PUBLIC_URL || 'http://localhost:3001/',
  plugins: [
    react(),
    federation({
      name: 'mf_characters',
      filename: 'remoteEntry.js',
      exposes: {
        './Characters': './src/Characters.tsx',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    }),
  ],
  server: { port: 3001, strictPort: true },
  preview: { port: 3001, strictPort: true },
  build: { target: 'esnext' },
})