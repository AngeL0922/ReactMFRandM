import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'

export default defineConfig({
  base: process.env.PUBLIC_URL || 'http://localhost:3002/',
  plugins: [
    react(),
    federation({
      name: 'mf_character_detail',
      filename: 'remoteEntry.js',
      exposes: {
        './CharacterDetail': './src/CharacterDetail.tsx',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    }),
  ],
  server: { port: 3002, strictPort: true },
  preview: { port: 3002, strictPort: true },
  build: { target: 'esnext' },
})