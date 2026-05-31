import { reactive } from 'vue';

export const toastState = reactive({
  items: [],
});

export function showToast(message, type = 'success') {
  const toast = {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    message,
    type,
  };

  toastState.items.push(toast);
  window.setTimeout(() => removeToast(toast.id), 3600);
}

export function removeToast(id) {
  const index = toastState.items.findIndex((item) => item.id === id);
  if (index >= 0) {
    toastState.items.splice(index, 1);
  }
}
