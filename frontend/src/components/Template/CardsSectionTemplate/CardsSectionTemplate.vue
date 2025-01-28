<script setup lang="ts">
import RoomCard from '../../Molecules/RoomCard/RoomCard.vue';
import Typography from '../../Atoms/Typography/Typography.vue';
import LoadingState from '../../Atoms/LoadingState/LoadingState.vue';
import { getRooms } from '../../../services/getRooms';
import { onMounted } from 'vue';
import type { Room } from '../../../types/room';
import { useBookingStore } from '../../../stores/bookingStore';
import { useRoomStore } from '../../../stores/roomStore';
import { useAlertStore } from '../../../stores/alertStore';

const bookingStore = useBookingStore();
const roomStore = useRoomStore();
const alertStore = useAlertStore();

onMounted(async () => {
  roomStore.setLoading(true);
  try {
    const rooms = await getRooms();
    roomStore.setAvailableRooms(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    alertStore.addAlert('error', 'Failed to fetch available rooms.');
  }
});

const openBookingModal = (room: Room) => {
  bookingStore.toggleModal(true);
  bookingStore.setSelectedRoom(room);
};
</script>

<template>
  <div class="bg-white shadow-lg rounded-xl p-6">
    <Typography
      customClass="text-[20px] font-bold text-gray-900 mb-6"
      text="Chambres disponibles"
    />
    <div v-if="roomStore.initialLoading" class="text-center py-8">
      <LoadingState message="Chargement des salles..." />
    </div>
    <div
      v-else-if="roomStore.availableRooms.length === 0"
      class="text-center py-8"
    >
      <Typography
        customClass="text-gray-500"
        text="Aucune chambre disponible."
      />
    </div>
    <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <RoomCard
        v-for="room in roomStore.availableRooms"
        :key="room.name"
        :room="room"
        :openBookingModal="openBookingModal"
      />
    </div>
  </div>
</template>
