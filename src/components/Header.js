import React from 'react';

const Header = () => {
  return (
    <header className="relative overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-wood-800 via-wood-700 to-primary-700"></div>
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url('/images/background.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="mb-8">
          <img 
            src="/images/tiao-carreiro-pardinho.png" 
            alt="Tião Carreiro & Pardinho" 
            className="w-48 h-48 mx-auto rounded-full border-4 border-white/80 shadow-2xl object-cover"
            style={{ objectPosition: 'center top' }}
          />
        </div>
        
        <div className="text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-shadow-lg font-country">
            Top 5 Músicas Mais Tocadas
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium opacity-90 font-country">
            Tião Carreiro & Pardinho
          </h2>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-4 left-4 text-white/20 text-6xl">🎵</div>
        <div className="absolute top-8 right-8 text-white/20 text-4xl">🎸</div>
        <div className="absolute bottom-4 left-8 text-white/20 text-5xl">♪</div>
        <div className="absolute bottom-8 right-4 text-white/20 text-3xl">♫</div>
      </div>
    </header>
  );
};

export default Header;
