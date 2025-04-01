import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { splitVendorChunkPlugin } from 'vite';
import compression from 'vite-plugin-compression2';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), // Simplified React plugin without Babel config
    splitVendorChunkPlugin(),
    compression({
      algorithm: 'gzip',
      include: [/\.(js|css|html|svg|json)$/],
      threshold: 1024
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 5174,
    strictPort: true,
    open: true,
    cors: true,
    hmr: {
      overlay: true, // Show error overlay in browser
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    cssMinify: true,
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    reportCompressedSize: false, // Faster build times
    cssCodeSplit: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
      },
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Create optimized chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            if (id.includes('@mui')) {
              return 'mui-vendor';
            }
            if (id.includes('chart.js') || id.includes('react-chartjs')) {
              return 'chart-vendor';
            }
            if (id.includes('formik') || id.includes('yup')) {
              return 'form-vendor';
            }
            return 'vendor'; // Other vendors
          }
        },
        // Optimize chunking for better caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom', 
      '@mui/material', 
      'formik', 
      'yup',
      'chart.js',
      'dayjs',
      'axios'
    ],
    esbuildOptions: {
      target: 'esnext',
    }
  },
  preview: {
    port: 8000,
    open: true,
  },
}); 