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
        "py-4 bg-gradient-to-r from-violet-700 to-purple-600 hover:bg-violet-800 ",
        className
      )}
      {...props}
    />
  );
};

export default SubmitButton;
