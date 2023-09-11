import Input from "@/components/elements/Input";
import StrengthMeter from "@/components/elements/StrengthMeter";
import useInput from "@/hooks/use-input";
import useStrengthCheck from "@/hooks/use-strength-check";

export interface ResetPassFormProps
  extends React.HTMLAttributes<HTMLFormElement> {}

function ResetPassForm({ ...props }: ResetPassFormProps) {
  const isNotEmpty = (value: string) => {
    if (value.trim() === "") return "this field is required";
  };
  const isNotMatch = (value: string) => {
    if (value !== passwordValue) return "not match with password";
  };
  const isLessThen6Char = (value: string) => {
    if (value.length < 6) return "must be at least 6 characters long";
  };

  const {
    value: passwordValue,
    isNotValid: passwordNotValid,
    hasErrors: passwordValueHasError,
    valueChangeHandler: passwordValueChangeHandler,
    inputBlurHandler: passwordValueBlurHandler,
  } = useInput([isNotEmpty, isLessThen6Char]);

  const {
    value: passwordConfValue,
    isNotValid: passwordConfNotValid,
    hasErrors: passwordConfValueHasError,
    valueChangeHandler: passwordConfValueChangeHandler,
    inputBlurHandler: passwordConfValueBlurHandler,
  } = useInput([isNotEmpty, isNotMatch]);

  const { level, checker } = useStrengthCheck();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!passwordNotValid && !passwordConfNotValid) console.log("on submit");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[500px] p-8 rounded-lg shadow-md"
      {...props}
    >
      <div>
        <Input
          placeholder="Password"
          onChange={(e) => {
            passwordValueChangeHandler(e);
            checker(e);
          }}
          onBlur={passwordValueBlurHandler}
          value={passwordValue}
          variant={passwordNotValid ? "danger" : "default"}
        />
        <span className="text-[10px] text-red-500 float-right">
          {passwordNotValid && `${passwordValueHasError[0]}`}
        </span>
      </div>
      <div className="mt-8">
        <Input
          placeholder="Password Confirm"
          onChange={passwordConfValueChangeHandler}
          onBlur={passwordConfValueBlurHandler}
          value={passwordConfValue}
          variant={passwordConfNotValid ? "danger" : "default"}
        />
        <span className="text-[10px] text-red-500 float-right">
          {passwordConfNotValid && `${passwordConfValueHasError[0]}`}
        </span>
      </div>

      <div className="mt-5">
        <p className="font-bold text-sm">Strength</p>
        <StrengthMeter data-testid="strength-meter-element" variant={level} />
      </div>

      <div className="mt-10">
        <button className="py-2 px-4 text-center rounded-lg bg-blue-500 w-full text-sm text-white hover:opacity-90 transition-all duration-300">
          Submit
        </button>
      </div>
    </form>
  );
}

export { ResetPassForm };
