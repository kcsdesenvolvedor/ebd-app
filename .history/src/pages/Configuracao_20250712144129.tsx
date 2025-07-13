import React, { useState } from 'react';
import { useData } from '../database/DataContext';

const Configuracao: React.FC = () => {
  const { adicionarLicao, licoes } = useData();
  const [form, setForm] = useState({
    numero: '',
    titulo: '',
    hinosSugeridos: '',
    professor: '',
    horario: '',
    igreja: '',
    endereco: '',
  });
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensagem('');
    try {
      await adicionarLicao(form);
      setMensagem('Lição salva com sucesso!');
      setForm({
        numero: '',
        titulo: '',
        hinosSugeridos: '',
        professor: '',
        horario: '',
        igreja: '',
        endereco: '',
      });
    } catch (err) {
      setMensagem('Erro ao salvar a lição.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
      <h1 className="text-3xl font-bold mb-4">Configuração de Lições</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md flex flex-col gap-3">
        {/* Campos do formulário */}
        <input type="text" name="numero" placeholder="Número da Lição" value={form.numero} onChange={handleChange} className="border rounded px-3 py-2" required />
        <input type="text" name="titulo" placeholder="Título da Lição" value={form.titulo} onChange={handleChange} className="border rounded px-3 py-2" required />
        <input type="text" name="hinosSugeridos" placeholder="Hinos Sugeridos" value={form.hinosSugeridos} onChange={handleChange} className="border rounded px-3 py-2" />
        <input type="text" name="professor" placeholder="Professor(a)" value={form.professor} onChange={handleChange} className="border rounded px-3 py-2" />
        <input type="text" name="horario" placeholder="Horário" value={form.horario} onChange={handleChange} className="border rounded px-3 py-2" />
        <input type="text" name="igreja" placeholder="Igreja" value={form.igreja} onChange={handleChange} className="border rounded px-3 py-2" />
        <input type="text" name="endereco" placeholder="Endereço" value={form.endereco} onChange={handleChange} className="border rounded px-3 py-2" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mt-2" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar Lição'}
        </button>
        {mensagem && <div className="text-center text-green-600 font-semibold mt-2">{mensagem}</div>}
      </form>

      {/* Lista de lições cadastradas */}
      <div className="w-full max-w-md mt-8">
        <h2 className="text-xl font-bold mb-2">Lições cadastradas</h2>
        {licoes.length === 0 ? (
          <div className="text-gray-600">Nenhuma lição cadastrada ainda.</div>
        ) : (
          <ul className="space-y-2">
            {licoes.map(licao => (
              <li key={licao.id} className="bg-white rounded shadow p-3">
                <div className="font-bold">Lição {licao.numero}: {licao.titulo}</div>
                <div className="text-sm text-gray-700">Professor(a): {licao.professor}</div>
                <div className="text-sm text-gray-700">Hinos: {licao.hinosSugeridos}</div>
                <div className="text-sm text-gray-700">Horário: {licao.horario}</div>
                <div className="text-sm text-gray-700">Igreja: {licao.igreja}</div>
                <div className="text-sm text-gray-700">Endereço: {licao.endereco}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Configuracao; 