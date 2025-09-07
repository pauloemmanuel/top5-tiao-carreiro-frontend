import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const AdminLayout = ({ children }) => {
  const { user, isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="card p-12 text-center">
        <div className="text-6xl mb-6">🔒</div>
        <h3 className="text-2xl font-bold text-wood-700 mb-4">
          Acesso Restrito
        </h3>
        <p className="text-gray-600">
          Você precisa estar logado para acessar esta área.
        </p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="card p-12 text-center">
        <div className="text-6xl mb-6">⛔</div>
        <h3 className="text-2xl font-bold text-wood-700 mb-4">
          Acesso Negado
        </h3>
        <p className="text-gray-600">
          Você não tem permissão para acessar esta área administrativa.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-wood-100 border border-wood-200 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">👨‍💼</div>
          <div>
            <h4 className="font-semibold text-wood-800">Área Administrativa</h4>
            <p className="text-sm text-wood-600">
              Logado como: {user?.name || user?.email}
            </p>
          </div>
        </div>
      </div>
      
      {children}
    </div>
  );
};

export default AdminLayout;
