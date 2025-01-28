<script setup lang="ts">
import BookingModal from '../../Organisms/Modal/BookingModal.vue';
import { useBookingStore } from '../../../stores/bookingStore';
import { createISODateTime } from '../../../utils/createISODateTime';
import { createBooking } from '../../../services/createBooking';
import { watch, computed } from 'vue';
import { fetchAvailableTimes } from '../../../services/getAvailableTimes';
import { useRoomStore } from '../../../stores/roomStore';
import { useAlertStore } from '../../../stores/alertStore';

const bookingStore = useBookingStore();
const roomStore = useRoomStore();
const alertStore = useAlertStore();
const emit = defineEmits(['add-alert']);

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
    await createBooking(bookingStore.selectedRoom.name, startISO, endISO);
    bookingStore.reset();
    alertStore.addAlert('success', `Room successfully booked.`);
  } catch (error) {
    console.error('Error booking room:', error);
    alertStore.addAlert('error', 'Failed to book the room.');
  }
};
const closeModal = () => {
  bookingStore.toggleModal(false);
};
watch(
  () => bookingStore.selectedDate,
  async (newDate) => {
    if (newDate) {
      try {
        const room = roomStore.availableRooms.find(
          (r) => r.name === bookingStore.selectedRoom.name,
        );
        if (room) {
          const times = await fetchAvailableTimes(
            room.id,
            bookingStore.selectedDate,
          );
          roomStore.setAvailableTimes(times);
        }
      } catch (error) {
        console.error('Error fetching available times:', error);
        alertStore.addAlert('error', 'Failed to fetch available times.');
      }
    }
  },
  { immediate: true },
);
const filteredEndTimes = computed(() => {
  const startHour = parseInt(bookingStore.startTime.split(':')[0]);
  const validEndTimes: string[] = [];
  for (const time of roomStore.availableTimes) {
    const endHour = parseInt(time.split(':')[0]);
    if (endHour > startHour) {
      validEndTimes.push(time);
    }
  }

  return validEndTimes;
});
</script>

<template>
  <BookingModal
    :popupModal="{ open: bookingStore.showModal, onClose: closeModal }"
    :modalHeader="{
      title: bookingStore.selectedRoom.name,
      onClose: closeModal,
    }"
    :roomDetails="{ room: bookingStore.selectedRoom }"
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
        availableLabels: roomStore.availableTimes,
        label: 'Heure de début',
        onChange: (event: Event) => {
          const value = (event.target as HTMLSelectElement).value;
          bookingStore.setStartTime(value);
        },
        disabled: !bookingStore.selectedDate,
      },
      endTimeDropdown: {
        modelValue: bookingStore.endTime,
        availableLabels: filteredEndTimes,
        label: 'Fin des temps',
        onChange: (event: Event) => {
          const value = (event.target as HTMLSelectElement).value;
          bookingStore.setEndTime(value);
        },
        disabled: !bookingStore.startTime,
      },
      availabilityMessage:
        roomStore.availableTimes.length > 0
          ? 'La date que vous avez choisie a des plages horaires disponibles!'
          : `Désolé, la date que vous avez choisie n'a pas de créneau horaire disponible!`,
      isLoading: false,
      isTimeSlotAvailable: !!roomStore.availableTimes.length,
      isAlert: !bookingStore.selectedDate,
      buttonDisabled: !bookingStore.endTime,
    }"
  />
</template>
