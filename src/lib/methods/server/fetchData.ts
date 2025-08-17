import axios from "axios";
import { checkIfCapStarted } from "./capChecker";

interface Data {
  status: boolean;
  data?: any;
}

export async function fetchDataStatus(collegeCodes: number[]): Promise<Data> {
  const { data } = await axios.get(process.env.TARGET_SITE as string);
  const capAllotmentAvailable = await checkIfCapStarted(data, 1);
  if (capAllotmentAvailable) {
    return { status: true, data };
    // await getCollegeDataFromCodes(data, collegeCodes);
  }
  return { status: false };
}
