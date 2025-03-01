import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(), 
        tailwindcss()
    ],
    server: {
        proxy: {
            // add target url for posting and fetching data from backend
            '/api' : {
                target: 'http://127.0.0.1:1234',
                secure: false,
            }
        }
    }
})
