<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div>
      <InputField v-bind="inputFieldDate" />
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div>
        <Dropdown v-bind="startTimeDropdown" />
      </div>
      <div>
        <Dropdown v-bind="endTimeDropdown" />
      </div>
    </div>
    <div v-if="!isAlert" class="p-4 rounded-lg" :class="availabilityClass">
      <Typography :customClass="messageClass" :text="availabilityMessage" />
    </div>
    <div class="flex justify-end">
      <Button variant="default" :disabled="buttonDisabled || isLoading">
        {{ isLoading ? 'Réservation...' : 'Confirmer la réservation' }}
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Button from '../../../Atoms/Button/Button.vue';
import InputField, {
  type InputFieldProps,
} from '../../../Atoms/InputField/InputField.vue';
import Typography from '../../../Atoms/Typography/Typography.vue';
import Dropdown, {
  type DropdownProps,
} from '../../../Atoms/Dropdown/Dropdown.vue';

export type BookingFormProps = {
  handleSubmit: () => void;
  inputFieldDate: InputFieldProps;
  startTimeDropdown: DropdownProps;
  endTimeDropdown: DropdownProps;
  availabilityMessage: string;
  isLoading: boolean;
  isTimeSlotAvailable: boolean;
  buttonDisabled: boolean;
  isAlert: boolean;
};
const props = defineProps<BookingFormProps>();
const availabilityClass = computed(() =>
  props.isTimeSlotAvailable ? 'bg-green-50' : 'bg-red-50',
);
const messageClass = computed(() =>
  props.isTimeSlotAvailable ? 'text-green-700' : 'text-red-700',
);
</script>
