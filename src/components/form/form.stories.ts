import type { Meta, StoryObj } from "@storybook/react";

import Page from "./form";

const meta = {
  title: "Form",
  component: Page,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Form component",
      },
    },
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FormStory: Story = {
  args: {},
};
