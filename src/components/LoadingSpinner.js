import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="card p-12 text-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-wood-200 rounded-full animate-spin border-t-wood-600"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl">🎵</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-wood-700">
            Carregando músicas...
          </h3>
          <p className="text-gray-600">
            Buscando as melhores da dupla sertaneja
          </p>
        </div>
        
        <div className="flex space-x-1 mt-4">
          <div className="w-2 h-2 bg-wood-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-wood-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-wood-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
