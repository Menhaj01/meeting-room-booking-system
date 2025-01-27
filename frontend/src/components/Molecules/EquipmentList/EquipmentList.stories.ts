import type { Meta, StoryObj } from '@storybook/vue3';
import EquipmentList from './EquipmentList.vue';

const meta: Meta<typeof EquipmentList> = {
  title: 'Molecules/EquipmentList',
  component: EquipmentList,
  tags: ['autodocs'],
  argTypes: {
    equipments: {
      control: 'object',
      description: 'List of equipment items to display',
      defaultValue: [],
    },
  },
  args: {
    equipments: [
      { name: 'Helmet' },
      { name: 'Gloves' },
      { name: 'Boots' },
      { name: 'Backpack' },
    ],
  },
} satisfies Meta<typeof EquipmentList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    equipments: [
      { name: 'Helmet' },
      { name: 'Gloves' },
      { name: 'Boots' },
      { name: 'Backpack' },
    ],
  },
};

export const NoEquipments: Story = {
  args: {
    equipments: [],
  },
};

export const CustomEquipments: Story = {
  args: {
    equipments: [
      { name: 'Rope' },
      { name: 'First Aid Kit' },
      { name: 'Flashlight' },
      { name: 'Compass' },
    ],
  },
};
