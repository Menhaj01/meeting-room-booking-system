<template>
  <div class="text-center py-12 animate-fade-in">
    <Typography :text="message" variant="muted" tag="p" />
    <div class="mt-4 flex justify-center space-x-2">
      <span class="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce"></span>
      <span
        class="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce [animation-delay:200ms]"
      ></span>
      <span
        class="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce [animation-delay:400ms]"
      ></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import Typography from '../../Atoms/Typography/Typography.vue';
defineProps({
  message: {
    type: String,
    default: "Chargement des données d'application...",
  },
});
</script>
