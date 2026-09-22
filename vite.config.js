import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { exec } from 'child_process'

function openRiyaSinghalChromePlugin() {
  return {
    name: 'open-riya-singhal-chrome',
    configureServer(server) {
      server.httpServer?.once('listening', () => {
        const url = 'http://localhost:5173/';
        // Specifically launch Google Chrome in Riya Singhal's profile (Profile 5)
        const chromeCmd = 'start "" "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" --profile-directory="Profile 5" "' + url + '"';
        exec(chromeCmd, (err) => {
          if (err) {
            console.error('Failed to open Chrome in Riya Singhal profile:', err);
          } else {
            console.log('✓ Successfully opened BankIT360 in Chrome Profile: Riya Singhal (Profile 5)');
          }
        });
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    openRiyaSinghalChromePlugin()
  ],
  server: {
    host: true,
    port: 5173,
    open: false, // Disabled default generic browser open so ONLY Riya Singhal profile opens
  },
  build: {
    chunkSizeWarningLimit: 1000,
  }
})

