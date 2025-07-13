import React from 'react';
import { DataProvider } from './database/DataContext';
import './App.css';
import { PostCard } from './components/PostCard';

function App() {
  return (
    <DataProvider>
      {/* Aqui futuramente entra o roteamento entre Home e Settings */}
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <PostCard
          numeroLicao="5"
          tituloLicao="O Evangelho do Filho de Deus – A Revelação da Luz ao Mundo"
          hinosSugeridos="15, 23, 45"
          professora="Maria Silva"
          horario="Domingo às 09h"
          igreja="AD FAMA SOLAR BOUGAINVILLE"
          endereco="Av. Orlando Marquês de Abreu, 123"
        />
      </div>
    </DataProvider>
  );
}

export default App;
