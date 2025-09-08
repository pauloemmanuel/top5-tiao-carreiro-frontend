import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Navigation = ({ currentView, onViewChange, onReloadTop5 }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return null; // Usuário não logado não verá o menu
  }

  const navItems = [
    {
      id: 'top5',
      label: 'Ranking Completo',
      icon: '🥇', // Alterado para medalha de ouro
      description: 'Top 5 + acervo completo'
    }
  ];

  // Adicionar item admin se o usuário for admin
  if (isAdmin) {
    navItems.push({
      id: 'admin',
      label: 'Admin',
      icon: '⚙️',
      description: 'Gerenciar músicas'
    });
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-8">
      <nav className="flex flex-wrap justify-center gap-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              if (item.id === 'top5' && currentView === 'top5' && onReloadTop5) {
                onReloadTop5();
              } else {
                onViewChange(item.id);
              }
            }}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
              ${currentView === item.id
                ? 'bg-wood-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100 hover:text-wood-700'
              }
            `}
          >
            <span className="text-lg">{item.icon}</span>
            <div className="text-left">
              <div className="font-semibold">{item.label}</div>
              <div className={`text-xs ${
                currentView === item.id ? 'text-white/80' : 'text-gray-500'
              }`}>
                {item.description}
              </div>
            </div>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Navigation;
