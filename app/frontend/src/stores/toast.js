import { defineStore } from 'pinia'

export const useToastStore = defineStore('toast', {
  state: () => ({
    toasts: [],
  }),
  actions: {
    show(message, type = 'success', duration = 3000) {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`
      this.toasts.push({ id, message, type })
      setTimeout(() => this.remove(id), duration)
    },
    remove(id) {
      this.toasts = this.toasts.filter((toast) => toast.id !== id)
    },
  },
})
