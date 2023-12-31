import type { Meta, StoryObj } from "@storybook/react";

import Page from "./page";

const meta = {
  title: "Main Page",
  component: Page,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Homepage",
      },
    },
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MainPage: Story = {
  args: {},
};
