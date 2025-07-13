import React, { useState } from 'react';
import { DataProvider } from './database/DataContext';
import './App.css';
import { PostCard } from './components/PostCard';

const licoes = [
  {
    numeroLicao: '1',
    tituloLicao: 'A Criação do Mundo',
    hinosSugeridos: '15, 23, 45',
    professora: 'Maria Silva',
    horario: 'Domingo às 09h',
    igreja: 'AD FAMA SOLAR BOUGAINVILLE',
    endereco: 'Av. Orlando Marquês de Abreu, 123',
  },
  {
    numeroLicao: '2',
    tituloLicao: 'A Arca de Noé',
    hinosSugeridos: '12, 34, 56',
    professora: 'João Souza',
    horario: 'Domingo às 09h',
    igreja: 'AD FAMA SOLAR BOUGAINVILLE',
    endereco: 'Av. Orlando Marquês de Abreu, 123',
  },
  {
    numeroLicao: '3',
    tituloLicao: 'A Torre de Babel',
    hinosSugeridos: '22, 33, 44',
    professora: 'Ana Paula',
    horario: 'Domingo às 09h',
    igreja: 'AD FAMA SOLAR BOUGAINVILLE',
    endereco: 'Av. Orlando Marquês de Abreu, 123',
  },
];

function App() {
  const [indice, setIndice] = useState(0);

  const proximaLicao = () => {
    setIndice((prev) => (prev + 1) % licoes.length);
  };

  const licaoAnterior = () => {
    setIndice((prev) => (prev - 1 + licoes.length) % licoes.length);
  };

  return (
    <DataProvider>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
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
        </div>
        <PostCard {...licoes[indice]} />
      </div>
    </DataProvider>
  );
}

export default App;
