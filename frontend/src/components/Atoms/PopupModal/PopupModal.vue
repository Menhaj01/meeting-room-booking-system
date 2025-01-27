<template>
  <div
    v-if="open"
    class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-40"
    @click.self="handleOverlayClick"
  >
    <div
      class="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

export type PopupModalProps = {
  open: boolean;
  onClose?: () => void;
};

const props = defineProps<PopupModalProps>();

const handleOverlayClick = () => {
  props.onClose?.();
};
</script>
