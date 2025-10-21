#!/bin/bash

# Build script for Ubuntu server deployment
# This sets the environment variable to use the subdirectory base path

echo "Building for server deployment with subdirectory base path..."

# Set the environment variable for subdirectory deployment
export VITE_USE_SUBDIRECTORY=true

# Build the project
cd client
npm run build

echo "Build complete! The dist folder is ready for server deployment."
echo "Make sure to deploy the contents of the 'dist' folder to your server's /42butler/ directory."
