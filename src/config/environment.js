const config = {
  development: {
    API_BASE_URL: 'http://localhost:3000/api',
    API_TIMEOUT: 10000,
    DEBUG: true,
  },
  staging: {
    API_BASE_URL: 'https://staging-api.yourapp.com/api',
    API_TIMEOUT: 15000,
    DEBUG: false
  },
  production: {
    API_BASE_URL: 'https://api.yourapp.com/api',
    API_TIMEOUT: 15000,
    DEBUG: false
  },
};

const environment = process.env.NODE_ENV || 'development';

export default config[environment];