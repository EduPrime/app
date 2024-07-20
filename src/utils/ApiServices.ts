import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAuthRequest = async (endpoint: string, jwtToken: string) => {
  try {
    const response = await apiClient.get(endpoint, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const postRequest = async (endpoint: string, requestBody: any) => {
  try {
    const response = await apiClient.post(endpoint, requestBody);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.clear()
      router.push('/login');
    }
    return Promise.reject(error);
  }
);