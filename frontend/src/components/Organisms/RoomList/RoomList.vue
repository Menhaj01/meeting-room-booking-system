<template>
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <RoomCard
      v-for="room in availableRooms"
      :key="room.name"
      :room="room"
      :openBookingModal="openBookingModal"
    />
  </div>
</template>

<script setup lang="ts">
import type { Room } from '../../../types/room';
import RoomCard from '../../Molecules/RoomCard/RoomCard.vue';

defineProps({
  availableRooms: {
    type: Array as () => Room[],
    required: true,
  },
  openBookingModal: {
    type: Function,
    required: true,
  },
});
</script>
