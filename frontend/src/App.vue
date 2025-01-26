<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getRooms, fetchAvailableRooms } from './services/getRooms';
import RoomCard from './components/Molecules/RoomCard/RoomCard.vue';
import { useBookingStore } from './stores/bookingStore';
import { type Room } from './types/room';
import BookingModal from './components/Organisms/BookingModal.vue';
import SearchForm from './components/Molecules/SearchForm/SearchForm.vue';

// Utility function for combining date and time into ISO string
const createISODateTime = (date: string, time: string): string => {
  return new Date(`${date}T${time}`).toISOString();
};

const showBookingModal = ref(false);
const selectedRoom = ref<Room | null>(null);

// Booking Store
const bookingStore = useBookingStore();

// Local state
const initialLoading = ref(true);
const availableRooms = ref<Room[]>([]);
const minDate = new Date().toISOString().split('T')[0];
// Derived state
onMounted(async () => {
  try {
    const rooms = await getRooms();
    availableRooms.value = rooms;
    initialLoading.value = false;
  } catch (error) {
    console.error('Error fetching rooms:', error);
    initialLoading.value = false;
  }
});

const searchRooms = async () => {
  try {
    bookingStore.setLoading(true);

    // Create ISO strings for start and end times
    const startISO = createISODateTime(
      bookingStore.selectedDate,
      bookingStore.startTime,
    );
    const endISO = createISODateTime(
      bookingStore.selectedDate,
      bookingStore.endTime,
    );

    const rooms = await fetchAvailableRooms(startISO, endISO);
    availableRooms.value = rooms;
    console.log('Available Rooms:', rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
  } finally {
    bookingStore.setLoading(false);
  }
};

// Modal handlers
const openBookingModal = (room: Room) => {
  showBookingModal.value = true;
  selectedRoom.value = room;
};

const closeBookingModal = () => {
  showBookingModal.value = false;
  selectedRoom.value = null;
};

const handleBookingSuccess = () => {
  closeBookingModal();
  searchRooms();
};

const handleBookingError = (error: Error) => {
  console.error('Booking error:', error);
};
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">
        Meeting Room Booking
      </h1>

      <div v-if="initialLoading" class="text-center py-12">
        <p class="text-gray-500">Loading application data...</p>
      </div>

      <template v-else>
        <SearchForm
          :fields="[
            {
              label: 'Date',
              type: 'date',
              modelValue: bookingStore.selectedDate,
              min: minDate,
              onUpdate: (value) => (bookingStore.selectedDate = String(value)),
            },
            {
              label: 'Start Time',
              type: 'time',
              modelValue: bookingStore.startTime,
              onUpdate: (value) => (bookingStore.startTime = String(value)),
            },
            {
              label: 'End Time',
              type: 'time',
              modelValue: bookingStore.endTime,
              onUpdate: (value) => (bookingStore.endTime = String(value)),
            },
          ]"
          :isLoading="bookingStore.isLoading"
          :onClick="searchRooms"
        />

        <div class="bg-white shadow-lg rounded-xl p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Available Rooms</h2>
          <div v-if="bookingStore.isLoading" class="text-center py-8">
            <p class="text-gray-500">Loading rooms...</p>
          </div>
          <div v-else-if="availableRooms.length === 0" class="text-center py-8">
            <p class="text-gray-500">No rooms available.</p>
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

    <BookingModal
      v-if="selectedRoom"
      :show="showBookingModal"
      :room="selectedRoom"
      :initial-date="bookingStore.selectedDate"
      :initial-start-time="bookingStore.startTime"
      :initial-end-time="bookingStore.endTime"
      @close="closeBookingModal"
      @booked="handleBookingSuccess"
      @error="handleBookingError"
    />
  </div>
</template>
