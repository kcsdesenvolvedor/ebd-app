import React, { useState } from 'react';
import { DataProvider, useData } from './database/DataContext';
import './App.css';
import { PostCard } from './components/PostCard';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import Configuracao from './pages/Configuracao';
import LoginModal from './components/LoginModal';
import { validateUser } from './database/sqlite';

function Home({ onConfigClick }: { onConfigClick: () => void }) {
  const { licoes } = useData();
  const [indice, setIndice] = useState(0);

  const proximaLicao = () => {
    setIndice((prev) => (prev + 1) % licoes.length);
  };

  const licaoAnterior = () => {
    setIndice((prev) => (prev - 1 + licoes.length) % licoes.length);
  };

  return (
    <div className="p-3 min-h-screen bg-gray-100 flex flex-col items-center justify-center">
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
          onClick={onConfigClick}
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          Configuração
        </button>
      </div>
      {licoes.length === 0 ? (
        <div className="text-gray-600 text-lg">Nenhuma lição cadastrada.</div>
      ) : (
        <PostCard
          numeroLicao={licoes[indice].numero}
          tituloLicao={licoes[indice].titulo}
          hinosSugeridos={licoes[indice].hinosSugeridos}
          professor={licoes[indice].professor}
          horario={licoes[indice].horario}
          igreja={licoes[indice].igreja}
          endereco={licoes[indice].endereco}
        />
      )}
    </div>
  );
}

function ProtectedRoute({ isAuth, children }: { isAuth: boolean; children: React.ReactNode }) {
  const location = useLocation();
  if (!isAuth) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}

function AppRoutes() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [loginError, setLoginError] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  const handleConfigClick = () => {
    if (!isAuth) {
      setLoginModalOpen(true);
    } else {
      navigate('/configuracao');
    }
  };

  const handleLogin = (login: string, senha: string) => {
    if (validateUser(login, senha)) {
      setIsAuth(true);
      setLoginModalOpen(false);
      setLoginError(undefined);
      navigate('/configuracao');
    } else {
      setLoginError('Login ou senha inválidos');
    }
  };

  const handleCloseModal = () => {
    setLoginModalOpen(false);
    setLoginError(undefined);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Home onConfigClick={handleConfigClick} />} />
        <Route
          path="/configuracao"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <Configuracao />
            </ProtectedRoute>
          }
        />
      </Routes>
      <LoginModal
        open={loginModalOpen}
        onClose={handleCloseModal}
        onLogin={handleLogin}
        error={loginError}
      />
    </>
  );
}

function App() {
  return (
    <DataProvider>
      <Router>
        <AppRoutes />
      </Router>
    </DataProvider>
  );
}

export default App;
