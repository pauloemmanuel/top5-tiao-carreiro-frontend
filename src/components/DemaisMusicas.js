import React from 'react';
import useDemaisMusicas from '../hooks/useDemaisMusicas';
import formatViews from '../helpers/formatViews';
import LoadingSpinner from './LoadingSpinner';

const DemaisMusicas = () => {
  const { 
    songs, 
    loading, 
    error, 
    currentPage, 
    totalPages, 
    totalSongs,
    goToPage 
  } = useDemaisMusicas(5);

  // using shared formatViews helper

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-4">
        {error}
      </div>
    );
  }

  if (songs.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">
        Nenhuma música adicional encontrada
      </div>
    );
  }

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-700">
          Outras Músicas no Acervo
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          {totalSongs} música{totalSongs !== 1 ? 's' : ''} adiciona{totalSongs !== 1 ? 'is' : 'l'}
        </p>
      </div>

      <div className="space-y-3">
        {songs.map((song, index) => {
          const globalPosition = (currentPage - 1) * 5 + index + 6;
          
          return (
            <div key={song.id || index} className="group">
              <a 
                href={`https://www.youtube.com/watch?v=${song.youtube_id}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block transform hover:scale-[1.01] transition-all duration-200"
              >
                <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center group-hover:shadow-md hover:border-gray-300 transition-all">
                  <div className="mr-4">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 text-sm font-medium">
                      {globalPosition}
                    </div>
                  </div>
                  
                  <div className="flex-grow min-w-0">
                    <h4 className="font-medium text-gray-900 truncate group-hover:text-wood-700 transition-colors">
                      {song.titulo}
                    </h4>
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                      <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7s-8.268-2.943-9.542-7z" />
                        <circle cx="12" cy="12" r="3" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {formatViews(song.visualizacoes)}
                    </p>
                  </div>
                  
                  {song.thumb && (
                    <div className="ml-4 flex-shrink-0">
                      <img 
                        src={song.thumb} 
                        alt={song.titulo} 
                        className="w-16 h-10 object-cover rounded shadow-sm"
                      />
                    </div>
                  )}
                  
                  <div className="ml-3 text-gray-400 group-hover:text-gray-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </a>
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-6 pt-4 border-t border-gray-100">
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
    </div>
  );
};

export default DemaisMusicas;
