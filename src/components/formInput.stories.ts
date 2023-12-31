import type { Meta, StoryObj } from "@storybook/react";

import Page from "./formInput";
import StorybookFormProvider from "../StorybookFormProvider";

const meta = {
  title: "Form",
  component: Page,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Input form component",
      },
    },
  },
  decorators: [StorybookFormProvider()],
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FormInput: Story = {
  args: {
    name: "name",
    label: "First name",
    isError: false,
  },
};
