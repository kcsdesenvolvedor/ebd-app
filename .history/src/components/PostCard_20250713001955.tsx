import React from 'react';
import { BookOpen, User, Clock } from 'lucide-react';

interface PostCardProps {
  numeroLicao: string;
  tituloLicao: string;
  hinosSugeridos: string;
  professor: string;
  horario?: string;
  igreja?: string;
  endereco?: string;
}

export const PostCard: React.FC<PostCardProps> = ({
  numeroLicao,
  tituloLicao,
  hinosSugeridos,
  professor,
  horario = 'Amanhã às 09h',
  igreja = 'AD FAMA SOLAR BOUGAINVILLE',
  endereco = 'Av. Orlando Marquês de Abreu',
}) => {
  return (
    <div
      className="w-full max-w-md mx-auto rounded-2xl shadow-lg p-4 relative overflow-hidden bg-cover bg-center flex flex-col items-center"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/background.png)` }}
    >
      {/* Título principal */}
      <div className="text-white text-5xl font-extrabold text-center drop-shadow-lg mt-2">EBD</div>
      <div className="text-white text-lg font-semibold text-center mb-2 drop-shadow">Escola Bíblica Dominical</div>
      {/* Lição */}
      <div className="absolute top-4 right-4 bg-white/80 rounded-full px-5 py-2 text-gray-800 font-bold text-lg shadow">
        Lição {numeroLicao}
      </div>
      {/* Tema */}
      <div className="mt-6 text-white font-bold text-lg text-center">Tema:</div>
      <div className="bg-white/80 rounded-full px-4 py-2 mt-1 mb-2 text-blue-900 font-bold text-center text-base shadow flex items-center justify-center">
        <BookOpen className="w-5 h-5 mr-2 text-blue-700" />
        <span>{tituloLicao}</span>
      </div>
      {/* Hinos sugeridos */}
      <div className="text-white text-sm font-semibold text-center mb-2">
        HINOS SUGERIDOS: <span className="font-normal">{hinosSugeridos}</span>
      </div>
      {/* Professora */}
      <div className="text-white font-bold text-lg text-center mt-2">Professor:</div>
      <div className="text-white text-3xl font-extrabold text-center mb-2 flex items-center justify-center">
        <User className="w-7 h-7 mr-2 text-white" />
        {professor}
      </div>
      {/* Horário */}
      <div className="bg-yellow-400 rounded-lg px-4 py-2 text-gray-900 font-bold text-lg text-center mb-2 flex items-center justify-center">
        <Clock className="w-5 h-5 mr-2 text-gray-900" />
        {horario}
      </div>
      {/* Igreja e endereço */}
      <div className="text-white text-sm font-bold text-center mt-2">
        {igreja}
      </div>
      <div className="text-white text-xs text-center mb-2">
        {endereco}
      </div>
    </div>
  );
}; 