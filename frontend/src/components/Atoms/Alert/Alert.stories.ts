import type { Meta, StoryObj } from '@storybook/vue3';
import Alert from './Alert.vue';

const meta: Meta<typeof Alert> = {
  title: 'Atoms/Alert',
  component: Alert,
  argTypes: {
    alert: {
      control: 'object',
      description: 'Alert object with type and message',
    },
  },
  args: {
    alert: {
      id: 1,
      type: 'success',
      message: 'This is a success alert!',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    alert: {
      id: 1,
      type: 'success',
      message: 'This is a success alert!',
    },
  },
};

export const Error: Story = {
  args: {
    alert: {
      id: 2,
      type: 'error',
      message: 'This is an error alert!',
    },
  },
};
