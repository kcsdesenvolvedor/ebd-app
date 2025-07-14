import React, { useState } from 'react';
import { DataProvider, useData } from './database/DataContext';
import './App.css';
import { PostCard } from './components/PostCard';
import { HashRouter as Router, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import Configuracao from './pages/Configuracao';
import LoginModal from './components/LoginModal';
import { validateUserSupabase } from './database/supabaseService';

function Home() {
  const { licoes } = useData();
  const [indice, setIndice] = useState(0);

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

  // Exibe o modal de login automaticamente ao acessar /configuracao se não autenticado
  const location = useLocation();
  React.useEffect(() => {
    if (location.pathname === '/configuracao' && !isAuth) {
      setLoginModalOpen(true);
    }
  }, [location.pathname, isAuth]);

  const handleLogin = async (login: string, senha: string) => {
    const valid = await validateUserSupabase(login, senha);
    if (valid) {
      setIsAuth(true);
      setLoginModalOpen(false);
      setLoginError(undefined);
      navigate('/configuracao', { replace: true });
    } else {
      setLoginError('Login ou senha inválidos');
    }
  };

  const handleCloseModal = () => {
    setLoginModalOpen(false);
    setLoginError(undefined);
    if (!isAuth) {
      navigate('/');
    }
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
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
