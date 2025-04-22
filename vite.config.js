import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(), 
        tailwindcss()
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        proxy: {
            // add target url for posting and fetching data from backend
            '/api' : {
                target: 'http://127.0.0.1:1234',
                //target: 'https://alumni-student-backend.onrender.com',
                changeOrigin: true,
                secure: true,
            }
        }
    }
})
