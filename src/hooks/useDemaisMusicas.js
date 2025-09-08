import { useState, useEffect, useCallback } from 'react';
import { musicasService } from '../services';

const useDemaisMusicas = (perPage = 10) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalSongs, setTotalSongs] = useState(0);

  const loadDemaisMusicas = useCallback(async (page = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await musicasService.listarDemais({
        page,
        per_page: perPage
      });
      
      setSongs(response.data || []);
      if (response.pagination) {
        setCurrentPage(response.pagination.current_page || 1);
        setTotalPages(response.pagination.last_page || 1);
        setTotalSongs(response.pagination.total || 0);
      } else {
        setCurrentPage(response.current_page || 1);
        setTotalPages(response.last_page || 1);
        setTotalSongs(response.total || 0);
      }
    } catch (err) {
      console.error('Erro ao carregar demais músicas:', err);
      setError('Erro ao carregar músicas');
      setSongs([]);
    } finally {
      setLoading(false);
    }
  }, [perPage]);

  const goToPage = useCallback((page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
      loadDemaisMusicas(page);
    }
  }, [currentPage, totalPages, loadDemaisMusicas]);

  const refresh = useCallback(() => {
    loadDemaisMusicas(currentPage);
  }, [currentPage, loadDemaisMusicas]);

  useEffect(() => {
    loadDemaisMusicas(1);
  }, [loadDemaisMusicas]);

  return { 
    songs, 
    loading, 
    error, 
    currentPage, 
    totalPages, 
    totalSongs,
    goToPage, 
    refresh 
  };
};

export default useDemaisMusicas;
