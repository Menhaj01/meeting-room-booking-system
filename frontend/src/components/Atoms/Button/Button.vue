<template>
  <button
    :disabled="disabled"
    :class="[buttonClasses, customClass]"
    @click="!disabled ? onClick($event) : null"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  onClick: {
    type: Function as unknown as () => (event: MouseEvent) => void,
    required: true,
  },
  variant: {
    type: String,
    default: 'default', // Default button style
  },
  size: {
    type: String,
    default: 'medium', // Size options: small, medium, large
  },
  customClass: {
    type: String,
    default: '', // Allow additional custom styles
  },
});

// Define variant styles
const variantStyles = {
  default: 'bg-gray-900 text-white hover:bg-gray-800',
  primary: 'bg-blue-600 text-white hover:bg-blue-500',
  secondary: 'bg-gray-500 text-white hover:bg-gray-400',
  danger: 'bg-red-600 text-white hover:bg-red-500',
};

// Define size styles
const sizeStyles = {
  small: 'px-4 py-2 text-sm',
  medium: 'px-6 py-3 text-base',
  large: 'px-8 py-4 text-lg',
};

// Computed classes for the button
const buttonClasses = computed(() => {
  return `
    ${variantStyles[props.variant as keyof typeof variantStyles] || variantStyles.default}
    ${sizeStyles[props.size as keyof typeof sizeStyles] || sizeStyles.medium}
    rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 
    focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed
  `;
});
</script>
