<template>
  <div>
    <h1>Available Rooms</h1>
    <div v-if="roomsStore.rooms.length">
      <div v-for="room in roomsStore.rooms" :key="room.name">
        <h2>{{ room.name }}</h2>
        <p>{{ room.description }}</p>
        <p>Capacity: {{ room.capacity }}</p>
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

export default defineComponent({
  setup() {
    const roomsStore = useRoomsStore();
    onMounted(() => roomsStore.loadRooms());
    return { roomsStore };
  },
});
</script>
