import React, { useState } from 'react';
import { useData } from '../database/DataContext';
import { Licao } from '../database/sqlite';
import { useNavigate } from 'react-router-dom';

const initialForm = {
  numero: '',
  titulo: '',
  hinosSugeridos: '',
  professor: '',
  horario: '',
  igreja: '',
  endereco: '',
};

const Configuracao: React.FC = () => {
  const { adicionarLicao, editarLicao, removerLicao, licoes } = useData();
  const [form, setForm] = useState<Omit<Licao, 'id'> | (Licao & { id?: number })>(initialForm);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensagem('');
    try {
      if (editandoId !== null) {
        await editarLicao({ ...form, id: editandoId } as Licao);
        setMensagem('Lição editada com sucesso!');
      } else {
        await adicionarLicao(form as Omit<Licao, 'id'>);
        setMensagem('Lição salva com sucesso!');
      }
      setForm(initialForm);
      setEditandoId(null);
    } catch (err) {
      setMensagem('Erro ao salvar a lição.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditar = (licao: Licao) => {
    setForm({
      numero: licao.numero,
      titulo: licao.titulo,
      hinosSugeridos: licao.hinosSugeridos,
      professor: licao.professor,
      horario: licao.horario,
      igreja: licao.igreja,
      endereco: licao.endereco,
    });
    setEditandoId(licao.id);
    setMensagem('');
  };

  const handleRemover = async (id: number) => {
    if (window.confirm('Tem certeza que deseja remover esta lição?')) {
      setLoading(true);
      setMensagem('');
      try {
        await removerLicao(id);
        setMensagem('Lição removida com sucesso!');
        if (editandoId === id) {
          setForm(initialForm);
          setEditandoId(null);
        }
      } catch (err) {
        setMensagem('Erro ao remover a lição.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancelarEdicao = () => {
    setForm(initialForm);
    setEditandoId(null);
    setMensagem('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
      <button
        onClick={() => navigate('/')}
        className="self-start mr-4 mb-4 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition"
      >
        Voltar para tela inicial
      </button>
      <h1 className="text-3xl font-bold mb-4">Configuração de Lições</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md flex flex-col gap-3">
        <input type="text" name="numero" placeholder="Número da Lição" value={form.numero} onChange={handleChange} className="border rounded px-3 py-2" required />
        <input type="text" name="titulo" placeholder="Título da Lição" value={form.titulo} onChange={handleChange} className="border rounded px-3 py-2" required />
        <input type="text" name="hinosSugeridos" placeholder="Hinos Sugeridos" value={form.hinosSugeridos} onChange={handleChange} className="border rounded px-3 py-2" />
        <input type="text" name="professor" placeholder="Professor(a)" value={form.professor} onChange={handleChange} className="border rounded px-3 py-2" />
        <input type="text" name="horario" placeholder="Horário" value={form.horario} onChange={handleChange} className="border rounded px-3 py-2" />
        <input type="text" name="igreja" placeholder="Igreja" value={form.igreja} onChange={handleChange} className="border rounded px-3 py-2" />
        <input type="text" name="endereco" placeholder="Endereço" value={form.endereco} onChange={handleChange} className="border rounded px-3 py-2" />
        <div className="flex gap-2 mt-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition" disabled={loading}>
            {loading ? (editandoId !== null ? 'Salvando...' : 'Salvando...') : (editandoId !== null ? 'Salvar Edição' : 'Salvar Lição')}
          </button>
          {editandoId !== null && (
            <button type="button" onClick={handleCancelarEdicao} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition">
              Cancelar
            </button>
          )}
        </div>
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
                <div className="flex gap-2 mt-2">
                  <button onClick={() => handleEditar(licao)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition text-sm">Editar</button>
                  <button onClick={() => handleRemover(licao.id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition text-sm">Remover</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Configuracao; 