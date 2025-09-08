import React, { useState, useEffect, useCallback } from 'react';
import { musicasService } from '../../services';
import { getFirstValidationError } from '../../services/validationHelper';
import LoadingSpinner from '../LoadingSpinner';
import formatViews from '../../helpers/formatViews';
import validateYoutubeUrl from '../../helpers/validateYoutubeUrl';

const AdminMusicas = () => {
  const [musicas, setMusicas] = useState([]);
  const [listLoading, setListLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalSongs, setTotalSongs] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [editingMusic, setEditingMusic] = useState(null);
  const [formData, setFormData] = useState({
    url_youtube: '',
    titulo: '',
    visualizacoes: '',
    status: 'ativa'
  });


  const loadMusicas = useCallback(async (page = 1) => {
    setListLoading(true);
    setError(null);
    
    try {
      const response = await musicasService.listarMusicas({
        page,
        per_page: 10
      });
      
  const list = response.data || [];
  const pg = response.pagination || {};

  setMusicas(list);
  setCurrentPage(pg.current_page || page || 1);
  setTotalPages(pg.last_page || pg.total_pages || 1);
  setTotalSongs(pg.total || 0);
    } catch (err) {
      console.error('Erro ao carregar músicas:', err);
      setError('Erro ao carregar músicas');
    } finally {
      setListLoading(false);
    }
  }, []);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
      loadMusicas(page);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage('');
    if (!formData.url_youtube || !formData.url_youtube.trim()) {
      setError('Por favor, insira um link do YouTube');
      return;
    }
    if (!validateYoutubeUrl(formData.url_youtube)) {
      setError('Por favor, insira um link válido do YouTube');
      return;
    }

    setSubmitting(true);
    
    try {
      if (editingMusic) {
        await musicasService.atualizarMusica(editingMusic.id, formData);
      } else {
        const toCreate = { ...formData, status: 'ativa' };
        await musicasService.criarMusica(toCreate);
      }
      setShowForm(false);
      setEditingMusic(null);
      setFormData({ url_youtube: '', titulo: '', visualizacoes: '', status: 'ativa' });
      const message = editingMusic ? 'Música atualizada com sucesso.' : 'Música criada com sucesso.';
      setSuccessMessage(message);
      await loadMusicas(currentPage);
    } catch (err) {
      console.error('Erro ao salvar música:', err);
      if (err && err.response && err.response.status === 422) {
        const msg = getFirstValidationError(err);
        if (msg) {
          setError(msg);
        } else {
          setError('Erro de validação ao salvar música.');
        }
      } else if (err && err.response && err.response.status === 409) {
        setError('Música já cadastrada.');
      } else {
        setError('Erro ao salvar música: ' + (err.message || 'Erro desconhecido'));
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (musica) => {
    setEditingMusic(musica);
    setFormData({
      url_youtube: `https://www.youtube.com/watch?v=${musica.youtube_id}`,
      titulo: musica.titulo || '',
      visualizacoes: musica.visualizacoes?.toString() || '',
      status: musica.status || 'ativa'
    });
  setError(null);
  setSuccessMessage('');
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta música?')) {
      setListLoading(true);
      try {
        await musicasService.excluirMusica(id);
        loadMusicas(currentPage);
      } catch (err) {
        console.error('Erro ao excluir música:', err);
        setError('Erro ao excluir música');
      } finally {
        setListLoading(false);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  setError(null);
  setSuccessMessage('');
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingMusic(null);
    setFormData({ url_youtube: '', titulo: '', visualizacoes: '', status: 'ativa' });
  };

  useEffect(() => {
    loadMusicas(1);
  }, [loadMusicas]);

  return (
    <div className="container mx-auto max-w-[1366px] px-4 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Gerenciar Músicas</h2>
          <button
            type="button"
            onClick={() => {
              // always open in create mode
              setEditingMusic(null);
              setFormData({ url_youtube: '', titulo: '', visualizacoes: '', status: 'ativa' });
              setError(null);
              setSuccessMessage('');
              setShowForm(true);
            }}
            className="bg-wood-600 text-white px-4 py-2 rounded-lg hover:bg-wood-700 transition-colors"
          >
            ➕ Nova Música
          </button>
        </div>

        {!showForm && error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {!showForm && successMessage && (
          <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded">
            {successMessage}
          </div>
        )}

        {showForm && (
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">
              {editingMusic ? 'Editar Música' : 'Nova Música'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL do YouTube *
                </label>
                <input
                  type="url"
                  name="url_youtube"
                  value={formData.url_youtube}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wood-500"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
                </div>

                {/* inline error/success like SuggestForm */}
                {error && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                  </p>
                )}

                {successMessage && (
                  <p className="mt-2 text-sm text-green-700 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {successMessage}
                  </p>
                )}

              {editingMusic && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Título
                    </label>
                    <input
                      type="text"
                      name="titulo"
                      value={formData.titulo}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wood-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Visualizações
                    </label>
                    <input
                      type="number"
                      name="visualizacoes"
                      value={formData.visualizacoes}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wood-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wood-500"
                    >
                      <option value="ativa">Ativa</option>
                      <option value="inativa">Inativa</option>
                    </select>
                  </div>
                </>
              )}

              <div className="relative">
                {/* submitting overlay */}
                {submitting && (
                  <div className="absolute inset-0 bg-white/70 z-20 flex items-center justify-center rounded">
                    <div className="text-center">
                      <LoadingSpinner />
                      <div className="text-sm text-gray-700 mt-2">Enviando...</div>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-wood-600 text-white px-4 py-2 rounded-lg hover:bg-wood-700 transition-colors disabled:opacity-50"
                  >
                    {submitting ? 'Salvando...' : (editingMusic ? 'Atualizar' : 'Adicionar')}
                  </button>
                <button
                  type="button"
                  onClick={cancelForm}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancelar
                </button>
                </div>
              </div>
            </form>
          </div>
        )}

  <div className={`relative ${(listLoading || submitting) ? 'opacity-60 pointer-events-none' : ''}`}>
      {musicas.length > 0 ? (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Música
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Visualizações
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {musicas.map((musica) => (
                    <tr key={musica.id}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {musica.thumb && (
                            <img
                              className="h-12 w-16 object-cover rounded mr-4"
                              src={musica.thumb}
                              alt={musica.titulo}
                            />
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900 break-words max-w-[420px]">
                              {musica.titulo}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              ID: {musica.youtube_id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {formatViews(musica.visualizacoes)}
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(musica)}
                          title="Editar"
                          aria-label={`Editar ${musica.titulo}`}
                          className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-yellow-400 text-white hover:bg-yellow-500 mr-2"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
                          </svg>
                        </button>

                        <button
                          onClick={() => handleDelete(musica.id)}
                          title="Excluir"
                          aria-label={`Excluir ${musica.titulo}`}
                          className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-red-600 text-white hover:bg-red-700"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                            <path d="M10 11v6" />
                            <path d="M14 11v6" />
                            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
      ) : (
        <div className="card p-12 text-center">
          <div className="text-6xl mb-6">🎵</div>
          <h3 className="text-2xl font-bold text-wood-700 mb-4">
            Nenhuma música encontrada
          </h3>
        </div>
      )}

  {/* listLoading overlay removed — list stays visible but dimmed and non-interactive */}
  </div>

    {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-6">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded text-sm ${
                currentPage === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-wood-700 hover:bg-gray-100'
              }`}
            >
              ← Anterior
            </button>
            
            <div className="flex space-x-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`px-3 py-1 rounded text-sm ${
                      currentPage === pageNum
                        ? 'bg-wood-600 text-white'
                        : 'text-gray-600 hover:text-wood-700 hover:bg-gray-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded text-sm ${
                currentPage === totalPages
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-wood-700 hover:bg-gray-100'
              }`}
            >
              Próxima →
            </button>
          </div>
        )}

        <div className="text-center text-sm text-gray-500">
          Total: {totalSongs} música{totalSongs !== 1 ? 's' : ''}
        </div>
    </div>
  );
};

export default AdminMusicas;
