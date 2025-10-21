#!/bin/bash

# Apache Setup Script for 42Butler
# Run this after you've deployed the application

echo "🔧 Setting up Apache for 42Butler..."

# Get current directory
CURRENT_DIR=$(pwd)

# Get domain name from user
read -p "Enter your domain name (e.g., 42butler.yourdomain.com): " DOMAIN_NAME

if [ -z "$DOMAIN_NAME" ]; then
    echo "❌ Domain name is required!"
    exit 1
fi

# Copy Apache configuration
echo "📝 Copying Apache configuration..."
sudo cp apache-42butler.conf /etc/apache2/sites-available/42butler.conf

# Update paths in the configuration
echo "🔧 Updating configuration with your paths..."
sudo sed -i "s|/path/to/42-Hackaton|$CURRENT_DIR|g" /etc/apache2/sites-available/42butler.conf
sudo sed -i "s|your-domain.com|$DOMAIN_NAME|g" /etc/apache2/sites-available/42butler.conf

# Enable required Apache modules
echo "📦 Enabling Apache modules..."
sudo a2enmod rewrite
sudo a2enmod headers
sudo a2enmod ssl
sudo a2enmod proxy
sudo a2enmod proxy_http

# Enable the site
echo "🌐 Enabling 42Butler site..."
sudo a2ensite 42butler.conf

# Test configuration
echo "🧪 Testing Apache configuration..."
if sudo apache2ctl configtest; then
    echo "✅ Apache configuration is valid!"
    
    # Restart Apache
    echo "🔄 Restarting Apache..."
    sudo systemctl restart apache2
    
    echo ""
    echo "✅ Apache setup complete!"
    echo ""
    echo "🔧 Next steps:"
    echo "1. Make sure your domain points to this server's IP"
    echo "2. Get SSL certificate: sudo certbot --apache -d $DOMAIN_NAME"
    echo "3. Start the Node.js backend: pm2 start ecosystem.config.js"
    echo "4. Save PM2 configuration: pm2 save && pm2 startup"
    echo ""
    echo "🌐 Your site will be available at: http://$DOMAIN_NAME"
    echo "🔒 After SSL: https://$DOMAIN_NAME"
else
    echo "❌ Apache configuration has errors. Please check the configuration file."
    echo "Edit the file: sudo nano /etc/apache2/sites-available/42butler.conf"
fi
