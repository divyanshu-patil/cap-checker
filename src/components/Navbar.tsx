import Image from "next/image";
import Link from "next/link";

import { Github } from "./Footer";
import { strings } from "@/constants/strings";

const Navbar = () => {
  return (
    <nav className="w-full  flex justify-between items-center backdrop-blur-sm bg-black/25 px-10">
      <Link href={"/"}>
        <div className="relative h-20 aspect-square">
          <Image src="/logo.png" alt="App logo" fill />
        </div>
      </Link>
      <Link href={strings.socialLinks.githubRepo}>
        <div className="relative">
          <Github size={40} />
        </div>
      </Link>
    </nav>
  );
};

export default Navbar;
