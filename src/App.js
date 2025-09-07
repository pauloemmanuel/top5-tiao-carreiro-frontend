import React, { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Ranking from './components/Ranking';
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

  // Atualiza ranking ao trocar para Top 5
  const handleViewChange = (view) => {
    setCurrentView(view);
    if (view === 'top5') {
      refreshSongs();
    }
  };

  const handleSubmit = async (youtubeUrl) => {
    setSubmitting(true);
    try {
      const response = await sugestoesService.enviarSugestao({ url_youtube: youtubeUrl });
      if (response.success) {
        await refreshSongs();
        return { success: true, message: response.message };
      }
      return { error: response.message || 'Erro ao enviar sugestão' };
    } catch (error) {
      console.error('Erro ao submeter sugestão:', error);
      if (error.response?.status === 409) {
        return { error: 'Esta música já foi sugerida' };
      }
      if (error.response?.status === 422) {
        return { error: 'Erro de validação', errorObj: error };
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
              onViewChange={handleViewChange} 
              onReloadTop5={refreshSongs}
            />
            
            {renderContent()}
          </div>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
