// src/components/YourComponent.vue
<template>
  <div class="min-h-screen bg-gray-100">
    <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">
        Meeting Room Booking
      </h1>

      <!-- Loading State -->
      <div v-if="initialLoading" class="text-center py-12">
        <p class="text-gray-500">Loading application data...</p>
      </div>

      <template v-else>
        <!-- Search Form -->
        <SearchForm
          :selectedDate="selectedDate"
          :startTime="startTime"
          :endTime="endTime"
          :today="today"
          :isLoading="bookingStore.isLoading"
          :searchRooms="searchRooms"
        />

        <!-- Available Rooms -->
        <div class="bg-white shadow-lg rounded-xl p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Available Rooms</h2>
          <div v-if="bookingStore.isLoading" class="text-center py-8">
            <p class="text-gray-500">Loading rooms...</p>
          </div>
          <div v-else-if="availableRooms.length === 0" class="text-center py-8">
            <p class="text-gray-500">
              No rooms available for the selected time slot.
            </p>
          </div>
          <div
            v-else
            class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <RoomCard
              v-for="room in availableRooms"
              :key="room.name"
              :room="room"
              :openBookingModal="openBookingModal"
            />
          </div>
        </div>
      </template>
    </div>

    <!-- Booking Modal -->
    <BookingModal
      v-if="selectedRoom"
      :show="showBookingModal"
      :room="selectedRoom"
      :initial-date="selectedDate"
      :initial-start-time="startTime"
      :initial-end-time="endTime"
      @close="closeBookingModal"
      @booked="handleBookingSuccess"
      @error="handleBookingError"
    />

    <!-- Alert Notifications -->
    <AlertNotification ref="alertNotification" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useBookingStore } from './stores/booking.ts';
import type { Room } from './types/room.ts';
import SearchForm from './components/Molecules/SearchForm/SearchForm.vue';
import RoomCard from './components/Molecules/RoomCard/RoomCard.vue';
import BookingModal from './components/Organisms/BookingModal.vue';
import AlertNotification from './components/Organisms/AlertNotification.vue';

const bookingStore = useBookingStore();
const selectedDate = ref(new Date().toISOString().split('T')[0]);
const startTime = ref('09:00');
const endTime = ref('10:00');
const availableRooms = ref<Room[]>([]);
const alertNotification = ref<{
  addAlert: (type: 'success' | 'error', message: string) => void;
}>();
const initialLoading = ref(true);

const showBookingModal = ref(false);
const selectedRoom = ref<Room | null>(null);

const today = computed(() => new Date().toISOString().split('T')[0]);

onMounted(async () => {
  try {
    await Promise.all([
      bookingStore.fetchRooms(),
      bookingStore.fetchBookings(),
    ]);
    searchRooms();
  } catch (error: any) {
    alertNotification.value?.addAlert(
      'error',
      error.message || 'Failed to load application data',
    );
  } finally {
    initialLoading.value = false;
  }
});

const searchRooms = () => {
  availableRooms.value = bookingStore.getAvailableRooms(
    selectedDate.value,
    startTime.value,
    endTime.value,
  );

  if (bookingStore.error) {
    alertNotification.value?.addAlert('error', bookingStore.error);
  }
};

const openBookingModal = (room: Room) => {
  selectedRoom.value = room;
  showBookingModal.value = true;
};

const closeBookingModal = () => {
  showBookingModal.value = false;
  selectedRoom.value = null;
};

const handleBookingSuccess = () => {
  alertNotification.value?.addAlert(
    'success',
    `Successfully booked ${selectedRoom.value?.name}`,
  );
  closeBookingModal();
  searchRooms();
};

const handleBookingError = (error: Error) => {
  alertNotification.value?.addAlert('error', error.message);
};
</script>
