<template>
  <TransitionGroup
    enter-active-class="transform ease-out duration-300 transition"
    enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
    leave-active-class="transition ease-in duration-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
    class="fixed inset-0 z-50 flex flex-col items-end justify-start gap-2 p-4 pointer-events-none"
  >
    <div
      v-for="alert in alerts"
      :key="alert.id"
      class="w-full max-w-sm overflow-hidden rounded-lg shadow-lg pointer-events-auto"
      :class="{
        'bg-green-50 border border-green-200': alert.type === 'success',
        'bg-red-50 border border-red-200': alert.type === 'error',
      }"
    >
      <div class="p-4">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg
              v-if="alert.type === 'success'"
              class="w-5 h-5 text-green-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              v-else
              class="w-5 h-5 text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3 w-0 flex-1">
            <p
              class="text-sm font-medium"
              :class="{
                'text-green-800': alert.type === 'success',
                'text-red-800': alert.type === 'error',
              }"
            >
              {{ alert.message }}
            </p>
          </div>
          <div class="ml-4 flex-shrink-0 flex">
            <button
              @click="removeAlert(alert.id)"
              class="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <span class="sr-only">Close</span>
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Alert {
  id: number;
  type: 'success' | 'error';
  message: string;
}

const alerts = ref<Alert[]>([]);
let nextId = 0;

const addAlert = (type: 'success' | 'error', message: string) => {
  const id = nextId++;
  alerts.value.push({ id, type, message });
  setTimeout(() => removeAlert(id), 5000);
};

const removeAlert = (id: number) => {
  alerts.value = alerts.value.filter((alert) => alert.id !== id);
};

defineExpose({
  addAlert,
});
</script>
