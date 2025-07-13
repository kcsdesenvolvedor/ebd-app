import React, { useState } from 'react';
import { useData } from '../database/DataContext';

const Configuracao: React.FC = () => {
  const { adicionarLicao } = useData();
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
        <input
          type="text"
          name="numero"
          placeholder="Número da Lição"
          value={form.numero}
          onChange={handleChange}
          className="border rounded px-3 py-2"
          required
        />
        <input
          type="text"
          name="titulo"
          placeholder="Título da Lição"
          value={form.titulo}
          onChange={handleChange}
          className="border rounded px-3 py-2"
          required
        />
        <input
          type="text"
          name="hinosSugeridos"
          placeholder="Hinos Sugeridos"
          value={form.hinosSugeridos}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          name="professor"
          placeholder="Professor(a)"
          value={form.professor}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          name="horario"
          placeholder="Horário"
          value={form.horario}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          name="igreja"
          placeholder="Igreja"
          value={form.igreja}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          name="endereco"
          placeholder="Endereço"
          value={form.endereco}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mt-2"
          disabled={loading}
        >
          {loading ? 'Salvando...' : 'Salvar Lição'}
        </button>
        {mensagem && <div className="text-center text-green-600 font-semibold mt-2">{mensagem}</div>}
      </form>
    </div>
  );
};

export default Configuracao; 