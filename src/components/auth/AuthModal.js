import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import LoginForm from './LoginForm';

const AuthModal = ({ isOpen, onClose }) => {
  const { isAuthenticated, user, logout } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md z-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-wood-800">
            {isAuthenticated ? 'Minha Conta' : 'Entrar'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {isAuthenticated ? (
          <div className="space-y-4">
            <div className="p-4 bg-wood-50 rounded-lg border border-wood-200">
              <p className="font-medium text-wood-800">Olá, {user.name}!</p>
              <p className="text-sm text-gray-600 mt-1">{user.email}</p>
            </div>
            
            <button 
              onClick={logout}
              className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              Sair
            </button>
          </div>
        ) : (
          <div className="mt-2">
            <LoginForm onClose={onClose} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
