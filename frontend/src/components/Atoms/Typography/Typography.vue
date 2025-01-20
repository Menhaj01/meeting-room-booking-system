<template>
  <component :is="tag" :class="[typographyClasses, customClass]">
    {{ text }}
  </component>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    default: 'body', // Default style variant
  },
  tag: {
    type: String,
    default: 'p', // Default HTML tag
  },
  customClass: {
    type: String,
    default: '', // Allow additional custom styles
  },
});

// Define style variants
const typographyVariants = {
  h1: 'text-4xl font-bold text-gray-900',
  h2: 'text-3xl font-semibold text-gray-800',
  h3: 'text-xl font-semibold text-gray-900',
  subtitle: 'text-lg text-gray-700 font-medium',
  body: 'text-base text-gray-600',
  small: 'text-sm text-gray-500',
  muted: 'text-xs text-gray-400',
};

// Compute the class for the typography based on the variant
const typographyClasses = computed(() => {
  return (
    typographyVariants[props.variant as keyof typeof typographyVariants] ||
    typographyVariants.body
  );
});
</script>
