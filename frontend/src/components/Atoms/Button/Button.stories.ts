import type { Meta, StoryObj } from '@storybook/vue3';
import Button from './Button.vue';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    variant: { control: 'select', options: ['default'] },
    disabled: { control: 'boolean' },
    customClass: { control: 'text' },
    onClick: { action: 'clicked' },
  },
  args: {
    size: 'medium',
    variant: 'default',
    disabled: false,
    customClass: '',
    onClick: (event: MouseEvent) => alert('Button clicked!'),
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Click Me',
    variant: 'default',
  },
};

export const Small: Story = {
  args: {
    label: 'Click Me',
    size: 'small',
    variant: 'default',
  },
};

export const Large: Story = {
  args: {
    label: 'Click Me',
    size: 'large',
    variant: 'default',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
    variant: 'default',
  },
};

export const CustomClass: Story = {
  args: {
    label: 'With Custom Class',
    customClass: 'bg-blue-500 text-white',
    variant: 'default',
  },
};
