import type { Meta, StoryObj } from "@storybook/react";
import ResetPassForm from "./index";

const meta: Meta<typeof ResetPassForm> = {
  component: ResetPassForm,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ResetPassForm>;

export const Default: Story = {};
