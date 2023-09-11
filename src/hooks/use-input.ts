import React, { useReducer } from "react";

enum InputActionKind {
  INPUT = "INPUT",
  BLUR = "BLUR",
}

interface InputAction {
  type: InputActionKind;
  value: string;
}

interface InputState {
  value: string;
  isTouched: boolean;
}

const initialInputState: InputState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state: InputState, action: InputAction) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === "BLUR") {
    return { isTouched: true, value: state.value };
  }
  return state;
};

const useInput = (validateFuncs: ((param: string) => void)[]) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const hasErrors = validateFuncs
    .filter((validateFunc) => validateFunc(inputState.value))
    .map((validateFunc) => validateFunc(inputState.value));

  const valueIsNotValid = hasErrors.length > 0 && inputState.isTouched;

  const valueChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: InputActionKind.INPUT, value: e.currentTarget.value });
  };

  const inputBlurHandler = () => {
    dispatch({
      type: InputActionKind.BLUR,
      value: "",
    });
  };

  return {
    value: inputState.value,
    isNotValid: valueIsNotValid,
    hasErrors,
    valueChangeHandler,
    inputBlurHandler,
  };
};

export default useInput;
