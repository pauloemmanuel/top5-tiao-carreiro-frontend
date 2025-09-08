import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="card p-6 text-center">
      <div className="relative inline-block">
        <div className="w-12 h-12 border-4 border-wood-200 rounded-full animate-spin border-t-wood-600"></div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-2xl">🎵</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
