import apiClient from './apiClient';
import validateYoutubeUrl from '../helpers/validateYoutubeUrl';

const musicasService = {
  listarMusicas: async (params = {}) => {
    const response = await apiClient.get('/musicas', { params });
    return response.data;
  },

  criarMusica: async (musicaData) => {
    if (musicaData && musicaData.url_youtube) {
      validateYoutubeUrl(musicaData.url_youtube);
    } else {
      const err = new Error('A URL do YouTube é obrigatória');
      err.code = 'required';
      throw err;
    }

    const response = await apiClient.post('/musicas', musicaData);
    return response.data;
  },

  getTop5: async () => {
    const response = await apiClient.get('/musicas/top5');
    return response.data;
  },

  listarDemais: async (params = {}) => {
    const response = await apiClient.get('/musicas/demais', { params });
    return response.data;
  },
  
  obterMusica: async (id) => {
    const response = await apiClient.get(`/musicas/${id}`);
    return response.data;
  },

  atualizarMusica: async (id, musicaData) => {
    const response = await apiClient.put(`/musicas/${id}`, musicaData);
    return response.data;
  },

  excluirMusica: async (id) => {
    const response = await apiClient.delete(`/musicas/${id}`);
    return response.data;
  },

  votar: async (id) => {
    const response = await apiClient.post(`/musicas/${id}/votar`);
    return response.data;
  }
};

export default musicasService;
