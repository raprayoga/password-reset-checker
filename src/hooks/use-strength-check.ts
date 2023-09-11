import React, { useState } from "react";

interface StrengthState {
  value: string;
}

const initialStrengthState: StrengthState = {
  value: "empty",
};

function containsUppercase(str: string) {
  return RegExp(/[A-Z]/).exec(str) ? 15 : 0;
}

function containsLowercase(str: string) {
  return RegExp(/[a-z]/).exec(str) ? 5 : 0;
}

function containsSymbol(str: string) {
  return RegExp(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/).exec(str) ? 20 : 0;
}

function containsNumbers(str: string) {
  return RegExp(/\d/).exec(str) ? 20 : 0;
}

function containsMinChar(str: string) {
  return str.length > 5 ? 40 : 0;
}

function generateLevel(percentage: number) {
  if (percentage > 0 && percentage < 60) return "poor";
  else if (percentage >= 60 && percentage < 80) return "good";
  else if (percentage >= 80 && percentage <= 100) return "strong";
  else return "empty";
}

const useStrengthCheck = () => {
  const [level, setLevel] = useState(initialStrengthState);

  const checker = (e: React.ChangeEvent<HTMLInputElement>) => {
    let percentage = 0;
    const value = e.currentTarget.value;
    percentage += containsUppercase(value);
    percentage += containsLowercase(value);
    percentage += containsSymbol(value);
    percentage += containsNumbers(value);
    percentage += containsMinChar(value);

    setLevel({ value: generateLevel(percentage) });
  };

  return {
    level: level.value,
    checker,
  };
};

export default useStrengthCheck;
