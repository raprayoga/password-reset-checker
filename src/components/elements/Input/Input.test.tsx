import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Input from "./index";

const placeholder = "input name";
const inputText = "inputed text";

const variants: { variant: "default" | "danger"; style: string }[] = [
  { variant: "default", style: "border-gray focus:shadow-gray" },
  { variant: "danger", style: "border-red-400 focus:shadow-red-400" },
];

const setup = (props: React.ComponentProps<typeof Input>) => {
  const utils = render(<Input placeholder={placeholder} {...props} />);

  const inputElement = screen.getByTestId("input-element");

  return { ...utils, inputElement };
};

describe("Input test", () => {
  test.each(variants)(
    "Should render variant correctly",
    ({ variant, style }) => {
      const { inputElement } = setup({ placeholder, variant });

      expect(inputElement).toHaveClass(style);
    }
  );

  test("sould handle input user", () => {
    const { inputElement } = setup({});

    fireEvent.change(inputElement, {
      target: {
        value: inputText,
      },
    });
    expect(inputElement).toHaveValue(inputText);
  });

  test("sould handle toggle show password", () => {
    const { inputElement } = setup({});

    fireEvent.click(screen.getByTestId("show-toggle-element"));
    expect(inputElement).toHaveAttribute("type", "text");
  });
});
