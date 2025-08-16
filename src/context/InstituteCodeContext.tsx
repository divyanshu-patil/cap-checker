"use client";
import { createContext, useState } from "react";

interface InstituteCodeContextType {
  instituteCodes: number[];
  setInstituteCodes: React.Dispatch<React.SetStateAction<number[]>>;
}

export const InstituteCodeContext = createContext<InstituteCodeContextType>({
  instituteCodes: [],
  setInstituteCodes: () => {},
});

export const InstituteCodeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [instituteCodes, setInstituteCodes] = useState<number[]>([16006, 3012]);

  return (
    <InstituteCodeContext.Provider
      value={{ instituteCodes, setInstituteCodes }}
    >
      {children}
    </InstituteCodeContext.Provider>
  );
};
