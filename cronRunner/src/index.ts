import path from "path";
import { fetchDataStatus } from "./fetchData";

import { getCollegeDataFromCodes } from "./getCollegeDataFromCodes";
import { exec } from "child_process";

import player from "play-sound";

const CAP_NUMBER = 3;
const COLLEGE_CODES = [6272];
const INTERVAL = 60; // 60 sec
const checkCapCronTask = async () => {
  console.log(
    "\n\n=====================running task at " +
      new Date().toTimeString() +
      " =================\n"
  );
  const result = await fetchDataStatus(CAP_NUMBER);
  if (!result.status || !result.data) return false;

  const collegeData = await getCollegeDataFromCodes(
    result.data,
    COLLEGE_CODES,
    CAP_NUMBER
  );

  makeSound();

  for (const clg of collegeData) {
    const url = clg[`cap${CAP_NUMBER}PdfUrl`];
    exec(`start chrome "${url}"`);
  }
  return true;
};

const makeSound = () => {
  const sound = player({
    player: "C:\\Program Files\\VideoLAN\\VLC\\vlc.exe" as any,
  });
  const file = path.resolve(__dirname, "spell.mp3");

  sound.play(file, (err) => {
    if (err) console.error("Error playing sound:", err);
    else console.log("Playing ended...");
  });
};

async function start() {
  console.log("inside start");
  const status = await checkCapCronTask();
  if (status) return console.log("started");
  const interval = setInterval(async () => {
    const status = await checkCapCronTask();
    if (status) {
      clearInterval(interval);
      console.log("cap started");
    } else {
      console.log("not started");
    }
  }, 1000 * INTERVAL);
}

start();
