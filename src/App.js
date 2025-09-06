import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Ranking from './components/Ranking';
import SuggestForm from './components/SuggestForm';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Mock data para demonstração
  useEffect(() => {
    setTimeout(() => {
      setSongs([]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSubmit = async (youtubeUrl) => {
    setSubmitting(true);
    try {
      // TODO: Implementar chamada à API
      console.log('URL submetida:', youtubeUrl);
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Erro ao submeter:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <SuggestForm onSubmit={handleSubmit} submitting={submitting} />
          
          {loading ? (
            <LoadingSpinner />
          ) : (
            <Ranking songs={songs} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
