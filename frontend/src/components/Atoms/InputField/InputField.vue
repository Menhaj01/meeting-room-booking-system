<script setup lang="ts">
import { computed } from 'vue';

export interface InputFieldProps {
  label: string;
  type: 'text' | 'number' | 'password' | 'email' | 'date' | 'time';
  modelValue: string | number;
  min?: string | number;
  placeholder?: string;
  inputClass?: string;
  disabled?: boolean;
  onUpdate?: (value: string | number) => void;
}

const props = defineProps<InputFieldProps>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();

const inputClasses = computed(
  () =>
    'w-full rounded-lg border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500',
);

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value;
  emit('update:modelValue', target.value);
  if (props.onUpdate) {
    props.onUpdate(value);
  }
};
</script>

<template>
  <div class="space-y-2">
    <label v-if="label" class="block text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <input
      :type="type"
      :value="modelValue"
      :min="min"
      :placeholder="placeholder"
      :class="[inputClasses, inputClass]"
      :disabled="disabled"
      @input="onInput"
    />
  </div>
</template>
