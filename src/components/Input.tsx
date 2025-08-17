import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}
const Input = ({
  placeholder = "Institute code ex. 6273",
  ...props
}: InputProps) => {
  return (
    <input
      type="number"
      placeholder={placeholder}
      className="bg-neutral-800 w-full px-6 py-2 md:px-8 md:py-4 rounded-full border-2 border-neutral-700 text-lg"
      {...props}
    />
  );
};

export default Input;
