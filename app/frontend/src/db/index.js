import Dexie from 'dexie'

export const db = new Dexie('VitalTechDB')

// Schema inicial da base de dados local (IndexedDB) para a Sprint 2
db.version(1).stores({
  usuarios: '++id, &login, nomeCompleto, perfil', // login unico indexado para validacoes (CA10.2)
  residentes: '++id, &cpf, nomeCompleto, dataNascimento, grauDependencia, responsavelLegal' // cpf unico indexado (CA01.1)
})

// Stores da Sprint 3 para registros assistenciais locais e historico futuro
db.version(2).stores({
  usuarios: '++id, &login, nomeCompleto, perfil',
  residentes: '++id, &cpf, nomeCompleto, dataNascimento, grauDependencia, responsavelLegal',
  sinaisVitais: 'id, residenteId, registradoEm, responsavelId, tipoRegistro',
  rotinasAssistenciais: 'id, residenteId, registradoEm, responsavelId, tipoRegistro'
})