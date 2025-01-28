import type { Meta, StoryObj } from '@storybook/vue3';
import BookingForm from './BookingForm.vue';

const meta: Meta<typeof BookingForm> = {
  title: 'Molecules/Modal/BookingForm',
  component: BookingForm,
  tags: ['autodocs'],
  argTypes: {
    handleSubmit: {
      action: 'handleSubmit',
      description: 'Function triggered when the form is submitted.',
    },
    inputFieldDate: {
      control: 'object',
      description: 'Props for the InputField component.',
    },
    startTimeDropdown: {
      control: 'object',
      description: 'Props for the Dropdown component for start time.',
    },
    endTimeDropdown: {
      control: 'object',
      description: 'Props for the Dropdown component for end time.',
    },
    availabilityMessage: {
      control: 'text',
      description: 'Message about the availability of the time slot.',
    },
    isLoading: {
      control: 'boolean',
      description: 'Whether the form is in a loading state.',
    },
    isTimeSlotAvailable: {
      control: 'boolean',
      description: 'Whether the selected time slot is available.',
    },
  },
  args: {
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
    },
    endTimeDropdown: {
      modelValue: '',
      availableLabels: ['12:00', '13:00', '14:00'],
      label: 'Fin des temps',
    },
    availabilityMessage: 'Your selected time is available!',
    isLoading: false,
    isTimeSlotAvailable: true,
  },
} satisfies Meta<typeof BookingForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    availabilityMessage: 'Your selected time is available!',
    isLoading: false,
    isTimeSlotAvailable: true,
  },
};

export const LoadingState: Story = {
  args: {
    inputFieldDate: {
      label: 'Date',
      type: 'date',
      modelValue: '2025-01-28',
      min: new Date().toISOString().split('T')[0],
    },
    startTimeDropdown: {
      modelValue: '10:00',
      availableLabels: ['09:00', '10:00', '11:00'],
      label: 'Heure de début',
    },
    endTimeDropdown: {
      modelValue: '12:00',
      availableLabels: ['12:00', '13:00', '14:00'],
      label: 'Fin des temps',
    },
    availabilityMessage: 'Your selected time is available!',
    isLoading: true,
    isTimeSlotAvailable: true,
  },
};

export const UnavailableTimeSlot: Story = {
  args: {
    inputFieldDate: {
      label: 'Date',
      type: 'date',
      modelValue: '2025-01-28',
      min: new Date().toISOString().split('T')[0],
    },
    startTimeDropdown: {
      modelValue: '10:00',
      availableLabels: ['09:00', '10:00', '11:00'],
      label: 'Heure de début',
    },
    endTimeDropdown: {
      modelValue: '12:00',
      availableLabels: ['12:00', '13:00', '14:00'],
      label: 'Fin des temps',
    },
    availabilityMessage: 'Sorry, this time slot is not available.',
    isLoading: false,
    isTimeSlotAvailable: false,
  },
};

export const WithPreselectedValues: Story = {
  args: {
    inputFieldDate: {
      label: 'Date',
      type: 'date',
      modelValue: '2025-01-28',
      min: new Date().toISOString().split('T')[0],
    },
    startTimeDropdown: {
      modelValue: '10:00',
      availableLabels: ['09:00', '10:00', '11:00'],
      label: 'Heure de début',
    },
    endTimeDropdown: {
      modelValue: '12:00',
      availableLabels: ['12:00', '13:00', '14:00'],
      label: 'Fin des temps',
    },
    availabilityMessage: 'Your selected time is available!',
    isLoading: false,
    isTimeSlotAvailable: true,
  },
};
