import React from 'react';
import DemaisMusicas from './DemaisMusicas';
import formatViews from '../helpers/formatViews';

const Ranking = ({ songs, error }) => {
  if (error) {
    return (
      <div className="card p-12 text-center">
        <div className="text-6xl mb-6">🎵</div>
        <h3 className="text-2xl font-bold text-wood-700 mb-4">
          Erro ao listar as músicas.
        </h3>
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

  // using shared formatViews helper

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-wood-700 font-country">
          🏆 Ranking Atual
        </h2>
        <p className="text-gray-600 mt-2">As músicas mais tocadas da dupla</p>
      </div>
      
      <div className="space-y-4">
        {songs.map((song, index) => (
          <div key={song.id || index} className="group">
            <a 
              href={`https://www.youtube.com/watch?v=${song.youtube_id}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block transform hover:scale-[1.02] transition-all duration-300"
            >
              <div className="card p-6 flex items-center group-hover:shadow-2xl">
                <div className="music-rank mr-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-wood-600 to-wood-800 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {index + 1}
                  </div>
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-wood-700 transition-colors">
                    {song.titulo}
                  </h3>
                  <p className="text-gray-600 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7s-8.268-2.943-9.542-7z" />
                      <circle cx="12" cy="12" r="3" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {formatViews(song.visualizacoes)} visualizações
                  </p>
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
        ))}
      </div>

      <DemaisMusicas />
    </div>
  );
};

export default Ranking;
