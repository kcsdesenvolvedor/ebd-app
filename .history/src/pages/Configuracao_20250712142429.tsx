import React, { useState } from 'react';

const Configuracao: React.FC = () => {
  const [form, setForm] = useState({
    numeroLicao: '',
    tituloLicao: '',
    hinosSugeridos: '',
    professor: '',
    horario: '',
    igreja: '',
    endereco: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui futuramente vamos salvar no banco
    alert('Lição salva! (mock)');
    setForm({
      numeroLicao: '',
      tituloLicao: '',
      hinosSugeridos: '',
      professor: '',
      horario: '',
      igreja: '',
      endereco: '',
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
      <h1 className="text-3xl font-bold mb-4">Configuração de Lições</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md flex flex-col gap-3">
        <input
          type="text"
          name="numeroLicao"
          placeholder="Número da Lição"
          value={form.numeroLicao}
          onChange={handleChange}
          className="border rounded px-3 py-2"
          required
        />
        <input
          type="text"
          name="tituloLicao"
          placeholder="Título da Lição"
          value={form.tituloLicao}
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
        >
          Salvar Lição
        </button>
      </form>
    </div>
  );
};

export default Configuracao; 