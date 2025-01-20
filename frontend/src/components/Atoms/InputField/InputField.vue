<template>
  <div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <input
      :type="type"
      :value="modelValue"
      :min="min"
      :class="inputClasses"
      @input="onInput"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue';

// Define props
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  modelValue: {
    type: [String, Number],
    required: true,
  },
  min: {
    type: String,
    default: undefined,
  },
});

// Define emits
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();

// Computed classes for the input
const inputClasses = computed(
  () =>
    'w-full rounded-lg border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500',
);

// Handle input event
const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target) {
    emit('update:modelValue', target.value);
  }
};
</script>
