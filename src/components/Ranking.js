import React from 'react';

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
          <div key={index} className="group">
            <a 
              href={song.url} 
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
                    {song.title}
                  </h3>
                  <p className="text-gray-600 flex items-center">
                    <span className="mr-2">👀</span>
                    {song.views} visualizações
                  </p>
                </div>
                
                {song.thumbnail && (
                  <div className="ml-6">
                    <img 
                      src={song.thumbnail} 
                      alt={song.title} 
                      className="w-32 h-20 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow"
                    />
                  </div>
                )}
                
                <div className="ml-4 text-wood-600 group-hover:text-wood-700 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ranking;
