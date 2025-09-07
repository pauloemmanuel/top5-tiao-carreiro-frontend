import React, { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Ranking from './components/Ranking';
import AllSongs from './components/AllSongs';
import SuggestForm from './components/SuggestForm';
import LoadingSpinner from './components/LoadingSpinner';
import AdminLayout from './components/admin/AdminLayout';
import AdminSuggestions from './components/admin/AdminSuggestions';
import { AuthProvider } from './contexts/AuthContext';
import { sugestoesService } from './services';
import useTop5 from './hooks/useTop5';

function App() {
  const { songs, loading, error, refreshSongs } = useTop5();
  const [submitting, setSubmitting] = useState(false);
  const [currentView, setCurrentView] = useState('top5');

  const handleSubmit = async (youtubeUrl) => {
    setSubmitting(true);
    try {
      const response = await sugestoesService.enviarSugestao({ url: youtubeUrl });
      if (response.data?.success) {
        // Atualizar a lista após enviar com sucesso
        await refreshSongs();
      }
      return { success: true };
    } catch (error) {
      console.error('Erro ao submeter sugestão:', error);
      // Tratar erros específicos como duplicação (409)
      if (error.response?.status === 409) {
        return { error: 'Esta música já foi sugerida' };
      }
      return { error: 'Erro ao enviar sugestão' };
    } finally {
      setSubmitting(false);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'top5':
        return (
          <div className="space-y-8">
            <SuggestForm onSubmit={handleSubmit} submitting={submitting} />
            
            {loading ? (
              <LoadingSpinner />
            ) : (
              <Ranking songs={songs} error={error} />
            )}
          </div>
        );
      
      case 'all-songs':
        return <AllSongs />;
      
      case 'admin':
        return (
          <AdminLayout>
            <AdminSuggestions />
          </AdminLayout>
        );
      
      default:
        return (
          <div className="space-y-8">
            <SuggestForm onSubmit={handleSubmit} submitting={submitting} />
            
            {loading ? (
              <LoadingSpinner />
            ) : (
              <Ranking songs={songs} error={error} />
            )}
          </div>
        );
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
        <Header />
        
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="space-y-8">
            <Navigation 
              currentView={currentView} 
              onViewChange={setCurrentView} 
            />
            
            {renderContent()}
          </div>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
