import Dexie from 'dexie'

export const db = new Dexie('VitalTechDB')

// Schema inicial da base de dados local (IndexedDB) para a Sprint 2
db.version(1).stores({
  usuarios: '++id, &login, nomeCompleto, perfil', // login unico indexado para validacoes (CA10.2)
  residentes: '++id, &cpf, nomeCompleto, dataNascimento, grauDependencia, responsavelLegal' // cpf unico indexado (CA01.1)
})

// Sprint 3: adiciona tabela de rotinas assistenciais
db.version(2).stores({
  usuarios: '++id, &login, nomeCompleto, perfil',
  residentes: '++id, &cpf, nomeCompleto, dataNascimento, grauDependencia, responsavelLegal',
  rotinas: '++id, residenteId, data, horario, tipo, status, createdAt' // indices para listagem/filtro (residente + data)
})