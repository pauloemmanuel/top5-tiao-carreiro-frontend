import { useState, useEffect, useCallback } from 'react';
import { musicasService } from '../services';

const useAllMusicasPaginated = (initialPage = 1, perPage = 10) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [totalSongs, setTotalSongs] = useState(0);
  const [pagination, setPagination] = useState(null);

  const loadSongs = useCallback(async (page = currentPage) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await musicasService.listarMusicas({
        page,
        per_page: perPage
      });
      
      setSongs(response.data || []);
      if (response.pagination) {
        setCurrentPage(response.pagination.current_page || 1);
        setTotalPages(response.pagination.last_page || 1);
        setTotalSongs(response.pagination.total || 0);
        setPagination(response.pagination);
      } else {
        setCurrentPage(response.current_page || 1);
        setTotalPages(response.last_page || 1);
        setTotalSongs(response.total || 0);
      }
    } catch (err) {
      console.error('Erro ao carregar músicas:', err);
      setError('Erro ao carregar músicas');
      setSongs([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, perPage]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
      loadSongs(page);
    }
  };

  const refresh = () => {
    loadSongs(currentPage);
  };

  useEffect(() => {
    loadSongs(initialPage);
  }, [loadSongs, initialPage]);

  return { 
    songs, 
    loading, 
    error, 
    currentPage, 
    totalPages, 
    totalSongs, 
    pagination,
    goToPage, 
    refresh 
  };
};

export default useAllMusicasPaginated;
