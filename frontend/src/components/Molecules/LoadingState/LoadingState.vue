<template>
  <div class="text-center py-12">
    <Typography :text="message" variant="muted" tag="p" />
  </div>
</template>

<script setup lang="ts">
import Typography from '../../Atoms/Typography/Typography.vue';
defineProps({
  message: {
    type: String,
    default: 'Loading application data...',
  },
});
</script>
