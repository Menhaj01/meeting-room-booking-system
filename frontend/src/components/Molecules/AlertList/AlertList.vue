<template>
  <TransitionGroup
    enter-active-class="transform ease-out duration-300 transition"
    enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
    leave-active-class="transition ease-in duration-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
    class="fixed inset-0 z-50 flex flex-col items-end justify-start gap-2 p-4 pointer-events-none"
  >
    <Alert
      v-for="alert in alerts"
      :key="alert.id"
      :alert="alert"
      @remove-alert="removeAlert"
    />
  </TransitionGroup>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import Alert from '../../Atoms/Alert/Alert.vue';

export default defineComponent({
  components: { Alert },
  props: {
    alerts: {
      type: Array as PropType<
        { id: number; type: 'success' | 'error'; message: string }[]
      >,
      required: true,
    },
  },
  methods: {
    removeAlert(id: number) {
      this.$emit('remove-alert', id);
    },
  },
});
</script>
