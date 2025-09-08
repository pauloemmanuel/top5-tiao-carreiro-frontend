import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import AdminSuggestions from './AdminSuggestions';
import AdminMusicas from './AdminMusicas';

const AdminTabs = () => {
  const [activeTab, setActiveTab] = useState('suggestions');

  const tabs = [
    { id: 'suggestions', label: 'Sugestões', icon: '💡' },
    { id: 'musicas', label: 'Músicas', icon: '🎵' }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white text-wood-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {activeTab === 'suggestions' && <AdminSuggestions />}
        {activeTab === 'musicas' && <AdminMusicas />}
      </div>
    </AdminLayout>
  );
};

export default AdminTabs;
