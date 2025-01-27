import type { Meta, StoryFn } from '@storybook/vue3';
import RoomDetails from './RoomDetails.vue';

export default {
  title: 'Molecules/Modal/RoomDetails',
  component: RoomDetails,
  argTypes: {
    room: {
      control: 'object',
      description: 'Room data with capacity, description, and equipment',
    },
  },
} as Meta;

const Template: StoryFn = (args) => ({
  components: { RoomDetails },
  setup() {
    return { args };
  },
  template: '<RoomDetails v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  room: {
    capacity: 4,
    description: 'A spacious and comfortable room with modern amenities.',
    equipements: [
      { name: 'Wi-Fi' },
      { name: 'Projector' },
      { name: 'Air Conditioning' },
    ],
  },
};

export const NoEquipments = Template.bind({});
NoEquipments.args = {
  room: {
    capacity: 2,
    description: 'A quiet room with a beautiful view.',
    equipements: [],
  },
};
