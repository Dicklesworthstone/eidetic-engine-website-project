#!/bin/bash

# Exit on error
set -e

echo "🚀 Setting up EideticEngine Website..."

# Create a project directory and clean it if needed
if [ -d ~/eidetic-enginewebsite-project ]; then
  echo "📁 Cleaning existing project directory..."
  rm -rf ~/eidetic-enginewebsite-project
fi

mkdir -p ~/eidetic-enginewebsite-project
cd ~/eidetic-enginewebsite-project

# Initialize a new React project with Vite
echo "📦 Initializing new React project with Vite..."
bun create vite ./ --template react

# Install necessary dependencies
echo "📚 Installing dependencies..."
bun install
bun add lucide-react recharts

# Install the correct version of Tailwind CSS for compatibility
echo "📚 Installing Tailwind CSS and related packages..."
bun add -d tailwindcss@3.3.5 postcss autoprefixer

# Create tailwind.config.js with ESM syntax (export default instead of module.exports)
echo "🎨 Setting up Tailwind CSS with ESM syntax..."
cat > tailwind.config.js << 'EOL'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOL

# Create postcss.config.js with ESM syntax
cat > postcss.config.js << 'EOL'
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOL

# Update CSS file with Tailwind directives
cat > src/index.css << 'EOL'
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
EOL

# Copy the EideticEngine website component
echo "📄 Copying EideticEngine website component..."
cp ~/eidetic-enginewebsite.tsx src/EideticEngineWebsite.tsx

# Update App component to use the EideticEngine website
cat > src/App.jsx << 'EOL'
import React from 'react';
import EideticEngineWebsite from './EideticEngineWebsite';
import './index.css';

function App() {
  return (
    <div className="App">
      <EideticEngineWebsite />
    </div>
  );
}

export default App;
EOL

# Update vite.config.js - also using ESM syntax
cat > vite.config.js << 'EOL'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8777,
    hmr: {
      overlay: false
    }
  }
})
EOL

# Make sure package.json has type: "module" explicitly defined
# Get the current package.json
PACKAGE_JSON=$(cat package.json)
# Check if it has "type": "module"
if ! echo "$PACKAGE_JSON" | grep -q '"type": "module"'; then
  # Add it
  jq '. + {"type": "module"}' package.json > tmp.json && mv tmp.json package.json
fi

# Start the development server
echo "🌐 Starting the EideticEngine website on port 8777..."
echo "📊 You can access the website at: http://localhost:8777"
echo "ℹ️ Press Ctrl+C to stop the server"

# Run the development server
bun run dev