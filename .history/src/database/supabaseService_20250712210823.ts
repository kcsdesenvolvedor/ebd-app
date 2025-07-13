import { supabase } from './supabaseClient';

export interface Licao {
  id?: number;
  numero: string;
  titulo: string;
  hinosSugeridos: string;
  professor: string;
  horario: string;
  igreja: string;
  endereco: string;
}

export async function getLicoesSupabase(): Promise<Licao[]> {
  const { data, error } = await supabase
    .from('licoes')
    .select('*')
    .order('id', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function addLicaoSupabase(licao: Omit<Licao, 'id'>): Promise<void> {
  const { error } = await supabase.from('licoes').insert([licao]);
  if (error) throw error;
}

export async function updateLicaoSupabase(licao: Licao): Promise<void> {
  if (!licao.id) throw new Error('ID da lição é obrigatório para atualizar');
  const { error } = await supabase
    .from('licoes')
    .update({
      numero: licao.numero,
      titulo: licao.titulo,
      hinosSugeridos: licao.hinosSugeridos,
      professor: licao.professor,
      horario: licao.horario,
      igreja: licao.igreja,
      endereco: licao.endereco,
    })
    .eq('id', licao.id);
  if (error) throw error;
}

export async function deleteLicaoSupabase(id: number): Promise<void> {
  const { error } = await supabase.from('licoes').delete().eq('id', id);
  if (error) throw error;
} 