<template>
  <button
    :disabled="disabled"
    :class="[buttonClasses, customClass]"
    @click="!disabled ? onClick($event) : null"
  >
    <span v-if="label" class="mr-2">{{ label }}</span>
    <slot v-else></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    required: false,
  },
  onClick: {
    type: Function as unknown as () => (event: MouseEvent) => void,
    required: true,
  },
  variant: {
    type: String,
    default: 'default',
  },
  size: {
    type: String,
    default: 'medium',
  },
  customClass: {
    type: String,
    default: '',
  },
});

const variantStyles = {
  default:
    'bg-gray-900 text-white hover:bg-gray-800 px-4 py-2 mt-6 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
  closeButton:
    'inline-flex text-gray-400 hover:text-gray-500 focus:outline-none',
};

const sizeStyles = {
  small: 'px-4 py-2 text-sm',
  medium: 'px-6 py-3 text-base',
  large: 'px-8 py-4 text-lg',
};

const buttonClasses = computed(() => {
  return `
    ${variantStyles[props.variant as keyof typeof variantStyles] || variantStyles.default}
    ${sizeStyles[props.size as keyof typeof sizeStyles] || sizeStyles.medium}
    rounded-lg  transition-colors disabled:opacity-50 disabled:cursor-not-allowed
  `;
});
</script>
