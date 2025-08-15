import DataInput from "./DataInput";
import InstituteCodes from "./InstituteCodes";
import { InstituteCodeProvider } from "@/context/InstituteCodeContext";
import SubmitButton from "./SubmitButton";

const Home = () => {
  return (
    <div className="h-screen self-center w-screen flex flex-col justify-center items-center gap-15">
      <h1 className=" text-6xl md:text-7xl lg:text-8xl font-bold">
        <span className="text-violet-600">C</span>AP{" "}
        <span className="text-violet-600">C</span>hecker
      </h1>

      <InstituteCodeProvider>
        <div className="w-full max-w-96 md:max-w-[500px] mx-10 flex flex-col gap-10">
          <InstituteCodes />
          <DataInput />
          <SubmitButton />
        </div>
      </InstituteCodeProvider>
    </div>
  );
};

export default Home;
