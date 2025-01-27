import type { Meta, StoryObj } from '@storybook/vue3';

import SearchForm from './SearchForm.vue';

const meta: Meta<typeof SearchForm> = {
  title: 'Molecules/SearchForm',
  component: SearchForm,
  tags: ['autodocs'],
  argTypes: {
    fields: { control: 'object' },
    isLoading: { control: 'boolean' },
    onClick: { action: 'button-clicked' },
  },
  args: {
    fields: [
      {
        label: 'First Name',
        type: 'text',
        modelValue: '',
        placeholder: 'Enter your first name',
        onUpdate: (value: string | number) =>
          console.log('Updated First Name:', value),
      },
      {
        label: 'Last Name',
        type: 'text',
        modelValue: '',
        placeholder: 'Enter your last name',
        onUpdate: (value: string | number) =>
          console.log('Updated Last Name:', value),
      },
      {
        label: 'Email',
        type: 'email',
        modelValue: '',
        placeholder: 'Enter your email',
        onUpdate: (value: string | number) =>
          console.log('Updated Email:', value),
      },
    ],
    isLoading: false,
  },
} satisfies Meta<typeof SearchForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fields: [
      {
        label: 'First Name',
        type: 'text',
        modelValue: '',
        placeholder: 'Enter your first name',
        onUpdate: (value: string | number) =>
          console.log('Updated First Name:', value),
      },
      {
        label: 'Last Name',
        type: 'text',
        modelValue: '',
        placeholder: 'Enter your last name',
        onUpdate: (value: string | number) =>
          console.log('Updated Last Name:', value),
      },
      {
        label: 'Email',
        type: 'email',
        modelValue: '',
        placeholder: 'Enter your email',
        onUpdate: (value: string | number) =>
          console.log('Updated Email:', value),
      },
    ],
    isLoading: false,
  },
};

export const LoadingState: Story = {
  args: {
    fields: [
      {
        label: 'First Name',
        type: 'text',
        modelValue: '',
        placeholder: 'Enter your first name',
        onUpdate: (value: string | number) =>
          console.log('Updated First Name:', value),
      },
    ],
    isLoading: true,
  },
};

export const NoFields: Story = {
  args: {
    fields: [],
    isLoading: false,
  },
};
