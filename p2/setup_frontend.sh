#!/bin/bash

echo "========================================"
echo "InterviewAI Frontend Setup"
echo "========================================"
echo ""

cd frontend

echo "[1/3] Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo ""
    echo "ERROR: Failed to install dependencies"
    echo "Please check your Node.js installation"
    exit 1
fi

echo ""
echo "[2/3] Setup complete!"
echo ""
echo "[3/3] Starting development server..."
echo ""
echo "The app will open at http://localhost:5173"
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev
