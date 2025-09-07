import React, { useState, useEffect } from 'react';
import { musicasService } from '../services';
import LoadingSpinner from './LoadingSpinner';

const AllSongs = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalSongs, setTotalSongs] = useState(0);

  const loadSongs = async (page = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await musicasService.listarMusicas({
        page,
        per_page: 10
      });
      
      setSongs(response.data || []);
      setCurrentPage(response.current_page || 1);
      setTotalPages(response.last_page || 1);
      setTotalSongs(response.total || 0);
    } catch (err) {
      console.error('Erro ao carregar músicas:', err);
      setError('Erro ao carregar músicas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSongs();
  }, []);

  // Formata visualizações para pt-BR: bilhões, milhões, mil, ou número abaixo de mil
  const formatViews = (num) => {
    const n = Number(num) || 0;
    const formatter = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1, minimumFractionDigits: 0 });
    if (n >= 1e9) return `${formatter.format(n / 1e9)} bilhões`;
    if (n >= 1e6) return `${formatter.format(n / 1e6)} milhões`;
    if (n >= 1e3) return `${formatter.format(n / 1e3)} mil`;
    return new Intl.NumberFormat('pt-BR').format(n);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (loading && songs.length === 0) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="card p-12 text-center">
        <div className="text-6xl mb-6">🎵</div>
        <h3 className="text-2xl font-bold text-wood-700 mb-4">
          Erro ao listar as músicas.
        </h3>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (!songs || songs.length === 0) {
    return (
      <div className="card p-12 text-center">
        <div className="text-6xl mb-6">🎵</div>
        <h3 className="text-2xl font-bold text-wood-700 mb-4">
          Nenhuma música encontrada
        </h3>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-wood-700 font-country">
          🎼 Todas as Músicas
        </h2>
        <p className="text-gray-600 mt-2">
          {totalSongs} música{totalSongs !== 1 ? 's' : ''} no acervo da dupla
        </p>
      </div>
      
      <div className="space-y-4">
        {songs.map((song, index) => {
          // Calcular posição global considerando a paginação
          const globalPosition = (currentPage - 1) * 10 + index + 1;
          
          return (
            <div key={song.id || index} className="group">
              <a 
                href={`https://www.youtube.com/watch?v=${song.youtube_id}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block transform hover:scale-[1.02] transition-all duration-300"
              >
                <div className="card p-6 flex items-center group-hover:shadow-2xl">
                  <div className="music-rank mr-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${
                      globalPosition <= 5 
                        ? 'from-wood-600 to-wood-800' 
                        : 'from-gray-500 to-gray-700'
                    } rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg`}>
                      {globalPosition <= 5 && (
                        <span className="text-xs absolute -top-1 -right-1 bg-yellow-500 text-black rounded-full px-1">
                          TOP
                        </span>
                      )}
                      {globalPosition}
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-wood-700 transition-colors">
                      {song.titulo}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-600">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7s-8.268-2.943-9.542-7z" />
                          <circle cx="12" cy="12" r="3" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {formatViews(song.visualizacoes)} visualizações
                      </div>
                      {song.created_at && (
                        <div className="flex items-center">
                          <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Adicionada em {formatDate(song.created_at)}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {song.thumb && (
                    <div className="ml-6">
                      <img 
                        src={song.thumb} 
                        alt={song.titulo} 
                        className="w-32 h-20 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow"
                      />
                    </div>
                  )}
                  
                  <div className="ml-4 text-wood-600 group-hover:text-wood-700 transition-colors">
                    <svg className="w-6 h-6 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </a>
            </div>
          );
        })}
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          <button
            onClick={() => loadSongs(currentPage - 1)}
            disabled={currentPage <= 1 || loading}
            className="px-4 py-2 bg-wood-600 text-white rounded-lg disabled:bg-gray-400 hover:bg-wood-700 transition-colors flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Anterior
          </button>
          
          <div className="flex items-center space-x-1">
            {/* Primeira página */}
            {currentPage > 3 && (
              <>
                <button
                  onClick={() => loadSongs(1)}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  1
                </button>
                {currentPage > 4 && <span className="text-gray-400">...</span>}
              </>
            )}
            
            {/* Páginas ao redor da atual */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(page => page >= currentPage - 2 && page <= currentPage + 2)
              .map(page => (
                <button
                  key={page}
                  onClick={() => loadSongs(page)}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    page === currentPage
                      ? 'bg-wood-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
            
            {/* Última página */}
            {currentPage < totalPages - 2 && (
              <>
                {currentPage < totalPages - 3 && <span className="text-gray-400">...</span>}
                <button
                  onClick={() => loadSongs(totalPages)}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>
          
          <button
            onClick={() => loadSongs(currentPage + 1)}
            disabled={currentPage >= totalPages || loading}
            className="px-4 py-2 bg-wood-600 text-white rounded-lg disabled:bg-gray-400 hover:bg-wood-700 transition-colors flex items-center"
          >
            Próxima
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
      
      {loading && (
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default AllSongs;
