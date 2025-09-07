import { useState, useEffect } from 'react';
import { musicasService } from '../services';

const useTop5 = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setLoading(true);
        const response = await musicasService.getTop5();
        setSongs(response.data || []);
        setError(null);
      } catch (error) {
        console.error('Erro ao buscar músicas:', error);
        setError('Erro ao conectar com o servidor');
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  const refreshSongs = async () => {
    try {
      setLoading(true);
      const response = await musicasService.getTop5();
      setSongs(response.data || []);
      setError(null);
    } catch (error) {
      console.error('Erro ao atualizar músicas:', error);
      setError('Erro ao conectar com o servidor');
    } finally {
      setLoading(false);
    }
  };

  return { songs, loading, error, refreshSongs };
};

export default useTop5;
