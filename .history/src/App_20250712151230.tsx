import React, { useState } from 'react';
import { DataProvider, useData } from './database/DataContext';
import './App.css';
import { PostCard } from './components/PostCard';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Configuracao from './pages/Configuracao';

function Home() {
  const { licoes } = useData();
  const [indice, setIndice] = useState(0);
  const navigate = useNavigate();

  const proximaLicao = () => {
    setIndice((prev) => (prev + 1) % licoes.length);
  };

  const licaoAnterior = () => {
    setIndice((prev) => (prev - 1 + licoes.length) % licoes.length);
  };

  return (
    <div className="p-2 min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="flex gap-4 mb-4">
        <button
          onClick={licaoAnterior}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          disabled={licoes.length === 0}
        >
          Anterior
        </button>
        <button
          onClick={proximaLicao}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          disabled={licoes.length === 0}
        >
          Próxima
        </button>
        <button
          onClick={() => navigate('/configuracao')}
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          Configuração
        </button>
      </div>
      {licoes.length === 0 ? (
        <div className="text-gray-600 text-lg">Nenhuma lição cadastrada.</div>
      ) : (
        <PostCard {...licoes[indice]} />
      )}
    </div>
  );
}

function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/configuracao" element={<Configuracao />} />
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
