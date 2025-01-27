import type { Meta, StoryObj } from '@storybook/vue3';
import LoadingComponent from './LoadingState.vue';

const meta: Meta<typeof LoadingComponent> = {
  title: 'Atoms/LoadingComponent',
  component: LoadingComponent,
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text', defaultValue: 'Loading application data...' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const CustomMessage: Story = {
  args: {
    message: 'Fetching data, please wait...',
  },
};
