<template>
  <div class="px-6 py-4 border-b border-gray-200">
    <div class="flex items-center justify-between">
      <Typography variant="h3" :text="title" />
      <Button :onClick="onClose" size="medium" variant="closeButton">
        x
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Typography from '../../../Atoms/Typography/Typography.vue';
import Button from '../../../Atoms/Button/Button.vue';

export interface ModalHeaderProps {
  title: string;
  onClose: () => void;
}
defineProps<ModalHeaderProps>();
</script>
