import axios, { AxiosError, AxiosResponse } from "axios";

import {
  InvalidFieldsError,
  MissingFieldsError,
  NotFoundError,
  ServerError,
} from "../errors";

// type SubmitResponse = {
//   success: boolean;
//   received?: string;
//   error?: string;
// };

export const submitInstitutes = async (
  instituteCodes: number[],
  capNumber = 0
) => {
  try {
    const apiUrl =
      capNumber === 0 ? "/api/getInstPdfZip" : "/api/getCapPdfZip/" + capNumber;
    const res: AxiosResponse<ArrayBuffer> = await axios.post(
      apiUrl,
      { codes: instituteCodes },
      { responseType: "blob" }
    );

    // get filename from headers
    const disposition = res.headers["content-disposition"];
    let filename = "capPdf.zip";
    if (disposition && disposition.includes("filename=")) {
      filename = disposition.split("filename=")[1].replace(/"/g, "");
    }

    const blob = new Blob([res.data], { type: "application/zip" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);

    const cap = capNumber === 0 ? "All cap rounds" : capNumber;
    const response = await axios.post("/api/log", {
      codes: instituteCodes,
      cap,
    });
    console.log(response.data);
  } catch (err: any) {
    const error = err as AxiosError<Blob>; // Blob response type
    const status = error.response?.status;
    let serverError: string | undefined;
    let name: string | undefined;

    if (error.response?.data instanceof Blob) {
      try {
        const text = await error.response.data.text(); // convert Blob to plain string
        const json = JSON.parse(text);
        serverError = json.error;
        name = json.name;
      } catch {
        // fallback if it's not valid JSON
        serverError = undefined;
      }
    }

    const message = serverError || error.message;
    console.log(serverError);
    console.log(error);
    if (status === 404) {
      throw new NotFoundError(message);
    } else if (status === 400 && name === MissingFieldsError.name) {
      throw new MissingFieldsError("provide college code");
    } else if (status === 400) {
      throw new InvalidFieldsError("invalid request");
    } else if (status === 500) {
      throw new ServerError(message);
    } else {
      throw new Error(error.message);
    }
  }
};
