import axios, { AxiosResponse } from "axios";

type SubmitResponse = {
  success: boolean;
  received?: string;
  error?: string;
};

export const submitInstitutes = async (instituteCodes: number[]) => {
  try {
    const res: AxiosResponse<SubmitResponse> = await axios.post(
      "/api/getInstData",
      { codes: instituteCodes }
    );
    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
};
