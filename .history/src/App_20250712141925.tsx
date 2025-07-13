import React, { useState } from 'react';
import { DataProvider } from './database/DataContext';
import './App.css';
import { PostCard } from './components/PostCard';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Configuracao from './pages/Configuracao';

const licoes = [
  {
    numeroLicao: '1',
    tituloLicao: 'A Criação do Mundo',
    hinosSugeridos: '15, 23, 45',
    professor: 'Maria Silva',
    horario: 'Domingo às 09h',
    igreja: 'AD FAMA SOLAR BOUGAINVILLE',
    endereco: 'Av. Orlando Marquês de Abreu, 123',
  },
  {
    numeroLicao: '2',
    tituloLicao: 'A Arca de Noé',
    hinosSugeridos: '12, 34, 56',
    professor: 'João Souza',
    horario: 'Domingo às 09h',
    igreja: 'AD FAMA SOLAR BOUGAINVILLE',
    endereco: 'Av. Orlando Marquês de Abreu, 123',
  },
  {
    numeroLicao: '3',
    tituloLicao: 'A Torre de Babel',
    hinosSugeridos: '22, 33, 44',
    professor: 'Ana Paula',
    horario: 'Domingo às 09h',
    igreja: 'AD FAMA SOLAR BOUGAINVILLE',
    endereco: 'Av. Orlando Marquês de Abreu, 123',
  },
];

function Home() {
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
        >
          Anterior
        </button>
        <button
          onClick={proximaLicao}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
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
      <PostCard {...licoes[indice]} />
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
