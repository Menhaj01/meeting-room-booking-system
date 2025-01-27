import type { Meta, StoryFn } from '@storybook/vue3';
import RoomCard from './RoomCard.vue';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Molecules/RoomCard',
  parameters: {
    layout: 'centered',
  },
  component: RoomCard,
  argTypes: {
    room: {
      description:
        'Room details including name, capacity, description, and equipment list.',
    },
    openBookingModal: {
      action: 'openBookingModal',
      description:
        'Callback function triggered when the "Book Room" button is clicked.',
    },
  },
} as Meta<typeof RoomCard>;

const Template: StoryFn<typeof RoomCard> = (args) => ({
  components: { RoomCard },
  setup() {
    return { args };
  },
  template: '<RoomCard v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  room: {
    name: 'Conference Room A',
    capacity: 10,
    description:
      'A spacious conference room equipped with the latest technology for effective meetings.',
    equipements: [
      { name: 'Projector' },
      { name: 'Whiteboard' },
      { name: 'Conference Phone' },
    ],
  },
  openBookingModal: action('openBookingModal'),
};
