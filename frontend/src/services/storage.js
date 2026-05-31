const STORE_NAMES = ['usuarios', 'residentes'];

function createStoreMap(seed = {}) {
  return STORE_NAMES.reduce((stores, storeName) => {
    stores[storeName] = new Map();
    (seed[storeName] ?? []).forEach((item) => stores[storeName].set(item.id, item));
    return stores;
  }, {});
}

export function createMemoryStorage(seed = {}) {
  const stores = createStoreMap(seed);

  return {
    async list(storeName) {
      return Array.from(stores[storeName].values());
    },

    async get(storeName, id) {
      return stores[storeName].get(id) ?? null;
    },

    async findBy(storeName, field, value) {
      return Array.from(stores[storeName].values())
        .find((item) => item[field] === value) ?? null;
    },

    async put(storeName, item) {
      stores[storeName].set(item.id, item);
      return item;
    },

    async clear() {
      STORE_NAMES.forEach((storeName) => stores[storeName].clear());
    },
  };
}

function requestToPromise(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function transactionDone(transaction) {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
}

export function createIndexedDbStorage(dbName = 'vitaltech-sprint2', version = 1) {
  const indexedDb = globalThis.indexedDB;

  if (!indexedDb) {
    return createMemoryStorage();
  }

  let dbPromise;

  function openDb() {
    if (dbPromise) return dbPromise;

    dbPromise = new Promise((resolve, reject) => {
      const request = indexedDb.open(dbName, version);

      request.onupgradeneeded = () => {
        const db = request.result;

        if (!db.objectStoreNames.contains('usuarios')) {
          const usuariosStore = db.createObjectStore('usuarios', { keyPath: 'id' });
          usuariosStore.createIndex('login', 'login', { unique: true });
        }

        if (!db.objectStoreNames.contains('residentes')) {
          const residentesStore = db.createObjectStore('residentes', { keyPath: 'id' });
          residentesStore.createIndex('cpf', 'cpf', { unique: true });
          residentesStore.createIndex('isAtivo', 'isAtivo', { unique: false });
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    return dbPromise;
  }

  return {
    async list(storeName) {
      const db = await openDb();
      const transaction = db.transaction(storeName, 'readonly');
      return requestToPromise(transaction.objectStore(storeName).getAll());
    },

    async get(storeName, id) {
      const db = await openDb();
      const transaction = db.transaction(storeName, 'readonly');
      return (await requestToPromise(transaction.objectStore(storeName).get(id))) ?? null;
    },

    async findBy(storeName, field, value) {
      const db = await openDb();
      const transaction = db.transaction(storeName, 'readonly');
      const index = transaction.objectStore(storeName).index(field);
      return (await requestToPromise(index.get(value))) ?? null;
    },

    async put(storeName, item) {
      const db = await openDb();
      const transaction = db.transaction(storeName, 'readwrite');
      transaction.objectStore(storeName).put(item);
      await transactionDone(transaction);
      return item;
    },

    async clear() {
      const db = await openDb();
      const transaction = db.transaction(STORE_NAMES, 'readwrite');
      STORE_NAMES.forEach((storeName) => transaction.objectStore(storeName).clear());
      await transactionDone(transaction);
    },
  };
}

export const defaultStorage = createIndexedDbStorage();

