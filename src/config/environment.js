const config = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  API_TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT),
  DEBUG: import.meta.env.VITE_DEBUG === "true",
};

export default config;
