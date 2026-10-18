#!/bin/sh
set -e

# Generate env-config.js from container environment variables at runtime
cat <<EOF > /usr/share/nginx/html/env-config.js
window.__ENV__ = {
  VITE_API_BASE_URL: "${VITE_API_BASE_URL}",
  VITE_WHATSAPP_CHANNEL_LINK: "${VITE_WHATSAPP_CHANNEL_LINK}",
  VITE_TELEGRAM_CHANNEL_LINK: "${VITE_TELEGRAM_CHANNEL_LINK}",
  VITE_PRODUCTION_ADMIN_PANEL_URL: "${VITE_PRODUCTION_ADMIN_PANEL_URL}",
  VITE_SUPPORT_EMAIL: "${VITE_SUPPORT_EMAIL}",
  VITE_APP_VERSION: "${VITE_APP_VERSION}"
};
EOF

exec "$@"
