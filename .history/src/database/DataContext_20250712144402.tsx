import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { initDatabase, getProfessores, getLicoes, addProfessor, addLicao, updateLicao, deleteLicao, Professor, Licao } from './sqlite';

interface DataContextType {
  professores: Professor[];
  licoes: Licao[];
  carregarDados: () => Promise<void>;
  adicionarProfessor: (nome: string) => Promise<void>;
  adicionarLicao: (licao: Omit<Licao, 'id'>) => Promise<void>;
  editarLicao: (licao: Licao) => Promise<void>;
  removerLicao: (id: number) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [licoes, setLicoes] = useState<Licao[]>([]);

  const carregarDados = async () => {
    await initDatabase();
    setProfessores(getProfessores());
    setLicoes(getLicoes());
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const adicionarProfessor = async (nome: string) => {
    addProfessor(nome);
    setProfessores(getProfessores());
  };

  const adicionarLicao = async (licao: Omit<Licao, 'id'>) => {
    addLicao(licao);
    setLicoes(getLicoes());
  };

  const editarLicao = async (licao: Licao) => {
    updateLicao(licao);
    setLicoes(getLicoes());
  };

  const removerLicao = async (id: number) => {
    deleteLicao(id);
    setLicoes(getLicoes());
  };

  return (
    <DataContext.Provider value={{ professores, licoes, carregarDados, adicionarProfessor, adicionarLicao, editarLicao, removerLicao }}>
      {children}
    </DataContext.Provider>
  );
};

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData deve ser usado dentro de um DataProvider');
  }
  return context;
} 