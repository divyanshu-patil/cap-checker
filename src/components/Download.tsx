"use client";
import { useContext, useState } from "react";

import { InstituteCodeContext } from "@/context/InstituteCodeContext";

import { submitInstitutes } from "@/lib/api/submitInstitutes";

import SubmitButton from "./SubmitButton";
import Loader from "./Loader";
import Error from "./Error";

import {
  InvalidFieldsError,
  MissingFieldsError,
  NotFoundError,
  ServerError,
} from "@/lib/errors";

const Download = () => {
  const { instituteCodes } = useContext(InstituteCodeContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClick = async () => {
    setLoading(true);
    try {
      await submitInstitutes(instituteCodes);
    } catch (error) {
      if (error instanceof NotFoundError) {
        setError(error.message);
      } else if (error instanceof MissingFieldsError) {
        setError(error.message);
      } else if (error instanceof InvalidFieldsError) {
        setError(error.message);
      } else if (error instanceof ServerError) {
        setError(error.message);
      } else {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {error && <Error dismissError={() => setError("")} msg={error} />}
      {loading && <Loader />}
      <SubmitButton onClick={handleClick} />
    </>
  );
};

export default Download;
