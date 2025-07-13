import React, { useState } from 'react';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onLogin: (login: string, senha: string) => void;
  error?: string;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose, onLogin, error }) => {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(login, senha);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">&times;</button>
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Login"
            value={login}
            onChange={e => setLogin(e.target.value)}
            className="border rounded px-3 py-2"
            required
            autoFocus
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            className="border rounded px-3 py-2"
            required
          />
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal; 