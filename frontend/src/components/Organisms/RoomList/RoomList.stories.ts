import type { Meta, StoryFn } from '@storybook/vue3';
import RoomCardsList from './RoomList.vue';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Organisms/RoomCardsList',
  component: RoomCardsList,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    availableRooms: {
      description: 'List of available rooms to display in the grid.',
    },
    openBookingModal: {
      action: 'openBookingModal',
      description:
        'Callback function triggered when the "Book Room" button is clicked.',
    },
  },
} as Meta<typeof RoomCardsList>;

const Template: StoryFn<typeof RoomCardsList> = (args) => ({
  components: { RoomCardsList },
  setup() {
    return { args };
  },
  template: '<RoomCardsList v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  availableRooms: [
    {
      name: 'Conference Room A',
      capacity: 10,
      description:
        'A spacious conference room equipped with the latest technology for effective meetings.',
      equipements: [
        { name: 'Projector' },
        { name: 'Whiteboard' },
        { name: 'Conference Phone' },
      ],
      id: '',
      createdAt: '',
      updatedAt: '',
    },
    {
      name: 'Meeting Room B',
      capacity: 4,
      description:
        'A smaller meeting room ideal for team discussions and brainstorming sessions.',
      equipements: [{ name: 'Whiteboard' }, { name: 'TV Screen' }],
      id: '',
      createdAt: '',
      updatedAt: '',
    },
    {
      name: 'Event Hall C',
      capacity: 50,
      description:
        'A large event hall perfect for conferences and presentations.',
      equipements: [
        { name: 'Projector' },
        { name: 'Microphone' },
        { name: 'Speakers' },
      ],
      id: '',
      createdAt: '',
      updatedAt: '',
    },
  ],
  openBookingModal: action('openBookingModal'),
};
