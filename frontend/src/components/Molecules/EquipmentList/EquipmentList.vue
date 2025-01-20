<template>
  <div v-if="equipments.length > 0" class="space-y-3">
    <Typography
      text="Equipment:"
      variant="subtitle"
      tag="h4"
      customClass="mb-2"
    />
    <div class="flex flex-wrap gap-2">
      <Typography
        v-for="equipment in equipments"
        :key="equipment.name"
        :text="equipment.name"
        variant="small"
        tag="span"
        customClass="inline-flex items-center px-2.5 py-0.5 rounded-full bg-gray-200 text-gray-700"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Typography from '../../Atoms/Typography/Typography.vue';

defineProps({
  equipments: {
    type: Array as () => { name: string }[],
    required: true,
  },
});
</script>
