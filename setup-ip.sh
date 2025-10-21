#!/bin/bash

# Setup script for IP-based access with subdirectory
# This will add 42Butler to your existing Apache configuration

echo "🔧 Setting up 42Butler for IP-based access..."

# Get current directory
CURRENT_DIR=$(pwd)

# Check if we're in the right directory
if [ ! -f "server/server.js" ]; then
    echo "❌ Please run this script from the 42Butler project root directory"
    exit 1
fi

# Build the React app with subdirectory configuration
echo "🏗️ Building React app for subdirectory deployment..."
cd client
npm run build
cd ..

# Copy files to web directory
echo "📁 Copying files to web directory..."
sudo mkdir -p /var/www/42butler
sudo cp -r client/dist/* /var/www/42butler/client/dist/
sudo chown -R www-data:www-data /var/www/42butler

# Add configuration to existing Apache site
echo "📝 Adding 42Butler configuration to Apache..."

# Create a backup of the current configuration
sudo cp /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/000-default.conf.backup

# Add 42Butler configuration to the default site
cat << 'EOF' | sudo tee -a /etc/apache2/sites-available/000-default.conf

# 42Butler Configuration
Alias /42butler /var/www/42butler/client/dist

<Directory /var/www/42butler/client/dist>
    Options -Indexes +FollowSymLinks
    AllowOverride All
    Require all granted
    
    # Handle React Router (SPA) for subdirectory
    RewriteEngine On
    RewriteBase /42butler/
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /42butler/index.html [L]
</Directory>

# Proxy API requests to Node.js backend
ProxyPreserveHost On
ProxyPass /42butler/api/ http://localhost:3001/api/
ProxyPassReverse /42butler/api/ http://localhost:3001/api/
EOF

# Enable required modules
echo "📦 Enabling Apache modules..."
sudo a2enmod rewrite
sudo a2enmod headers
sudo a2enmod proxy
sudo a2enmod proxy_http

# Test configuration
echo "🧪 Testing Apache configuration..."
if sudo apache2ctl configtest; then
    echo "✅ Apache configuration is valid!"
    
    # Restart Apache
    echo "🔄 Restarting Apache..."
    sudo systemctl restart apache2
    
    echo ""
    echo "✅ 42Butler setup complete!"
    echo ""
    echo "🌐 Your 42Butler AI will be available at:"
    echo "   http://89.168.52.201/42butler"
    echo ""
    echo "🔧 Next steps:"
    echo "1. Start the Node.js backend: pm2 start ecosystem.config.js"
    echo "2. Save PM2 configuration: pm2 save && pm2 startup"
    echo "3. Test the application: curl http://89.168.52.201/42butler/api/health"
    echo ""
    echo "📝 Files deployed to: /var/www/42butler/client/dist"
    echo "🔧 Apache configuration added to: /etc/apache2/sites-available/000-default.conf"
else
    echo "❌ Apache configuration has errors. Please check the configuration."
    echo "You can restore the backup with:"
    echo "sudo cp /etc/apache2/sites-available/000-default.conf.backup /etc/apache2/sites-available/000-default.conf"
fi
