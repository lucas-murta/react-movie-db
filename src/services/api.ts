const API_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const READ_ACCESS_TOKEN = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN;

export const apiConfig = {
  baseURL: API_BASE_URL,
  apiKey: API_KEY,
  readAccessToken: READ_ACCESS_TOKEN,
  imageBaseURL: 'https://image.tmdb.org/t/p/w500',
  headers: {
    Authorization: `Bearer ${READ_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  },
};

export const buildUrl = (
  endpoint: string,
  params?: Record<string, string | number | boolean>
) => {
  const url = new URL(`${API_BASE_URL}${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value.toString());
    });
  }

  return url.toString();
};

export const apiRequest = async <T>(
  endpoint: string,
  params?: Record<string, string | number | boolean>
): Promise<T> => {
  const url = buildUrl(endpoint, params);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: apiConfig.headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
};
