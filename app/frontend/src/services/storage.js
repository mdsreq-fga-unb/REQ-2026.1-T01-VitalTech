import { db } from '../db/index.js'

// Nomes das tabelas no Dexie
const STORE_NAMES = ['usuarios', 'residentes', 'sinaisVitais', 'rotinasAssistenciais']

// Armazenamento em memória (fallback caso o IndexedDB/Dexie falhe)
export function createMemoryStorage(seed = {}) {
  const stores = STORE_NAMES.reduce((acc, name) => {
    acc[name] = new Map()
    ;(seed[name] ?? []).forEach((item) => acc[name].set(item.id, item))
    return acc
  }, {})

  function getStore(storeName) {
    if (!stores[storeName]) {
      stores[storeName] = new Map()
    }

    return stores[storeName]
  }

  return {
    async list(storeName) {
      return Array.from(getStore(storeName).values())
    },

    async get(storeName, id) {
      return getStore(storeName).get(id) ?? null
    },

    async findBy(storeName, field, value) {
      return Array.from(getStore(storeName).values())
        .find((item) => item[field] === value) ?? null
    },

    async put(storeName, item) {
      getStore(storeName).set(item.id, item)
      return item
    },

    async clear() {
      STORE_NAMES.forEach((name) => stores[name].clear())
    }
  }
}

// Armazenamento principal integrado ao Dexie.js
export function createDexieStorage() {
  return {
    // Lista todos os registros de uma tabela
    async list(storeName) {
      try {
        return await db[storeName].toArray()
      } catch (error) {
        console.error(`Erro ao listar ${storeName} no Dexie:`, error)
        return []
      }
    },

    // Obtém um registro pelo ID primário
    async get(storeName, id) {
      try {
        return (await db[storeName].get(id)) ?? null
      } catch (error) {
        console.error(`Erro ao obter ${id} em ${storeName} no Dexie:`, error)
        return null
      }
    },

    // Busca um registro por um campo indexado (ex: login ou cpf)
    async findBy(storeName, field, value) {
      try {
        return (await db[storeName].where(field).equals(value).first()) ?? null
      } catch (error) {
        console.error(`Erro ao buscar por ${field}=${value} em ${storeName} no Dexie:`, error)
        return null
      }
    },

    // Insere ou atualiza um registro no banco de dados local
    async put(storeName, item) {
      try {
        await db[storeName].put(item)
        return item
      } catch (error) {
        console.error(`Erro ao salvar item em ${storeName} no Dexie:`, error)
        throw error
      }
    },

    // Limpa todas as tabelas
    async clear() {
      try {
        await Promise.all(STORE_NAMES.map((name) => db[name].clear()))
      } catch (error) {
        console.error('Erro ao limpar tabelas no Dexie:', error)
      }
    }
  }
}

// Exporta o storage padrão baseado no Dexie.js
export const defaultStorage = createDexieStorage()

// Alias para compatibilidade com outras partes do sistema
export const createIndexedDbStorage = createDexieStorage
