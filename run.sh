#!/bin/bash

# 42Botler Run Script
# Usage: ./run.sh [d|p]
# d = development (npm run dev)
# p = production (npm run build + npm start)

# Kill any existing processes first
echo "🧹 Cleaning up existing processes..."
pkill -f "vite" 2>/dev/null || true
pkill -f "node.*server" 2>/dev/null || true
lsof -ti:3001,5173,5174,5175,5176 | xargs kill -9 2>/dev/null || true
sleep 2

if [ $# -eq 0 ]; then
    echo "Usage: ./run.sh [d|p]"
    echo "  d = development mode (npm run dev)"
    echo "  p = production mode (npm run build + npm start)"
    exit 1
fi

case $1 in
    "d"|"dev"|"development")
        echo "🚀 Starting development mode..."
        echo "📱 Client: http://localhost:5173"
        echo "🖥️  Server: http://localhost:3001"
        echo ""
        echo "Starting client in background..."
        cd client && npm run dev &
        CLIENT_PID=$!
        echo "Starting server..."
        cd server && npm start
        ;;
    "p"|"prod"|"production")
        echo "🏗️  Building for production..."
        cd client && npm run build
        echo "✅ Build complete!"
        echo ""
        echo "🚀 Starting production server..."
        echo "📱 Client: Built and ready for deployment"
        echo "🖥️  Server: http://localhost:3001"
        cd ../server && npm start
        ;;
    *)
        echo "❌ Invalid parameter: $1"
        echo "Usage: ./run.sh [d|p]"
        echo "  d = development mode"
        echo "  p = production mode"
        exit 1
        ;;
esac
