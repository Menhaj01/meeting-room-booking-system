<template>
  <div>
    <h1>Available Rooms</h1>
    <div v-if="roomsStore.rooms.length">
      <div v-for="room in roomsStore.rooms" :key="room.name">
        <h2>{{ room.name }}</h2>
        <p>{{ room.description }}</p>
        <p>Capacity: {{ room.capacity }}</p>
        <button @click="bookRoom(room.name)">Book Now</button>
      </div>
    </div>
    <div v-else>
      <p>Loading rooms...</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useRoomsStore } from '../stores/roomsStore';
import { useBookingStore } from '../stores/bookingStore';

export default defineComponent({
  setup() {
    const roomsStore = useRoomsStore();
    const bookingStore = useBookingStore();
    onMounted(() => roomsStore.loadRooms());

    const bookRoom = (roomName: string) => {
      const startTime = new Date().toISOString();
      const endTime = new Date(new Date().getTime() + 3600000).toISOString();
      bookingStore.bookRoom(roomName, startTime, endTime);
    };

    return { roomsStore, bookingStore, bookRoom };
  },
});
</script>
