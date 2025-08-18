import axios from "axios";

import { checkIfCapStarted } from "./capChecker";

interface Data {
  status: boolean;
  data?: any;
}

export async function fetchDataStatus(capNumber = 1): Promise<Data> {
  console.log("from fetch data status", capNumber);
  const { data } = await axios.get(process.env.TARGET_SITE as string);
  const capAllotmentAvailable = await checkIfCapStarted(data, capNumber);
  if (capAllotmentAvailable) {
    return { status: true, data };
  }
  return { status: false };
}
