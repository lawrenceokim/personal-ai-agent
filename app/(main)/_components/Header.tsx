"use client";

import { AuthContext } from "@/context/AuthContext";
import Image from "next/image";
import React, { useContext } from "react";

function Header() {
  const { user } = useContext(AuthContext);
  return (
    <div className="shadow-sm flex fixed justify-between items-center p-10">
      <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
      {user?.picture && (
        <Image
          src={user?.picture}
          alt="logo"
          width={40}
          height={40}
          className="rounded-full"
        />
      )}
    </div>
  );
}

export default Header;
