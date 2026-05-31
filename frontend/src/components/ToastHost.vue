<script setup>
import { removeToast, toastState } from '../stores/toast.js';
</script>

<template>
  <div class="toast-host" aria-live="polite" aria-atomic="true">
    <button
      v-for="toast in toastState.items"
      :key="toast.id"
      class="toast"
      :class="'toast-' + toast.type"
      type="button"
      @click="removeToast(toast.id)"
    >
      {{ toast.message }}
    </button>
  </div>
</template>
