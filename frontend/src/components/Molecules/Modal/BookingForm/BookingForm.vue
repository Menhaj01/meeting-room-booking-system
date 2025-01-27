<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div>
      <InputField
        label="Date"
        type="date"
        :modelValue="bookingDate"
        :min="today"
      />
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div>
        <Dropdown
          :modelValue="startTime"
          :availableLabels="formattedStartTimes"
          label="Heure de début"
        />
      </div>
      <div>
        <Dropdown
          :modelValue="endTime"
          :availableLabels="formattedEndTimes"
          label="Fin des temps"
        />
      </div>
    </div>
    <div class="p-4 rounded-lg" :class="availabilityClass">
      <Typography :customClass="messageClass" :text="availabilityMessage" />
    </div>
    <div class="flex justify-end">
      <Button
        :onClick="handleSubmit"
        variant="default"
        :disabled="!isTimeSlotAvailable || isLoading"
      >
        {{ isLoading ? 'Réservation...' : 'Confirmer la réservation' }}
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Button from '../../../Atoms/Button/Button.vue';
import InputField from '../../../Atoms/InputField/InputField.vue';
import Typography from '../../../Atoms/Typography/Typography.vue';
import Dropdown from '../../../Atoms/Dropdown/Dropdown.vue';

export type BookingFormProps = {
  bookingDate: string;
  startTime: string;
  endTime: string;
  availabilityMessage: string;
  isLoading: boolean;
  isTimeSlotAvailable: boolean;
  availableStartTimes: string[];
  availableEndTimes: string[];
  formatTime: (time: string) => string;
  today: string;
};
const props = defineProps<BookingFormProps>();

const emit = defineEmits(['submit']);

const formattedStartTimes = computed(() =>
  props.availableStartTimes.map((time) => props.formatTime(time)),
);

const formattedEndTimes = computed(() =>
  props.availableEndTimes.map((time) => props.formatTime(time)),
);

const availabilityClass = computed(() =>
  props.isTimeSlotAvailable ? 'bg-green-50' : 'bg-red-50',
);
const messageClass = computed(() =>
  props.isTimeSlotAvailable ? 'text-green-700' : 'text-red-700',
);

const handleSubmit = () => {
  emit('submit');
};
</script>
