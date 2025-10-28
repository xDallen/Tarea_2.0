import axios from 'axios';

const API_BASE_URL = 'https://reflexoperu-v3.marketingmedico.vip/backend/public/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  // Removemos withCredentials: true ya que causa conflicto con CORS
});

// Interceptor para agregar el token a las peticiones manualmente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || 
                document.cookie
                  .split('; ')
                  .find(row => row.startsWith('token='))
                  ?.split('=')[1];
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

// Interceptor para manejar respuestas
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('token');
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  register: async (userData) => {
    const response = await api.post('/register', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/login', credentials);
    
    // Guardar token en localStorage y cookies como fallback
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      document.cookie = `token=${response.data.token}; path=/; max-age=86400; SameSite=Lax`;
    }
    
    return response.data;
  },

  logout: async () => {
    try {
      const response = await api.delete('/logout');
      return response.data;
    } finally {
      // Siempre limpiar el token localmente
      localStorage.removeItem('token');
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
    }
  },

  getProfile: async () => {
    const response = await api.get('/profile');
    return response.data;
  }
};

export default api;

// En cada función, agregar console.log para ver qué está pasando:

login: async (credentials) => {
  try {
    console.log('Intentando login con:', { email: credentials.email });
    const response = await api.post('/login', credentials);
    console.log('Login exitoso:', response.data);
    
    if (response.data.token) {
      setToken(response.data.token);
    }
    
    return response.data;
  } catch (error) {
    console.error('Error en login:', error.response?.data);
    throw new Error(error.response?.data?.message || 'Error en el login');
  }
}