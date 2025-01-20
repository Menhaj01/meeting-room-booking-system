<template>
  <div class="bg-white shadow-lg rounded-xl p-6 mb-8">
    <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
      <InputField
        v-for="(field, index) in inputFields"
        :key="index"
        :label="field.label"
        :type="field.type"
        :modelValue="field.modelValue.value"
        :min="field.min ? field.min.value : undefined"
        @update:modelValue="(value) => updateValue(field.key, value as any)"
      />
    </div>
    <div class="mt-6">
      <Button :disabled="isLoading" @click="searchRooms">
        {{ isLoading ? 'Loading...' : 'Search Available Rooms' }}
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import InputField from '../../Atoms/InputField/InputField.vue';
import Button from '../../Atoms/Button/Button.vue';

// Define input fields configuration
const inputFields = [
  {
    label: 'Date',
    type: 'date',
    modelValue: ref<string>(new Date().toISOString().split('T')[0]),
    min: computed(() => new Date().toISOString().split('T')[0]),
    key: 'selectedDate',
  },
  {
    label: 'Start Time',
    type: 'time',
    modelValue: ref<string>('09:00'),
    key: 'startTime',
  },
  {
    label: 'End Time',
    type: 'time',
    modelValue: ref<string>('10:00'),
    key: 'endTime',
  },
];

// Create refs for the values
const isLoading = ref<boolean>(false);

// Function to update the value based on the key
const updateValue = (key: string, value: string) => {
  const field = inputFields.find((f) => f.key === key);
  if (field) {
    field.modelValue.value = value; // Update the ref value
  }
};

const searchRooms = () => {
  isLoading.value = true;
};
</script>
