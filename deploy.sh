#!/bin/bash

# 42Butler Deployment Script for Ubuntu Server
# Make sure to run this script as the user who will run the application

echo "🚀 Starting 42Butler deployment..."

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    echo "❌ Please don't run this script as root. Run as a regular user with sudo privileges."
    exit 1
fi

# Update system packages
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Node.js 18+ if not already installed
if ! command -v node &> /dev/null; then
    echo "📦 Installing Node.js 18+..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    echo "✅ Node.js already installed: $(node --version)"
fi

# Install PM2 globally if not already installed
if ! command -v pm2 &> /dev/null; then
    echo "📦 Installing PM2..."
    sudo npm install -g pm2
else
    echo "✅ PM2 already installed: $(pm2 --version)"
fi

# Install Nginx if not already installed
if ! command -v nginx &> /dev/null; then
    echo "📦 Installing Nginx..."
    sudo apt install nginx -y
else
    echo "✅ Nginx already installed"
fi

# Install Certbot for SSL
if ! command -v certbot &> /dev/null; then
    echo "📦 Installing Certbot..."
    sudo apt install certbot python3-certbot-nginx -y
else
    echo "✅ Certbot already installed"
fi

# Install fail2ban for security
if ! command -v fail2ban-server &> /dev/null; then
    echo "📦 Installing fail2ban..."
    sudo apt install fail2ban -y
    sudo systemctl enable fail2ban
else
    echo "✅ fail2ban already installed"
fi

# Install unattended-upgrades for automatic security updates
echo "📦 Installing unattended-upgrades..."
sudo apt install unattended-upgrades -y
sudo dpkg-reconfigure -plow unattended-upgrades

# Create logs directory
mkdir -p logs

# Install project dependencies
echo "📦 Installing project dependencies..."
cd server && npm install
cd ../client && npm install

# Build the React application
echo "🏗️ Building React application..."
npm run build

# Go back to project root
cd ..

# Create .env file if it doesn't exist
if [ ! -f server/.env ]; then
    echo "📝 Creating .env file..."
    cp server/.env.example server/.env 2>/dev/null || echo "OPENAI_API_KEY=YOUR_API_KEY_HERE" > server/.env
    echo "⚠️  Please edit server/.env and add your OpenAI API key!"
fi

# Update ecosystem.config.js with current path
CURRENT_PATH=$(pwd)
sed -i "s|/path/to/42-Hackaton|$CURRENT_PATH|g" ecosystem.config.js

echo "✅ Deployment setup complete!"
echo ""
echo "🔧 Next steps:"
echo "1. Edit server/.env and add your OPENAI_API_KEY"
echo "2. Configure Nginx (see README for nginx configuration)"
echo "3. Set up SSL certificate: sudo certbot --nginx -d your-domain.com"
echo "4. Start the application: pm2 start ecosystem.config.js"
echo "5. Save PM2 configuration: pm2 save && pm2 startup"
echo ""
echo "🔒 Security checklist:"
echo "- Configure firewall: sudo ufw allow ssh && sudo ufw allow 'Nginx Full' && sudo ufw enable"
echo "- Set up domain name pointing to your server IP"
echo "- Test SSL certificate and auto-renewal"
echo "- Monitor logs: pm2 logs 42butler-server"
echo ""
echo "📚 For detailed instructions, see the README.md file"
