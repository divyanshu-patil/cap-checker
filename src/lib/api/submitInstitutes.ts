import axios, { AxiosError, AxiosResponse } from "axios";
import {
  InvalidFieldsError,
  MissingFieldsError,
  NotFoundError,
  ServerError,
} from "../errors";

type SubmitResponse = {
  success: boolean;
  received?: string;
  error?: string;
};

export const submitInstitutes = async (instituteCodes: number[]) => {
  try {
    const res: AxiosResponse<ArrayBuffer> = await axios.post(
      "/api/getInstPdfZip",
      { codes: instituteCodes },
      { responseType: "blob" }
    );
    const blob = new Blob([res.data], { type: "application/zip" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "capPdf.zip";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    const error = err as AxiosError;
    if (error.status === 404) {
      throw new NotFoundError("there are no colleges with given college code");
    } else if (error.status === 400 && error.name === "MissingFieldsError") {
      throw new MissingFieldsError("provide college code");
    } else if (error.status === 400) {
      throw new InvalidFieldsError("invalid request");
    } else if (error.status === 500) {
      throw new ServerError("there is problem getting data...");
    } else {
      throw new Error(error.message);
    }
  }
};
