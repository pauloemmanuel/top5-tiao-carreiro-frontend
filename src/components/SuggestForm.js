import React, { useState } from 'react';
import { getFirstValidationError } from '../services/validationHelper';
import validateYoutubeUrl from '../helpers/validateYoutubeUrl';

const SuggestForm = ({ onSubmit, submitting = false }) => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // use shared helper validateYoutubeUrl

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!youtubeUrl.trim()) {
      setError('Por favor, insira um link do YouTube');
      return;
    }

    if (!validateYoutubeUrl(youtubeUrl)) {
      setError('Por favor, insira um link válido do YouTube');
      return;
    }

    const result = await onSubmit(youtubeUrl);
    if (result?.success) {
      setError('');
      const message = result.message || 'Sugestão enviada com sucesso! Aguarde a aprovação.';
      setSuccessMessage(message);
      setYoutubeUrl('');
      return;
    }
    if (result?.error) {
      // Se for erro 422, pega a primeira mensagem de validação
      if (result.errorObj && result.errorObj.response?.status === 422) {
        const msg = getFirstValidationError(result.errorObj);
        if (msg) {
          setError(msg);
          return;
        }
      }
      setError(result.error);
      return;
    }
  };

  return (
    <div className="card p-8">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-wood-700 mb-2 font-country">🎤 Sugerir Nova Música</h3>
        <p className="text-gray-600">Encontrou uma música incrível da dupla? Compartilhe conosco!</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="youtube-url" className="block text-sm font-medium text-gray-700 mb-2">Link do YouTube</label>
          <div className="relative">
            <input
              id="youtube-url"
              type="text"
              value={youtubeUrl}
              onChange={(e) => {
                setYoutubeUrl(e.target.value);
                setError('');
                setSuccessMessage('');
              }}
              placeholder="https://www.youtube.com/watch?v=..."
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-wood-500 transition-colors ${
                error ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-wood-500'
              }`}
              disabled={submitting}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
          </div>

          {error && (
            <p className="mt-2 text-sm text-red-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </p>
          )}

          {successMessage && (
            <p className="mt-2 text-sm text-green-700 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {successMessage}
            </p>
          )}
        </div>

        <button type="submit" disabled={submitting} className="btn-primary w-full flex items-center justify-center relative">
          {submitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Enviando...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Enviar Sugestão
            </>
          )}
        </button>
      </form>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Como funciona:</p>
            <ul className="space-y-1 text-blue-700">
              <li>• Cole o link de uma música do YouTube</li>
              <li>• Sua sugestão será analisada</li>
              <li>• Músicas aprovadas entram no ranking</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestForm;
