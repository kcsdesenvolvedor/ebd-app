import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getLicoesSupabase, addLicaoSupabase, updateLicaoSupabase, deleteLicaoSupabase, Licao } from './supabaseService';
// import { initDatabase, getProfessores, addProfessor, Professor } from './sqlite';

interface DataContextType {
  // professores: Professor[];
  licoes: Licao[];
  carregarDados: () => Promise<void>;
  // adicionarProfessor: (nome: string) => Promise<void>;
  adicionarLicao: (licao: Omit<Licao, 'id'>) => Promise<void>;
  editarLicao: (licao: Licao) => Promise<void>;
  removerLicao: (id: number) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  // const [professores, setProfessores] = useState<Professor[]>([]);
  const [licoes, setLicoes] = useState<Licao[]>([]);

  const carregarDados = async () => {
    // await initDatabase();
    // setProfessores(getProfessores());
    const licoesDb = await getLicoesSupabase();
    setLicoes(licoesDb);
  };

  useEffect(() => {
    carregarDados();
  }, []);

  // const adicionarProfessor = async (nome: string) => {
  //   addProfessor(nome);
  //   setProfessores(getProfessores());
  // };

  const adicionarLicao = async (licao: Omit<Licao, 'id'>) => {
    await addLicaoSupabase(licao);
    await carregarDados();
  };

  const editarLicao = async (licao: Licao) => {
    await updateLicaoSupabase(licao);
    await carregarDados();
  };

  const removerLicao = async (id: number) => {
    await deleteLicaoSupabase(id);
    await carregarDados();
  };

  return (
    <DataContext.Provider value={{ licoes, carregarDados, adicionarLicao, editarLicao, removerLicao }}>
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