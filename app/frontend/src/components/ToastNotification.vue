<script setup>
import { useToastStore } from '../stores/toast.js'

const toastStore = useToastStore()
</script>

<template>
  <div class="toast-region" aria-live="polite" aria-atomic="true">
    <div
      v-for="toast in toastStore.toasts"
      :key="toast.id"
      class="toast"
      :class="`toast-${toast.type}`"
    >
      <span>{{ toast.message }}</span>
    </div>
  </div>
</template>

<style scoped>
.toast-region {
  position: fixed;
  left: 50%;
  bottom: 24px;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 300;
  pointer-events: none;
}

.toast {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 260px;
  max-width: min(420px, calc(100vw - 32px));
  padding: 12px 18px;
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.toast-success {
  background: #276749;
}

.toast-error {
  background: #c53030;
}

.toast-warning {
  background: #b7791f;
}

</style>
