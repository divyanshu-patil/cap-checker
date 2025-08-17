"use client";
import React, { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({
  title = "Add",
  className,
  onClick,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={twMerge(
        `text-white px-8 py-2 rounded-full cursor-pointer bg-violet-700 border-[1px] border-violet-600 hover:bg-violet-900 transition-colors duration-300`,
        className
      )}
      onClick={onClick}
      {...props}
    >
      {title}
    </button>
  );
};

export default Button;
