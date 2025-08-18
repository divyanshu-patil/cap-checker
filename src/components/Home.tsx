import { InstituteCodeProvider } from "@/context/InstituteCodeContext";

import { strings } from "@/constants/strings";

import DataInput from "./DataInput";
import InstituteCodes from "./InstituteCodes";
import Download from "./Download";

const Home = () => {
  return (
    <div className="min-h-[90vh] pb-32 self-center max-w-screen  overflow-hidden flex flex-col justify-center items-center gap-15">
      <div className="flex flex-col gap-4">
        <div>
          {strings.meta.appName.split(" ").map((val, index) => (
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
        <p className="text-center text-lg">{strings.app.description}</p>
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
