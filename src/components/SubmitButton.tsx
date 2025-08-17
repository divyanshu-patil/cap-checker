"use client";
import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

import Button from "./Button";
import { strings } from "@/constants/strings";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const SubmitButton = ({ onClick, className, ...props }: ButtonProps) => {
  return (
    <Button
      title={strings.actions.downloadPdfZip}
      onClick={onClick}
      className={twMerge(
        "py-4 bg-gradient-to-r from-violet-700 to-purple-500 bg-[length:200%_200%] transition-transform duration-300 animate-gradient",
        className
      )}
      {...props}
    />
  );
};

export default SubmitButton;
