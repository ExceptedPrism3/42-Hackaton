# HTTPS Setup Guide for 42Botler on Ubuntu

This guide will help you set up HTTPS (SSL/TLS) for your 42Botler application using Let's Encrypt (free SSL certificates).

## Prerequisites

- Ubuntu server with Apache installed
- Domain name pointing to your server IP (89.168.52.201)
- Ports 80 and 443 open in your firewall
- Root or sudo access

## Step 1: Install Certbot

```bash
sudo apt update
sudo apt install certbot python3-certbot-apache -y
```

## Step 2: Enable Apache SSL Module

```bash
sudo a2enmod ssl
sudo systemctl restart apache2
```

## Step 3: Get SSL Certificate

**Option A: If you have a domain name (recommended)**

```bash
sudo certbot --apache -d yourdomain.com -d www.yourdomain.com
```

Replace `yourdomain.com` with your actual domain name.

**Option B: If you only have an IP address**

Let's Encrypt doesn't issue certificates for IP addresses directly. You have two options:

1. **Use a domain name** (recommended) - Point a domain to your IP
2. **Use self-signed certificate** (for testing only) - See Step 4

## Step 4: Alternative - Self-Signed Certificate (Testing Only)

If you don't have a domain name, you can create a self-signed certificate for testing:

```bash
# Create SSL directory
sudo mkdir -p /etc/apache2/ssl

# Generate self-signed certificate (valid for 365 days)
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/apache2/ssl/42botler.key \
  -out /etc/apache2/ssl/42botler.crt

# During the prompts, you can use:
# Country: DE
# State: Baden-Württemberg
# City: Heilbronn
# Organization: 42 Heilbronn
# Common Name: 89.168.52.201 (or your domain if you have one)
```

## Step 5: Update Apache Configuration

Edit your Apache config file:

```bash
sudo nano /etc/apache2/sites-available/42botler.conf
```

Replace the entire content with this HTTPS-enabled configuration:

```apache
<VirtualHost *:80>
    ServerName 89.168.52.201
    
    # Redirect all HTTP traffic to HTTPS
    Redirect permanent / https://89.168.52.201/
</VirtualHost>

<VirtualHost *:443>
    ServerName 89.168.52.201

    # SSL Configuration
    SSLEngine on
    
    # For Let's Encrypt (if using certbot)
    SSLCertificateFile /etc/letsencrypt/live/yourdomain.com/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/yourdomain.com/privkey.pem
    
    # OR for self-signed certificate
    # SSLCertificateFile /etc/apache2/ssl/42botler.crt
    # SSLCertificateKeyFile /etc/apache2/ssl/42botler.key

    # Serve the frontend build
    Alias /42botler /var/www/42botler/client/dist
    <Directory /var/www/42botler/client/dist>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    # Proxy API calls to backend
    ProxyPass /42botler/api http://127.0.0.1:3001/api
    ProxyPassReverse /42botler/api http://127.0.0.1:3001/api

    # Optional: health endpoint
    ProxyPass /42botler/health http://127.0.0.1:3001/api/health
    ProxyPassReverse /42botler/health http://127.0.0.1:3001/api/health

    # Logs
    ErrorLog ${APACHE_LOG_DIR}/42botler_error.log
    CustomLog ${APACHE_LOG_DIR}/42botler_access.log combined
</VirtualHost>
```

**Important**: 
- If using Let's Encrypt, replace `yourdomain.com` with your actual domain
- If using self-signed, uncomment the self-signed certificate lines and comment out the Let's Encrypt lines

## Step 6: Enable Required Apache Modules

```bash
sudo a2enmod ssl
sudo a2enmod rewrite
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo systemctl restart apache2
```

## Step 7: Test and Reload Apache

```bash
# Test Apache configuration
sudo apache2ctl configtest

# If test passes, reload Apache
sudo systemctl reload apache2
```

## Step 8: Configure Firewall (if using UFW)

```bash
# Allow HTTPS traffic
sudo ufw allow 'Apache Full'
# OR specifically
sudo ufw allow 443/tcp
```

## Step 9: Auto-Renewal (Let's Encrypt only)

Let's Encrypt certificates expire every 90 days. Certbot sets up auto-renewal automatically, but you can test it:

```bash
# Test renewal
sudo certbot renew --dry-run
```

## Step 10: Update Frontend API Calls (if needed)

If your frontend is hardcoded to use HTTP, you may need to update it. However, since we're using relative paths (`/42botler/api/...`), it should automatically use HTTPS when accessed via HTTPS.

## Verification

1. **Test HTTPS**: Visit `https://89.168.52.201/42botler/` (or your domain)
2. **Check certificate**: Click the padlock icon in your browser
3. **Test redirect**: Visit `http://89.168.52.201/42botler/` - it should redirect to HTTPS

## Troubleshooting

### Certificate errors with self-signed certificate
- Browsers will show a warning - this is normal for self-signed certificates
- Click "Advanced" → "Proceed to site" (for testing only)
- For production, use Let's Encrypt with a real domain

### Apache won't start
```bash
# Check Apache error logs
sudo tail -f /var/log/apache2/error.log

# Check SSL certificate paths are correct
sudo ls -la /etc/letsencrypt/live/yourdomain.com/
```

### Port 443 not accessible
```bash
# Check if port 443 is listening
sudo netstat -tlnp | grep 443

# Check firewall
sudo ufw status
```

## Security Recommendations

1. **Use Let's Encrypt** instead of self-signed certificates for production
2. **Enable HSTS** (HTTP Strict Transport Security) - Add to your VirtualHost:
   ```apache
   Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
   ```
3. **Disable weak SSL protocols** - Modern Apache configs do this by default
4. **Keep certificates updated** - Let's Encrypt auto-renewal handles this

## Quick Reference Commands

```bash
# Check certificate expiration (Let's Encrypt)
sudo certbot certificates

# Renew certificate manually
sudo certbot renew

# View Apache SSL configuration
apache2ctl -M | grep ssl

# Test SSL configuration
openssl s_client -connect 89.168.52.201:443 -servername yourdomain.com
```

---

**Note**: For production use, always use Let's Encrypt with a real domain name. Self-signed certificates are only for testing and will show security warnings in browsers.

