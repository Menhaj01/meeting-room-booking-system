<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { getRooms, fetchAvailableRooms } from '../services/getRooms';
import { fetchAvailableTimes } from '../services/getAvailableTimes';
import { useSearchFormStore } from '../stores/searchFormStore';
import { useBookingStore } from '../stores/bookingStore';
import RoomCard from '../components/Molecules/RoomCard/RoomCard.vue';
import BookingModal from '../components/Organisms/Modal/BookingModal.vue';
import SearchForm from '../components/Molecules/SearchForm/SearchForm.vue';
import Typography from '../components/Atoms/Typography/Typography.vue';
import LoadingState from '../components/Atoms/LoadingState/LoadingState.vue';
import { createBooking } from '../services/createBooking';
import { type Room } from '../types/room';
import { createISODateTime } from '../utils/createISODateTime';
import AlertList from '../components/Molecules/AlertList/AlertList.vue';

const showBookingModal = ref(false);
const searchStore = useSearchFormStore();
const bookingStore = useBookingStore();

const initialLoading = ref(true);
const availableRooms = ref<Room[]>([]);
const availableTimes = ref<string[]>([]);
const minDate = new Date().toISOString().split('T')[0];

// Alert management
const alerts = ref<
  { id: number; type: 'success' | 'error'; message: string }[]
>([]);
let nextAlertId = 1;

const addAlert = (type: 'success' | 'error', message: string) => {
  const id = nextAlertId++;
  alerts.value.push({ id, type, message });

  // Remove the alert after 3 seconds
  setTimeout(() => {
    alerts.value = alerts.value.filter((alert) => alert.id !== id);
  }, 3000);
};

const removeAlert = (id: number) => {
  alerts.value = alerts.value.filter((alert) => alert.id !== id);
};
// Fetch available rooms
onMounted(async () => {
  try {
    const rooms = await getRooms();
    availableRooms.value = rooms;
    initialLoading.value = false;
  } catch (error) {
    console.error('Error fetching rooms:', error);
    addAlert('error', 'Failed to fetch available rooms.');
    initialLoading.value = false;
  }
});

// Watch for selected date changes
watch(
  () => bookingStore.selectedDate,
  async (newDate) => {
    if (newDate) {
      try {
        // Fetch available times after the date is updated
        const room = availableRooms.value.find(
          (r) => r.name === bookingStore.selectedRoom.name,
        );
        if (room) {
          const times = await fetchAvailableTimes(
            room.id,
            bookingStore.selectedDate,
          );
          availableTimes.value = times;
        }
      } catch (error) {
        console.error('Error fetching available times:', error);
        addAlert('error', 'Failed to fetch available times.');
      }
    }
  },
  { immediate: true }, // This ensures it runs immediately after mount as well
);

// Search available rooms based on selected date and time
const searchRooms = async () => {
  try {
    searchStore.setLoading(true);
    const startISO = createISODateTime(
      searchStore.selectedDate,
      searchStore.startTime,
    );
    const endISO = createISODateTime(
      searchStore.selectedDate,
      searchStore.endTime,
    );

    const rooms = await fetchAvailableRooms(startISO, endISO);
    availableRooms.value = rooms;
    addAlert('success', 'Rooms fetched successfully.');
  } catch (error) {
    console.error('Error fetching rooms:', error);
    addAlert('error', 'Failed to fetch rooms.');
  } finally {
    searchStore.setLoading(false);
  }
};

// Open the booking modal for the selected room
const openBookingModal = (room: Room) => {
  showBookingModal.value = true;
  bookingStore.setSelectedRoom(room);
  console.log(
    '>>>>>>bookingStore.selectedRoom>>>>>>>',
    bookingStore.selectedRoom,
  );
};

// Close the booking modal and reset state
const closeBookingModal = () => {
  showBookingModal.value = false;
  bookingStore.reset();
};

// Handle successful booking
const handleBookingSuccess = () => {
  closeBookingModal();
  searchRooms();
  bookingStore.reset();
};

