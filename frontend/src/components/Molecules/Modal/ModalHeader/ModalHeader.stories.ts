import type { Meta, StoryFn } from '@storybook/vue3';
import ModalHeader from './ModalHeader.vue';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Molecules/Modal/ModalHeader',
  component: ModalHeader,
  argTypes: {
    title: { control: 'text', description: 'Title of the modal' },
    onClose: {
      action: 'close clicked',
      description: 'Triggered when close button is clicked',
    },
  },
} as Meta;

const Template: StoryFn = (args) => ({
  components: { ModalHeader },
  setup() {
    return { args };
  },
  template: '<ModalHeader v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  title: 'Modal Title',
  onClose: action('close clicked'),
};
