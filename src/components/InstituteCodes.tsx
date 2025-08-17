"use client";
import { useContext } from "react";

import { InstituteCodeContext } from "@/context/InstituteCodeContext";

import CodeItem from "./CodeItem";

const InstituteCodes = () => {
  const { instituteCodes, setInstituteCodes } =
    useContext(InstituteCodeContext);

  const removeCode = (code: number) => {
    setInstituteCodes((prev) => {
      const newCodes = prev.filter((val) => val !== code);
      return newCodes;
    });
  };

  return (
    <>
      {instituteCodes.length > 0 && (
        <div
          className="w-full px-6 py-4 bg-neutral-900 border-2 border-neutral-700 rounded-xl
      grid grid-cols-3 md:grid-cols-5 gap-y-6 gap-x-7
    "
        >
          {instituteCodes.map((item, index) => (
            <CodeItem key={index} removeCode={removeCode}>
              {item}
            </CodeItem>
          ))}
        </div>
      )}
    </>
  );
};

export default InstituteCodes;
