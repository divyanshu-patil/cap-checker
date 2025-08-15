"use client";
import React, { useContext } from "react";
import Button from "./Button";
import { submitInstitutes } from "@/lib/api/submitInstitutes";
import { InstituteCodeContext } from "@/context/InstituteCodeContext";

const SubmitButton = () => {
  const { instituteCodes } = useContext(InstituteCodeContext);
  return (
    <Button
      title="Submit"
      onClick={() => submitInstitutes(instituteCodes)}
      className="py-4 bg-violet-900 hover:bg-violet-800"
    />
  );
};

export default SubmitButton;
