const getEnv = (key) => {
  if (typeof window !== "undefined" && window.__ENV__ && window.__ENV__[key]) {
    return window.__ENV__[key];
  }
  return import.meta.env[key] || "";
};

export const AppVariables = Object.freeze({
  WHATSAPP_CHANNEL_LINK: getEnv("VITE_WHATSAPP_CHANNEL_LINK"),
  TELEGRAM_CHANNEL_LINK: getEnv("VITE_TELEGRAM_CHANNEL_LINK"),
  API_BASE_URL: getEnv("VITE_API_BASE_URL"),
  SUPPORT_EMAIL: getEnv("VITE_SUPPORT_EMAIL"),
  PRODUCTION_ADMIN_PANEL_URL: getEnv("VITE_PRODUCTION_ADMIN_PANEL_URL"),
  APP_VERSION: getEnv("VITE_APP_VERSION") || "1.0.3",
});
