<template>
  <div class="mb-6" v-if="room">
    <Typography
      customClass="text-lg font-semibold text-gray-900 mb-2"
      text="Détails de la chambre"
    />
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <Typography customClass="text-gray-600" text="Capacité" />
        <Typography
          customClass="font-medium text-gray-900"
          :text="`${room.capacity} personnes`"
        />
      </div>
      <div>
        <Typography customClass="text-gray-600" text="Description" />
        <Typography customClass="text-gray-900 mt-1" :text="room.description" />
      </div>
      <div v-if="room.equipements.length > 0">
        <Typography customClass="text-gray-600" text="Équipement" />
        <div class="flex flex-wrap gap-2 mt-2">
          <Typography
            v-for="equipment in room.equipements"
            :key="equipment.name"
            customClass="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
            :text="equipment.name"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Room } from '../../../../types/room';
import Typography from '../../../Atoms/Typography/Typography.vue';

defineProps<{
  room: Room;
}>();
</script>
