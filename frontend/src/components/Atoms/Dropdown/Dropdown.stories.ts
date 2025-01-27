import type { Meta, StoryObj } from '@storybook/vue3';
import Dropdown from './Dropdown.vue';
const meta: Meta<typeof Dropdown> = {
  title: 'Atoms/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'The selected value of the dropdown.',
    },
    availableLabels: {
      control: 'object',
      description: 'Array of options to display in the dropdown.',
    },
    label: {
      control: 'text',
      description: 'The label for the dropdown.',
    },
  },
  args: {
    modelValue: '',
    availableLabels: ['Option 1', 'Option 2', 'Option 3'],
    label: 'Select an option',
  },
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    modelValue: '',
    availableLabels: ['Option 1', 'Option 2', 'Option 3'],
    label: 'Select an option',
  },
};

export const WithPreselectedValue: Story = {
  args: {
    modelValue: 'Option 2',
    availableLabels: ['Option 1', 'Option 2', 'Option 3'],
    label: 'Select an option',
  },
};
