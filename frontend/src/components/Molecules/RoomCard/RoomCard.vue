<template>
  <div
    class="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow flex flex-col justify-between"
  >
    <div>
      <div class="flex justify-between items-center mb-4">
        <Typography :text="room.name" variant="h3" tag="h3" />
        <Typography
          :text="`${room.capacity} personnes`"
          variant="muted"
          tag="span"
        />
      </div>
      <Typography :text="room.description" variant="body" tag="p" />
      <EquipmentList :equipments="room.equipements" />
    </div>
    <Button
      :onClick="() => openBookingModal(room)"
      variant="default"
      label="Réserver une salle réunion"
    />
  </div>
</template>

<script setup lang="ts">
import Typography from '../../Atoms/Typography/Typography.vue';
import Button from '../../Atoms/Button/Button.vue';
import EquipmentList from '../../Molecules/EquipmentList/EquipmentList.vue';
defineProps({
  room: {
    type: Object,
    required: true,
  },
  openBookingModal: {
    type: Function,
    required: true,
  },
});
</script>
