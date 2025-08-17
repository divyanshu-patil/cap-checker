import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Github } from "./Footer";

const Navbar = () => {
  return (
    <nav className="w-full fixed top-0 left-0 z-50 flex justify-between items-center backdrop-blur-sm bg-black/25 px-10 py-4">
      <Link href={"/"}>
        <div className="relative h-20 aspect-square">
          <Image src="/logo.png" alt="App logo" fill />
        </div>
      </Link>
      <Link href={"https://github.com/divyanshu-patil/cap-checker/"}>
        <div className="relative">
          <Github size={40} />
        </div>
      </Link>
    </nav>
  );
};

export default Navbar;
