import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { CRX_OUTDIR } from './globalConfig'

// https://vitejs.dev/config/
export default defineConfig({
  build:{
    outDir:CRX_OUTDIR
  },
  server:{
    port:3000,
    open:'/'
  },
  resolve:{
    alias:{
      // eslint-disable-next-line no-undef
      '@': path.resolve(__dirname,'src')
    }
  },
  plugins: [react()],
})
