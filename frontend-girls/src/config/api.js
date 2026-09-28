/**
 * Dynamic API Base URL Configuration
 * Reads from Vite environment variable VITE_API_BASE_URL (fallback to empty string for relative proxy)
 */
export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

/**
 * Builds full API URL dynamically
 * @param {string} endpoint - API path (e.g. '/api/leads')
 * @returns {string} Fully qualified or relative API URL
 */
export const getApiUrl = (endpoint) => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${cleanEndpoint}`;
};

export default {
  API_BASE_URL,
  getApiUrl
};
