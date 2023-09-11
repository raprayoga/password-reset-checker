import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import ResetPassForm from "@/components/modules/ResetPassForm/index";

const setup = () => {
  const utils = render(<ResetPassForm data-testid="form-element" />);

  const formElement = screen.getByTestId("form-element");

  return { ...utils, formElement };
};

describe("StrengthMeter test", () => {
  test("Should render error feedback", () => {
    const { formElement } = setup();

    const inputPassElement = screen.getByPlaceholderText("Password");
    fireEvent.focus(inputPassElement);
    fireEvent.blur(inputPassElement);
    expect(formElement).toHaveTextContent("this field is required");

    fireEvent.change(inputPassElement, {
      target: {
        value: "abc",
      },
    });
    expect(formElement).toHaveTextContent("must be at least 6 characters long");

    const inputPassConfElement =
      screen.getByPlaceholderText("Password Confirm");
    fireEvent.focus(inputPassConfElement);
    fireEvent.change(inputPassConfElement, {
      target: {
        value: "abd",
      },
    });
    fireEvent.blur(inputPassConfElement);
    expect(formElement).toHaveTextContent("not match with password");
  });

  test("Should update strength meter", () => {
    setup();
    const strengthMeterElement = screen.getByTestId("strength-meter-element");
    const inputPassElement = screen.getByPlaceholderText("Password");
    fireEvent.change(inputPassElement, {
      target: {
        value: "abc",
      },
    });
    expect(strengthMeterElement).toHaveTextContent("poor");

    fireEvent.change(inputPassElement, {
      target: {
        value: "abcASD",
      },
    });
    expect(strengthMeterElement).toHaveTextContent("good");

    fireEvent.change(inputPassElement, {
      target: {
        value: "abcASD123!@#",
      },
    });
    expect(strengthMeterElement).toHaveTextContent("strong");
  });
});
