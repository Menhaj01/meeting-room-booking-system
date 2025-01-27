<template>
  <PopupModal v-bind="popupModal">
    <ModalHeader v-bind="modalHeader" />
    <div class="px-6 py-4">
      <RoomDetails v-bind="roomDetails" />
      <BookingForm @submit="handleSubmit" v-bind="bookingForm" />
    </div>
  </PopupModal>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, type PropType } from 'vue';
import PopupModal, {
  type PopupModalProps,
} from '../../Atoms/PopupModal/PopupModal.vue';
import ModalHeader, {
  type ModalHeaderProps,
} from '../../Molecules/Modal/ModalHeader/ModalHeader.vue';
import RoomDetails from '../../Molecules/Modal/RoomDetails/RoomDetails.vue';
import BookingForm, {
  type BookingFormProps,
} from '../../Molecules/Modal/BookingForm/BookingForm.vue';
import type { Room } from '../../../types/room';

type RoomDetailsProps = { room: Room };

defineProps({
  popupModal: {
    type: Object as PropType<PopupModalProps>,
    required: true,
  },
  modalHeader: {
    type: Object as PropType<ModalHeaderProps>,
    required: true,
  },
  roomDetails: {
    type: Object as PropType<RoomDetailsProps>,
    required: true,
  },
  bookingForm: {
    type: Object as PropType<BookingFormProps>,
    required: true,
  },
});

const emit = defineEmits(['submit']);

const handleSubmit = (formData: any) => {
  emit('submit', formData);
};
</script>
