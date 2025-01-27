<script setup>
defineProps({
  modelValue: String,
  availableLabels: {
    type: Array,
    default: () => [],
  },
  label: String,
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <label>
    {{ label }}
  </label>
  <select
    :value="modelValue"
    @change="$emit('update:modelValue', $event.target.value)"
    class="w-full rounded-lg border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
  >
    <option value="" disabled>Sélectionnez une option</option>
    <option v-for="option in availableLabels" :key="option" :value="option">
      {{ option }}
    </option>
  </select>
</template>
