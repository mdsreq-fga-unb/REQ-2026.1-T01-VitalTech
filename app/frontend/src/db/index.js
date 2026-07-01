import Dexie from 'dexie'
import { TIPOS_REGISTRO_OCORRENCIA } from '../constants/ocorrencia.js';

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

// Stores da Sprint 5: separando ocorrencias
db.version(3).stores({
  usuarios: '++id, &login, nomeCompleto, perfil',
  residentes: '++id, &cpf, nomeCompleto, dataNascimento, grauDependencia, responsavelLegal',
  sinaisVitais: 'id, residenteId, registradoEm, responsavelId, tipoRegistro',
  rotinasAssistenciais: 'id, residenteId, registradoEm, responsavelId, tipoRegistro',
  ocorrencias: 'id, residenteId, registradoEm, responsavelId, tipoRegistro'
}).upgrade(tx => {
  return tx.rotinasAssistenciais.toArray().then(rotinas => {
    const ocorrencias = rotinas.filter(r => TIPOS_REGISTRO_OCORRENCIA.includes(r.tipoRegistro));
    if (ocorrencias.length === 0) return;

    const ids = ocorrencias.map(o => o.id);
    return tx.ocorrencias.bulkAdd(ocorrencias)
      .then(() => tx.rotinasAssistenciais.bulkDelete(ids))
      .catch((error) => {
        console.error(
          'Falha ao migrar ocorrencias clinicas para a store dedicada. A atualizacao do banco local sera revertida (rollback automatico do Dexie).',
          error,
        );
        throw error;
      });
  });
});
