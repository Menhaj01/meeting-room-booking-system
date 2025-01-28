<script setup lang="ts">
import InputField, {
  type InputFieldProps,
} from '../../Atoms/InputField/InputField.vue';
import Button from '../../Atoms/Button/Button.vue';

defineProps({
  fields: {
    type: Array as () => (InputFieldProps & {
      onUpdate: (value: string | number) => void;
    })[],
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  onClick: {
    type: Function as unknown as () => (event: MouseEvent) => void,
    required: true,
  },
});
</script>

<template>
  <div class="bg-white shadow-lg rounded-xl p-6 mb-8">
    <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
      <InputField
        v-for="field in fields"
        :key="field.label"
        v-bind="field"
        @update:modelValue="field.onUpdate"
      />
    </div>
    <div class="mt-6 w-fit">
      <Button
        :disabled="isLoading || disabled"
        variant="default"
        size="medium"
        :onClick="onClick"
        :label="
          isLoading ? 'Chargement...' : 'Rechercher les chambres disponibles'
        "
      />
    </div>
  </div>
</template>
