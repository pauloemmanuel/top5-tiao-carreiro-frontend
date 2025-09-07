import React, { useState, useEffect } from 'react';
import { sugestoesService } from '../../services';
import LoadingSpinner from '../LoadingSpinner';

const AdminSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadSuggestions = async (page = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await sugestoesService.listarSugestoes({
        page,
        per_page: 10,
        status: 'pendente'
      });
      
      setSuggestions(response.data || []);
      setCurrentPage(response.current_page || 1);
      setTotalPages(response.last_page || 1);
    } catch (err) {
      console.error('Erro ao carregar sugestões:', err);
      setError('Erro ao carregar sugestões');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSuggestions();
  }, []);

  const handleApprove = async (id, sugestao) => {
    setProcessing(prev => ({ ...prev, [id]: 'approving' }));
    
    try {
      await sugestoesService.aprovarSugestao(id, {
        titulo: sugestao.titulo,
        youtube_id: sugestao.youtube_id,
        thumb: sugestao.thumb
      });
      
      // Recarregar a lista
      await loadSuggestions(currentPage);
    } catch (err) {
      console.error('Erro ao aprovar sugestão:', err);
      alert('Erro ao aprovar sugestão');
    } finally {
      setProcessing(prev => ({ ...prev, [id]: null }));
    }
  };

  const handleReject = async (id, motivo = '') => {
    setProcessing(prev => ({ ...prev, [id]: 'rejecting' }));
    
    try {
      await sugestoesService.rejeitarSugestao(id, { motivo });
      
      // Recarregar a lista
      await loadSuggestions(currentPage);
    } catch (err) {
      console.error('Erro ao rejeitar sugestão:', err);
      alert('Erro ao rejeitar sugestão');
    } finally {
      setProcessing(prev => ({ ...prev, [id]: null }));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading && suggestions.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-wood-700 font-country">
          ⚙️ Gerenciar Sugestões
        </h2>
        <p className="text-gray-600 mt-2">Aprovar ou reprovar sugestões de músicas</p>
      </div>

      {error && (
        <div className="card p-6 border-red-200 bg-red-50">
          <p className="text-red-600 text-center">{error}</p>
        </div>
      )}

      {suggestions.length === 0 && !loading && (
        <div className="card p-12 text-center">
          <div className="text-6xl mb-6">✅</div>
          <h3 className="text-2xl font-bold text-wood-700 mb-4">
            Nenhuma sugestão pendente
          </h3>
          <p className="text-gray-600">Todas as sugestões foram processadas!</p>
        </div>
      )}

      <div className="space-y-4">
        {suggestions.map((sugestao) => (
          <div key={sugestao.id} className="card p-6">
            <div className="flex items-start space-x-4">
              {sugestao.thumb && (
                <div className="flex-shrink-0">
                  <img 
                    src={sugestao.thumb} 
                    alt={sugestao.titulo} 
                    className="w-32 h-20 object-cover rounded-lg shadow-md"
                  />
                </div>
              )}
              
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {sugestao.titulo}
                </h3>
                
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <span className="font-semibold">Sugerido em:</span> {formatDate(sugestao.created_at)}
                  </p>
                  <p>
                    <span className="font-semibold">URL:</span>{' '}
                    <a 
                      href={`https://www.youtube.com/watch?v=${sugestao.youtube_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-wood-600 hover:text-wood-700 underline"
                    >
                      Ver no YouTube
                    </a>
                  </p>
                  {sugestao.usuario && (
                    <p>
                      <span className="font-semibold">Sugerido por:</span> {sugestao.usuario.name}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex-shrink-0 space-y-2">
                <button
                  onClick={() => handleApprove(sugestao.id, sugestao)}
                  disabled={processing[sugestao.id]}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
                >
                  {processing[sugestao.id] === 'approving' ? (
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                  ) : (
                    <>
                      ✓ Aprovar
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => {
                    const motivo = prompt('Motivo da rejeição (opcional):');
                    if (motivo !== null) {
                      handleReject(sugestao.id, motivo);
                    }
                  }}
                  disabled={processing[sugestao.id]}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
                >
                  {processing[sugestao.id] === 'rejecting' ? (
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                  ) : (
                    <>
                      ✗ Reprovar
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          <button
            onClick={() => loadSuggestions(currentPage - 1)}
            disabled={currentPage <= 1 || loading}
            className="px-3 py-2 bg-wood-600 text-white rounded-lg disabled:bg-gray-400 hover:bg-wood-700 transition-colors"
          >
            Anterior
          </button>
          
          <span className="text-gray-600">
            Página {currentPage} de {totalPages}
          </span>
          
          <button
            onClick={() => loadSuggestions(currentPage + 1)}
            disabled={currentPage >= totalPages || loading}
            className="px-3 py-2 bg-wood-600 text-white rounded-lg disabled:bg-gray-400 hover:bg-wood-700 transition-colors"
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminSuggestions;
