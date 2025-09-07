import apiClient from './apiClient';

const authService = {
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    
    if (response.data?.data) {
      const { token, user } = response.data.data;
      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_user', JSON.stringify(user));
    }
    
    return response.data;
  },
  
  getUser: async () => {
    const response = await apiClient.get('/auth/user');
    return response.data;
  },
  
  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    return response.data;
  },
  
  logoutAll: async () => {
    const response = await apiClient.post('/auth/logout-all');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    return response.data;
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('auth_token');
  },
  
  getAuthenticatedUser: () => {
    const user = localStorage.getItem('auth_user');
    return user ? JSON.parse(user) : null;
  },
};

export default authService;
