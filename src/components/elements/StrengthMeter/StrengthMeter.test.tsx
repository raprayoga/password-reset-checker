import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import StrengthMeter from "./index";

const variants: {
  variant: "empty" | "poor" | "good" | "strong";
  width: string;
  color?: string;
}[] = [
  { variant: "empty", width: "0%" },
  { variant: "poor", width: "33%", color: "rgb(239, 68, 68)" },
  { variant: "good", width: "66%", color: "rgb(234, 179, 8)" },
  { variant: "strong", width: "100%", color: "rgb(34, 197, 94)" },
];

const setup = (props: React.ComponentProps<typeof StrengthMeter>) => {
  const utils = render(<StrengthMeter {...props} />);

  const strengthMeterElement = screen.getByTestId("indicator-element");

  return { ...utils, strengthMeterElement };
};

describe("StrengthMeter test", () => {
  test.each(variants)(
    "Should render variant correctly",
    ({ variant, width, color }) => {
      const { strengthMeterElement } = setup({ variant });

      expect(strengthMeterElement).toHaveStyle(
        `width: ${width}, background-color: ${color}`
      );
    }
  );
});
