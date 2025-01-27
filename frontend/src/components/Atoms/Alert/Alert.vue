<template>
  <div
    :class="[
      'w-full max-w-sm overflow-hidden rounded-lg shadow-lg pointer-events-auto p-4',
      alert.type === 'success' ? 'bg-green-50 border border-green-200' : '',
      alert.type === 'error' ? 'bg-red-50 border border-red-200' : '',
    ]"
  >
    <div class="flex items-center">
      <div class="ml-3 w-0 flex-1">
        <Typography :customClass="typographyClasses" :text="alert.message" />
      </div>
      <div class="ml-4 flex-shrink-0">
        <Button :onClick="handleClose" variant="closeButton" size="medium">
          X
        </Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import Button from '../Button/Button.vue';
import Typography from '../Typography/Typography.vue';

export default defineComponent({
  components: { Button, Typography },
  props: {
    alert: {
      type: Object as PropType<{
        id: number;
        type: 'success' | 'error';
        message: string;
      }>,
      required: true,
    },
  },
  computed: {
    typographyClasses(): string {
      const classes = {
        'text-sm font-medium': true,
        'text-green-800': this.alert.type === 'success',
        'text-red-800': this.alert.type === 'error',
      };
      return Object.entries(classes)
        .filter(([key, value]) => value)
        .map(([key]) => key)
        .join(' ');
    },
  },
  methods: {
    handleClose() {
      this.$emit('remove-alert', this.alert.id);
    },
  },
});
</script>
