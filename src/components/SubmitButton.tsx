"use client";
import React, { ButtonHTMLAttributes, useContext, useState } from "react";
import Button from "./Button";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const SubmitButton = ({ onClick, className, ...props }: ButtonProps) => {
  return (
    <Button
      title="Download zip"
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
