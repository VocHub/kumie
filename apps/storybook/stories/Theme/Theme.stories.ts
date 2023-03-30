import { ThemeToggle } from '@jet-black/ui';
import { themes } from '@jet-black/types';

import type { Meta, StoryObj } from '@storybook/svelte';

const meta = {
  title: 'Theme switcher',
  component: ThemeToggle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    theme: {
      control: 'theme',
      options: themes,
      description: `Controls the current shown svg element. Reactive: When the theme changes, the component will animate to the next svg.`
    }
  }
} satisfies Meta<ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dark: Story = {
  args: {
    theme: 'dark'
  }
};

export const Light: Story = {
  args: {
    theme: 'light'
  }
};
