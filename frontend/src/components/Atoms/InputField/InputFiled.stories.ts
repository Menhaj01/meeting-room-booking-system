import type { Meta, StoryObj } from '@storybook/vue3';
import InputField from './InputField.vue';

const meta: Meta<typeof InputField> = {
  title: 'Atoms/InputField',
  component: InputField,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    type: {
      control: 'select',
      options: ['text', 'number', 'password', 'email', 'date', 'time'],
    },
    modelValue: { control: 'text' },
    min: { control: 'text' },
    placeholder: { control: 'text' },
    inputClass: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'Input Label',
    type: 'text',
    modelValue: '',
    min: '',
    placeholder: 'Enter something...',
    inputClass: '',
    disabled: false,
  },
} satisfies Meta<typeof InputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default Input',
    modelValue: 'Default Text',
  },
};

export const Email: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    modelValue: 'example@email.com',
    placeholder: 'Enter your email',
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    modelValue: 'password123',
    placeholder: 'Enter your password',
  },
};

export const Number: Story = {
  args: {
    label: 'Age',
    type: 'number',
    modelValue: 25,
    placeholder: 'Enter your age',
    min: 18,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    modelValue: 'You cannot edit this',
    disabled: true,
  },
};

export const CustomClass: Story = {
  args: {
    label: 'Styled Input',
    modelValue: 'Styled Input Text',
    inputClass: 'border-red-500 bg-gray-100 text-gray-700',
  },
};
