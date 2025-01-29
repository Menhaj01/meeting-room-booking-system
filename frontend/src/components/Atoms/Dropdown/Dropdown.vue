<script setup lang="ts">
export interface DropdownProps {
  label: string;
  modelValue: string;
  availableLabels: string[];
  onChange: (event: Event) => void;
  disabled?: boolean;
}
defineProps<DropdownProps>();
</script>

<template>
  <label>
    {{ label }}
  </label>
  <select
    :disabled="disabled"
    :value="modelValue"
    @change="onChange"
    class="w-full rounded-lg border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <option value="" disabled>Sélectionnez une option</option>
    <option v-for="option in availableLabels" :key="option" :value="option">
      {{ option }}
    </option>
  </select>
</template>
