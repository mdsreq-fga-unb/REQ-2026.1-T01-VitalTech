const SESSION_KEY = 'vitaltech.session';

export function createMemorySessionStorage() {
  let session = null;

  return {
    async get() {
      return session;
    },

    async set(nextSession) {
      session = nextSession;
      return session;
    },

    async clear() {
      session = null;
    },
  };
}

export function createBrowserSessionStorage(storageKey = SESSION_KEY) {
  // Usa sessionStorage (não localStorage) para que a sessão seja apagada
  // automaticamente quando o usuário fecha o browser ou a aba (RNF11)
  const sessionStorageRef = globalThis.sessionStorage;

  if (!sessionStorageRef) {
    return createMemorySessionStorage();
  }

  return {
    async get() {
      const rawSession = sessionStorageRef.getItem(storageKey);
      return rawSession ? JSON.parse(rawSession) : null;
    },

    async set(nextSession) {
      sessionStorageRef.setItem(storageKey, JSON.stringify(nextSession));
      return nextSession;
    },

    async clear() {
      sessionStorageRef.removeItem(storageKey);
    },
  };
}

export const defaultSessionStorage = createBrowserSessionStorage();

