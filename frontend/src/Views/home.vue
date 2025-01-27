<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getRooms, fetchAvailableRooms } from '../services/getRooms';
import RoomCard from '../components/Molecules/RoomCard/RoomCard.vue';
import { useBookingStore } from '../stores/bookingStore';
import { type Room } from '../types/room';
import BookingModal from '../components/Organisms/Modal/BookingModal.vue';
import SearchForm from '../components/Molecules/SearchForm/SearchForm.vue';
import Typography from '../components/Atoms/Typography/Typography.vue';
import LoadingState from '../components/Atoms/LoadingState/LoadingState.vue';

const createISODateTime = (date: string, time: string): string => {
  return new Date(`${date}T${time}`).toISOString();
};

const showBookingModal = ref(false);
const selectedRoom = ref<Room | null>(null);

const bookingStore = useBookingStore();

const initialLoading = ref(true);
const availableRooms = ref<Room[]>([]);
const minDate = new Date().toISOString().split('T')[0];
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
      <Typography
        variant="h1"
        customClass="my-6"
        text=" Réservation de salle de réunion"
      />

      <div v-if="initialLoading" class="text-center py-12">
        <LoadingState />
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
              label: 'Heure de début',
              type: 'time',
              modelValue: bookingStore.startTime,
              onUpdate: (value) => (bookingStore.startTime = String(value)),
            },
            {
              label: 'Fin des temps',
              type: 'time',
              modelValue: bookingStore.endTime,
              onUpdate: (value) => (bookingStore.endTime = String(value)),
            },
          ]"
          :isLoading="bookingStore.isLoading"
          :onClick="searchRooms"
        />

        <div class="bg-white shadow-lg rounded-xl p-6">
          <Typography
            customClass="text-[20px] font-bold text-gray-900 mb-6"
            text="Chambres disponibles"
          />
          <div v-if="bookingStore.isLoading" class="text-center py-8">
            <LoadingState message="Chargement des salles..." />
          </div>
          <div v-else-if="availableRooms.length === 0" class="text-center py-8">
            <Typography
              customClass="text-gray-500"
              text="Aucune chambre disponible."
            />
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
      :popupModal="{ open: showBookingModal, onClose: closeBookingModal }"
      :modalHeader="{ title: 'title', onClose: closeBookingModal }"
      :roomDetails="{
        room: {
          id: '1',
          name: 'Conference Room',
          description: 'A spacious room for meetings and events.',
          capacity: 20,
          equipements: [{ name: 'Projector' }, { name: 'Whiteboard' }],
          createdAt: '2023-01-01',
          updatedAt: '2023-01-01',
        },
      }"
      :bookingForm="{
        bookingDate: '',
        startTime: '',
        endTime: '',
        availabilityMessage: 'Your selected time is available!',
        isLoading: false,
        isTimeSlotAvailable: true,
        availableStartTimes: ['09:00', '10:00', '11:00'],
        availableEndTimes: ['12:00', '13:00', '14:00'],
        formatTime: (time: string) => time,
        today: new Date().toISOString().split('T')[0],
      }"
    />
  </div>
</template>
