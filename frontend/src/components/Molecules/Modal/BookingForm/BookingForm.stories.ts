import type { Meta, StoryObj } from '@storybook/vue3';
import BookingForm from './BookingForm.vue';

const meta: Meta<typeof BookingForm> = {
  title: 'Molecules/Modal/BookingForm',
  component: BookingForm,
  tags: ['autodocs'],
  argTypes: {
    bookingDate: {
      control: 'text',
      description: 'The date of the booking.',
    },
    startTime: {
      control: 'text',
      description: 'The start time for the booking.',
    },
    endTime: {
      control: 'text',
      description: 'The end time for the booking.',
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
    availableStartTimes: {
      control: 'object',
      description: 'List of available start times for the booking.',
    },
    availableEndTimes: {
      control: 'object',
      description: 'List of available end times for the booking.',
    },
    formatTime: {
      action: 'formatTime',
      description: 'Function to format the start and end times.',
    },
    today: {
      control: 'text',
      description:
        'Today’s date, used for the minimum date in the date picker.',
    },
  },
  args: {
    bookingDate: '',
    startTime: '',
    endTime: '',
    availabilityMessage: 'Your selected time is available!',
    isLoading: false,
    isTimeSlotAvailable: true,
    availableStartTimes: ['09:00', '10:00', '11:00'],
    availableEndTimes: ['12:00', '13:00', '14:00'],
    formatTime: (time: string) => time,
    today: new Date().toISOString().split('T')[0],
  },
} satisfies Meta<typeof BookingForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    bookingDate: '',
    startTime: '',
    endTime: '',
    availabilityMessage: 'Your selected time is available!',
    isLoading: false,
    isTimeSlotAvailable: true,
    availableStartTimes: ['09:00', '10:00', '11:00'],
    availableEndTimes: ['12:00', '13:00', '14:00'],
  },
};

export const LoadingState: Story = {
  args: {
    bookingDate: '2025-01-28',
    startTime: '10:00',
    endTime: '12:00',
    availabilityMessage: 'Your selected time is available!',
    isLoading: true,
    isTimeSlotAvailable: true,
    availableStartTimes: ['09:00', '10:00', '11:00'],
    availableEndTimes: ['12:00', '13:00', '14:00'],
  },
};

export const UnavailableTimeSlot: Story = {
  args: {
    bookingDate: '2025-01-28',
    startTime: '10:00',
    endTime: '12:00',
    availabilityMessage: 'Sorry, this time slot is not available.',
    isLoading: false,
    isTimeSlotAvailable: false,
    availableStartTimes: ['09:00', '10:00', '11:00'],
    availableEndTimes: ['12:00', '13:00', '14:00'],
  },
};

export const WithPreselectedValues: Story = {
  args: {
    bookingDate: '2025-01-28',
    startTime: '10:00',
    endTime: '12:00',
    availabilityMessage: 'Your selected time is available!',
    isLoading: false,
    isTimeSlotAvailable: true,
    availableStartTimes: ['09:00', '10:00', '11:00'],
    availableEndTimes: ['12:00', '13:00', '14:00'],
  },
};
