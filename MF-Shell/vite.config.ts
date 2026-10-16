import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'mf_shell',
      remotes: {
        mf_characters: {
          type: 'module',
          name: 'mf_characters',
          entry: process.env.CHARACTERS_URL || 'http://localhost:3001/remoteEntry.js',
        },
        mf_character_detail: {
          type: 'module',
          name: 'mf_character_detail',
          entry: process.env.DETAIL_URL || 'http://localhost:3002/remoteEntry.js',
        },
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    }),
  ],
  server: { port: 3000, strictPort: true },
  preview: { port: 3000, strictPort: true },
  build: { target: 'esnext' },
})