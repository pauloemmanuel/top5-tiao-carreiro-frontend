import apiClient from './apiClient';
import { validateYoutubeUrl } from './validators';

const sugestoesService = {
  enviarSugestao: async (sugestaoData) => {
    const response = await apiClient.post('/sugestoes', sugestaoData);
    return response.data;
  },

  listarSugestoes: async (params = {}) => {
    const response = await apiClient.get('/sugestoes', { params });
    return response.data;
  },

  obterSugestao: async (id) => {
    const response = await apiClient.get(`/sugestoes/${id}`);
    return response.data;
  },

  removerSugestao: async (id) => {
    const response = await apiClient.delete(`/sugestoes/${id}`);
    return response.data;
  },

  aprovarSugestao: async (id, dados = {}) => {
    const response = await apiClient.post(`/sugestoes/${id}/aprovar`, dados);
    return response.data;
  },

  rejeitarSugestao: async (id, dados = {}) => {
    const response = await apiClient.post(`/sugestoes/${id}/rejeitar`, dados);
    return response.data;
  }
};

export default sugestoesService;
