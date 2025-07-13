import React from 'react';
import { DataProvider } from './database/DataContext';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <DataProvider>
      {/* Aqui futuramente entra o roteamento entre Home e Settings */}
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <h1 className="text-2xl font-bold">EBD App</h1>
      </div>
    </DataProvider>
  );
}

export default App;
