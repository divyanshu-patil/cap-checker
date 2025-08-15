"use client";
import React, { useContext, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { InstituteCodeContext } from "@/context/InstituteCodeContext";
import Error from "./Error";

const DataInput = () => {
  const { instituteCodes, setInstituteCodes } =
    useContext(InstituteCodeContext);

  const [ipValue, setIpValue] = useState("");
  const [error, setError] = useState("");

  const handleAdd = () => {
    if (ipValue.trim() === "") return;
    if (instituteCodes.length === 18) {
      setError("institute limit reached");
      return;
    }
    setInstituteCodes((prev) => {
      const newCodes = [...new Set<number>([...prev, parseInt(ipValue)])];
      return newCodes;
    });
  };
  return (
    <form
      className="flex gap-7"
      action=""
      onSubmit={(e) => {
        e.preventDefault();
        setIpValue("");
      }}
    >
      {error && <Error msg={error} dismissError={() => setError("")} />}
      {/* hello */}
      <Input value={ipValue} onChange={(e) => setIpValue(e.target.value)} />
      <Button onClick={handleAdd} />
    </form>
  );
};

export default DataInput;