// Handle booking form submission
const handleSubmit = async () => {
  try {
    const startISO = createISODateTime(
      bookingStore.selectedDate,
      bookingStore.startTime,
    );
    const endISO = createISODateTime(
      bookingStore.selectedDate,
      bookingStore.endTime,
    );
    const booking = await createBooking(
      bookingStore.selectedRoom.name,
      startISO,
      endISO,
    );

    addAlert('success', `Room "${booking.roomName}" successfully booked.`);
    handleBookingSuccess();
  } catch (err) {
    const error = err as Error;
    console.error('Booking error:', error);
    addAlert('error', 'Failed to book the room.');
  }
};
const filteredEndTimes = computed(() => {
  const startHour = parseInt(bookingStore.startTime.split(':')[0]);
  const validEndTimes: string[] = [];

  // Filter availableTimes to only include times after the selected start time
  for (const time of availableTimes.value) {
    const endHour = parseInt(time.split(':')[0]);
    if (endHour > startHour) {
      validEndTimes.push(time);
    }
  }

  return validEndTimes;
});
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <div class="absolute top-12 w-full">
      <AlertList :alerts="alerts" @remove-alert="removeAlert" />
    </div>
    <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <Typography
        variant="h1"
        customClass="my-6"
        text="Réservation de salle de réunion"
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
              modelValue: searchStore.selectedDate,
              min: minDate,
              onUpdate: (value) => (searchStore.selectedDate = String(value)),
            },
            {
              label: 'Heure de début',
              type: 'time',
              modelValue: searchStore.startTime,
              onUpdate: (value) => (searchStore.startTime = String(value)),
              disabled:
                searchStore.selectedDate === '' ||
                searchStore.selectedDate === null,
            },
            {
              label: 'Fin des temps',
              type: 'time',
              modelValue: searchStore.endTime,
              onUpdate: (value) => (searchStore.endTime = String(value)),
              disabled:
                searchStore.startTime === '' || searchStore.startTime === null,
            },
          ]"
          :isLoading="searchStore.isLoading"
          :onClick="searchRooms"
          :disabled="searchStore.endTime === '' || searchStore.endTime === null"
        />

        <div class="bg-white shadow-lg rounded-xl p-6">
          <Typography
            customClass="text-[20px] font-bold text-gray-900 mb-6"
            text="Chambres disponibles"
          />
          <div v-if="searchStore.isLoading" class="text-center py-8">
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

    <!-- Booking Modal: receives all data from parent -->
    <BookingModal
      :popupModal="{ open: showBookingModal, onClose: closeBookingModal }"
      :modalHeader="{
        title: bookingStore.selectedRoom.name,
        onClose: closeBookingModal,
      }"
      :roomDetails="{
        room: bookingStore.selectedRoom,
      }"
      :bookingForm="{
        handleSubmit,
        inputFieldDate: {
          label: 'Date',
          type: 'date',
          modelValue: bookingStore.selectedDate,
          min: new Date().toISOString().split('T')[0],
          onUpdate: (value) => {
            bookingStore.setDate(String(value));
          },
        },
        startTimeDropdown: {
          modelValue: bookingStore.startTime,
          availableLabels: availableTimes,
          label: 'Heure de début',
          onChange: (event: Event) => {
            const value = (event.target as HTMLSelectElement).value;
            bookingStore.setStartTime(value);
          },
          disabled:
            bookingStore.selectedDate === '' ||
            bookingStore.selectedDate === null,
        },
        endTimeDropdown: {
          modelValue: bookingStore.endTime,
          availableLabels: filteredEndTimes,
          label: 'Fin des temps',
          onChange: (event: Event) => {
            const value = (event.target as HTMLSelectElement).value;
            bookingStore.setEndTime(value);
          },
          disabled:
            bookingStore.startTime === '' || bookingStore.startTime === null,
        },
        availabilityMessage:
          availableTimes.length > 0
            ? 'La date que vous avez choisie a des plages horaires disponibles!'
            : `Désolé, la date que vous avez choisie n'a pas de créneau horaire disponible!`,
        isLoading: false,
        isTimeSlotAvailable: availableTimes.length > 0,
        isAlert:
          bookingStore.selectedDate === '' ||
          bookingStore.selectedDate === null,
        buttonDisabled:
          bookingStore.endTime === '' || bookingStore.endTime === null,
      }"
    />
  </div>
</template>
