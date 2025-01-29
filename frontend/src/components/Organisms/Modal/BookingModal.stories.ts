import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import BookingModal from './BookingModal.vue';
import type { Room } from '../../../types/room';

const meta: Meta<typeof BookingModal> = {
  title: 'Organisms/Modal/BookingModal',
  component: BookingModal,
  tags: ['autodocs'],
  argTypes: {
    popupModal: {
      control: 'object',
      description:
        'Props for controlling the visibility and behavior of the modal.',
    },
    modalHeader: {
      control: 'object',
      description: 'Props for the modal header.',
    },
    roomDetails: {
      control: 'object',
      description: 'Props for the room details.',
    },
    bookingForm: {
      control: 'object',
      description: 'Props for the booking form.',
    },
  },
  args: {
    popupModal: {
      open: true,
      onClose: () => {},
    },
    modalHeader: {
      title: 'Booking Form',
      onClose: () => {},
    },
    roomDetails: {
      room: {
        id: '1',
        name: 'Conference Room',
        description: 'A spacious room for meetings and events.',
        capacity: 20,
        equipements: [{ name: 'Projector' }, { name: 'Whiteboard' }],
        createdAt: '2023-01-01',
        updatedAt: '2023-01-01',
      } as Room,
    },
    bookingForm: {
      handleSubmit: () => {},
      inputFieldDate: {
        label: 'Date',
        type: 'date',
        modelValue: '',
        min: new Date().toISOString().split('T')[0],
      },
      startTimeDropdown: {
        modelValue: '',
        availableLabels: ['09:00', '10:00', '11:00'],
        label: 'Heure de début',
        onChange: function (event: Event): void {
          throw new Error('Function not implemented.');
        },
      },
      endTimeDropdown: {
        modelValue: '',
        availableLabels: ['12:00', '13:00', '14:00'],
        label: 'Heure de Fin',
        onChange: function (event: Event): void {
          throw new Error('Function not implemented.');
        },
      },
      availabilityMessage: 'Your selected time is available!',
      isLoading: false,
      isTimeSlotAvailable: true,
      buttonDisabled: false,
      isAlert: false,
    },
  },
} satisfies Meta<typeof BookingModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const showModal = ref(false);
    const toggleModal = () => {
      showModal.value = !showModal.value;
    };

    const closeModal = () => {
      showModal.value = false;
      args.popupModal.onClose?.();
    };

    return {
      components: { BookingModal },
      setup() {
        return { args, showModal, toggleModal, closeModal };
      },
      template: `
        <div>
          <button @click="toggleModal">Open Booking Modal</button>
          <BookingModal v-bind="args" :popupModal="{ open: showModal, onClose: closeModal }" :modalHeader="{...args.modalHeader, onClose: closeModal}" />
        </div>
      `,
    };
  },
};

export const LoadingState: Story = {
  render: (args) => {
    const showModal = ref(false);
    const toggleModal = () => {
      showModal.value = !showModal.value;
    };

    const closeModal = () => {
      showModal.value = false;
      args.popupModal.onClose?.();
    };

    return {
      components: { BookingModal },
      setup() {
        return { args, showModal, toggleModal, closeModal };
      },
      template: `
        <div>
          <button @click="toggleModal">Open Booking Modal</button>
          <BookingModal v-bind="args" :popupModal="{ open: showModal, onClose: closeModal }" :modalHeader="{ onClose: closeModal}" />
        </div>
      `,
    };
  },
};

export const UnavailableTimeSlot: Story = {
  render: (args) => {
    const showModal = ref(false);
    const toggleModal = () => {
      showModal.value = !showModal.value;
    };

    const closeModal = () => {
      showModal.value = false;
      args.popupModal.onClose?.();
    };

    return {
      components: { BookingModal },
      setup() {
        return { args, showModal, toggleModal, closeModal };
      },
      template: `
        <div>
          <button @click="toggleModal">Open Booking Modal</button>
          <BookingModal v-bind="args" :popupModal="{ open: showModal, onClose: closeModal }" :modalHeader="{ onClose: closeModal}" />
        </div>
      `,
    };
  },
};

export const WithPreselectedValues: Story = {
  render: (args) => {
    const showModal = ref(false);
    const toggleModal = () => {
      showModal.value = !showModal.value;
    };

    const closeModal = () => {
      showModal.value = false;
      args.popupModal.onClose?.();
    };

    return {
      components: { BookingModal },
      setup() {
        return { args, showModal, toggleModal, closeModal };
      },
      template: `
        <div>
          <button @click="toggleModal">Open Booking Modal</button>
          <BookingModal v-bind="args" :popupModal="{ open: showModal, onClose: closeModal }" :modalHeader="{ onClose: closeModal}" />
        </div>
      `,
    };
  },
};
