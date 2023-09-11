import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Input from "./index";

const placeholder = "input name";
const inputText = "inputed text";

const variants: { variant: "default" | "danger"; style: string }[] = [
  { variant: "default", style: "border-gray focus:shadow-gray" },
  { variant: "danger", style: "border-red-400 focus:shadow-red-400" },
];

describe("Input test", () => {
  test.each(variants)(
    "Should render variant correctly",
    ({ variant, style }) => {
      render(<Input placeholder={placeholder} variant={variant} />);

      const inputElement = screen.getByTestId("input-element");
      expect(inputElement).toHaveClass(style);
    }
  );

  test("sould handle input user", () => {
    render(<Input placeholder={placeholder} />);
    const inputElement = screen.getByTestId("input-element");

    fireEvent.focus(inputElement);
    fireEvent.change(inputElement, {
      target: {
        value: inputText,
      },
    });
    expect(inputElement).toHaveValue(inputText);
  });
});
