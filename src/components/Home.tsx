import DataInput from "./DataInput";
import InstituteCodes from "./InstituteCodes";
import { InstituteCodeProvider } from "@/context/InstituteCodeContext";
import { strings } from "@/constants/strings";
import Download from "./Download";

const Home = () => {
  return (
    <div className="h-screen self-center w-screen flex flex-col justify-center items-center gap-15">
      <div className="flex flex-col gap-4">
        <div>
          {strings.appName.split(" ").map((val, index) => (
            <span
              key={index}
              className=" text-6xl md:text-7xl lg:text-8xl font-bold"
            >
              <span key={index} className="text-violet-600">
                {val[0]}
              </span>
              {val.substring(1)}{" "}
            </span>
          ))}
        </div>
        <p className="text-center text-lg">dse cap downloader</p>
      </div>

      <InstituteCodeProvider>
        <div className="w-full max-w-96 md:max-w-[500px] mx-10 flex flex-col gap-10">
          <InstituteCodes />
          <DataInput />
          <Download />
        </div>
      </InstituteCodeProvider>
    </div>
  );
};

export default Home;
