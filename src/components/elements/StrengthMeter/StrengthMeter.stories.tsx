import type { Meta, StoryObj } from "@storybook/react";
import StrengthMeter from "./index";

const meta: Meta<typeof StrengthMeter> = {
  component: StrengthMeter,
  args: {
    variant: "idle",
    className: "w-full max-w-[500px]",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["empty", "poor", "good", "strong"],
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StrengthMeter>;

export const Default: Story = {};
