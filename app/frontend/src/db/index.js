import Dexie from 'dexie'

export const db = new Dexie('VitalTechDB')

// Schema inicial da base de dados local (IndexedDB) para a Sprint 2
db.version(1).stores({
  usuarios: '++id, &login, nome, perfil', // login único indexado para validações (CA10.2)
  residentes: '++id, &cpf, nome, dataNascimento, grauDependencia, responsavelLegal' // cpf único indexado (CA01.1)
})
