import type { Meta, StoryObj } from '@storybook/vue3';
import Typography from './Typography.vue';

const meta: Meta<typeof Typography> = {
  title: 'Atoms/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'subtitle', 'body', 'small', 'muted'],
    },
    tag: { control: 'select', options: ['p', 'div', 'span', 'h1', 'h2', 'h3'] },
    customClass: { control: 'text' },
  },
  args: {
    text: 'This is a typography text',
    variant: 'body',
    tag: 'p',
    customClass: '',
  },
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'This is the body text.',
  },
};

export const Heading1: Story = {
  args: {
    text: 'This is a heading 1',
    variant: 'h1',
  },
};

export const Heading2: Story = {
  args: {
    text: 'This is a heading 2',
    variant: 'h2',
  },
};

export const Heading3: Story = {
  args: {
    text: 'This is a heading 3',
    variant: 'h3',
  },
};

export const Subtitle: Story = {
  args: {
    text: 'This is a subtitle',
    variant: 'subtitle',
  },
};

export const SmallText: Story = {
  args: {
    text: 'This is small text',
    variant: 'small',
  },
};

export const MutedText: Story = {
  args: {
    text: 'This is muted text',
    variant: 'muted',
  },
};

export const CustomTag: Story = {
  args: {
    text: 'This is a custom tag text',
    tag: 'span',
    variant: 'body',
  },
};

export const CustomClass: Story = {
  args: {
    text: 'This is text with a custom class',
    customClass: 'text-blue-500 font-bold',
  },
};
