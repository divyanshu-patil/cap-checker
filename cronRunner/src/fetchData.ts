import axios from "axios";

import { checkIfCapStarted } from "./capChecker";

interface Data {
  status: boolean;
  data?: any;
}
const TARGET_SITE =
  "https://dse2025.mahacet.org.in/dse25/index.php/hp_controller/instwiseallotment";

export async function fetchDataStatus(capNumber = 1): Promise<Data> {
  // console.log("from fetch data status", capNumber);
  // console.log("target site :", TARGET_SITE);
  const { data } = await axios.get(TARGET_SITE as string);
  const capAllotmentAvailable = await checkIfCapStarted(data, capNumber);
  if (capAllotmentAvailable) {
    return { status: true, data };
  }
  return { status: false };
}
