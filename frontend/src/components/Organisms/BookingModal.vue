<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-40"
  >
    <div
      class="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
    >
      <!-- Header -->
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-bold text-gray-900">Book {{ room.name }}</h2>
          <button @click="close" class="text-gray-500 hover:text-gray-700">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Content -->
      <div class="px-6 py-4">
        <!-- Room Details -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Room Details</h3>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-gray-600">Capacity</span>
              <span class="font-medium text-gray-900"
                >{{ room.capacity }} people</span
              >
            </div>
            <div>
              <span class="text-gray-600">Description</span>
              <p class="text-gray-900 mt-1">{{ room.description }}</p>
            </div>
            <div v-if="room.equipements.length > 0">
              <span class="text-gray-600">Equipment</span>
              <div class="flex flex-wrap gap-2 mt-2">
                <span
                  v-for="equipment in room.equipements"
                  :key="equipment.name"
                  class="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                >
                  {{ equipment.name }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Booking Form -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Date</label
            >
            <input
              type="date"
              v-model="bookingDate"
              :min="today"
              required
              class="w-full rounded-lg border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Start Time</label
              >
              <select
                v-model="startTime"
                required
                class="w-full rounded-lg border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
              >
                <option
                  v-for="time in availableStartTimes"
                  :key="time"
                  :value="time"
                >
                  {{ formatTime(time) }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >End Time</label
              >
              <select
                v-model="endTime"
                required
                class="w-full rounded-lg border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
              >
                <option
                  v-for="time in availableEndTimes"
                  :key="time"
                  :value="time"
                >
                  {{ formatTime(time) }}
                </option>
              </select>
            </div>
          </div>

          <!-- Availability Status -->
          <div
            class="p-4 rounded-lg"
            :class="isTimeSlotAvailable ? 'bg-green-50' : 'bg-red-50'"
          >
            <p :class="isTimeSlotAvailable ? 'text-green-700' : 'text-red-700'">
              {{ availabilityMessage }}
            </p>
          </div>

          <!-- Submit Button -->
          <div class="flex justify-end">
            <button
              type="submit"
              :disabled="!isTimeSlotAvailable || isLoading"
              class="px-6 py-2 bg-gray-900 text-white font-medium rounded-lg shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isLoading ? 'Booking...' : 'Confirm Booking' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { Room } from '../../types/room';
import { useBookingStore } from '../../stores/booking';
import { format } from 'date-fns';

const props = defineProps<{
  show: boolean;
  room: Room;
  initialDate?: string;
  initialStartTime?: string;
  initialEndTime?: string;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'booked'): void;
  (e: 'error', error: Error): void;
}>();

const bookingStore = useBookingStore();
const isLoading = ref(false);
const bookingDate = ref(
  props.initialDate || new Date().toISOString().split('T')[0],
);
const startTime = ref(props.initialStartTime || '09:00');
const endTime = ref(props.initialEndTime || '10:00');

const today = computed(() => new Date().toISOString().split('T')[0]);

// Generate time slots in 30-minute intervals
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 8; hour < 20; hour++) {
    for (let minute of ['00', '30']) {
      slots.push(`${hour.toString().padStart(2, '0')}:${minute}`);
    }
  }
  return slots;
};

const timeSlots = generateTimeSlots();

const availableStartTimes = computed(() => {
  return timeSlots.filter((time) => time < '19:30');
});

const availableEndTimes = computed(() => {
  return timeSlots.filter((time) => time > startTime.value && time <= '20:00');
});

const isTimeSlotAvailable = computed(() => {
  return bookingStore
    .getAvailableRooms(bookingDate.value, startTime.value, endTime.value)
    .some((r) => r.name === props.room.name);
});

const availabilityMessage = computed(() => {
  return isTimeSlotAvailable.value
    ? 'This time slot is available'
    : 'This time slot is not available';
});

const formatTime = (time: string) => {
  const [hours, minutes] = time.split(':');
  return format(
    new Date().setHours(parseInt(hours), parseInt(minutes)),
    'h:mm a',
  );
};

const close = () => {
  emit('close');
};

const handleSubmit = async () => {
  if (!isTimeSlotAvailable.value) return;

  try {
    isLoading.value = true;
    await bookingStore.bookRoom(
      props.room.name,
      bookingDate.value,
      startTime.value,
      endTime.value,
    );
    emit('booked');
    close();
  } catch (error: any) {
    emit('error', error);
  } finally {
    isLoading.value = false;
  }
};

// Reset form when modal is opened
watch(
  () => props.show,
  (newValue) => {
    if (newValue) {
      bookingDate.value =
        props.initialDate || new Date().toISOString().split('T')[0];
      startTime.value = props.initialStartTime || '09:00';
      endTime.value = props.initialEndTime || '10:00';
    }
  },
);
</script>
