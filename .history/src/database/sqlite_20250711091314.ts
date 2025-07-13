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
}

let SQL: SqlJsStatic | null = null;
let db: Database | null = null;

// Inicializa o banco de dados SQLite
export async function initDatabase() {
  if (!SQL) {
    SQL = await initSqlJs({
      locateFile: (file: string) => `https://sql.js.org/dist/${file}`,
    });
  }
  if (!db) {
    db = new SQL.Database();
    createTables();
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
      hinosSugeridos TEXT NOT NULL
    );
  `);
}

// CRUD de Professores
export function addProfessor(nome: string) {
  if (!db) return;
  db.run('INSERT INTO professores (nome) VALUES (?);', [nome]);
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
  db.run('INSERT INTO licoes (numero, titulo, hinosSugeridos) VALUES (?, ?, ?);', [licao.numero, licao.titulo, licao.hinosSugeridos]);
}

export function getLicoes(): Licao[] {
  if (!db) return [];
  const res = db.exec('SELECT * FROM licoes;');
  if (res.length === 0) return [];
  return res[0].values.map((row: any[]) => ({ id: row[0] as number, numero: row[1] as string, titulo: row[2] as string, hinosSugeridos: row[3] as string }));
} 