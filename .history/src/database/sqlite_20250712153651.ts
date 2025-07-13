import initSqlJs, { Database, SqlJsStatic } from 'sql.js';

// Tipos para professores e lições
export interface Professor {
  id: number;
  nome: string;
}

export interface Licao {
  id: number;
  numero: string;
  titulo: string;
  hinosSugeridos: string;
  professor: string;
  horario: string;
  igreja: string;
  endereco: string;
}

let SQL: SqlJsStatic | null = null;
let db: Database | null = null;

const LOCALSTORAGE_KEY = 'ebd-sqlite-db';

function saveToLocalStorage() {
  if (db) {
    const data = db.export();
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(Array.from(data)));
  }
}

function restoreFromLocalStorage(): Uint8Array | null {
  const data = localStorage.getItem(LOCALSTORAGE_KEY);
  if (data) {
    return new Uint8Array(JSON.parse(data));
  }
  return null;
}

// Inicializa o banco de dados SQLite
export async function initDatabase() {
  if (!SQL) {
    SQL = await initSqlJs({
      locateFile: (file: string) => `https://sql.js.org/dist/${file}`,
    });
  }
  if (!db) {
    const saved = restoreFromLocalStorage();
    if (saved) {
      db = new SQL.Database(saved);
    } else {
      db = new SQL.Database();
      createTables();
      saveToLocalStorage();
    }
  }
  return db;
}

function createTables() {
  if (!db) return;
  db.run(`
    CREATE TABLE IF NOT EXISTS professores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS licoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      numero TEXT NOT NULL,
      titulo TEXT NOT NULL,
      hinosSugeridos TEXT NOT NULL,
      professor TEXT NOT NULL,
      horario TEXT NOT NULL,
      igreja TEXT NOT NULL,
      endereco TEXT NOT NULL
    );
  `);
}

// CRUD de Professores
export function addProfessor(nome: string) {
  if (!db) return;
  db.run('INSERT INTO professores (nome) VALUES (?);', [nome]);
  saveToLocalStorage();
}

export function getProfessores(): Professor[] {
  if (!db) return [];
  const res = db.exec('SELECT * FROM professores;');
  if (res.length === 0) return [];
  return res[0].values.map((row: any[]) => ({ id: row[0] as number, nome: row[1] as string }));
}

// CRUD de Lições
export function addLicao(licao: Omit<Licao, 'id'>) {
  if (!db) return;
  db.run(
    'INSERT INTO licoes (numero, titulo, hinosSugeridos, professor, horario, igreja, endereco) VALUES (?, ?, ?, ?, ?, ?, ?);',
    [licao.numero, licao.titulo, licao.hinosSugeridos, licao.professor, licao.horario, licao.igreja, licao.endereco]
  );
  saveToLocalStorage();
}

export function getLicoes(): Licao[] {
  if (!db) return [];
  const res = db.exec('SELECT * FROM licoes;');
  if (res.length === 0) return [];
  return res[0].values.map((row: any[]) => ({
    id: row[0] as number,
    numero: row[1] as string,
    titulo: row[2] as string,
    hinosSugeridos: row[3] as string,
    professor: row[4] as string,
    horario: row[5] as string,
    igreja: row[6] as string,
    endereco: row[7] as string,
  }));
}

export function updateLicao(licao: Licao) {
  if (!db) return;
  db.run(
    'UPDATE licoes SET numero = ?, titulo = ?, hinosSugeridos = ?, professor = ?, horario = ?, igreja = ?, endereco = ? WHERE id = ?;',
    [licao.numero, licao.titulo, licao.hinosSugeridos, licao.professor, licao.horario, licao.igreja, licao.endereco, licao.id]
  );
  saveToLocalStorage();
}

export function deleteLicao(id: number) {
  if (!db) return;
  db.run('DELETE FROM licoes WHERE id = ?;', [id]);
  saveToLocalStorage();
} 