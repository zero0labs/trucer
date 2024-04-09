import React, { useState } from "react";
import { josefinSans } from "@/global/fonts/jose";
import classnames from "@/functions/utils/classnames";
import { Web3Button } from "@web3modal/react";

import Link from "next/link";

function Header() {
  return (
    <header
      className={classnames(
        "w-full py-12 max-w-7xl  mx-auto flex justify-between items-center",
        josefinSans.className
      )}>
      <Link href="/">
        <h1>Trucer</h1>
      </Link>
      <div className="w-64 ml-72 flex mx-auto justify-between items-center">
      <Link className="w-28 h-10 bg-white  items-center justify-center flex text-white" href="/">
        Generate
      </Link>
      <Link className="w-28 h-10  bg-white border-solid-black rounded-xl items-center justify-center flex text-black" href="/verify">
        Verify
      </Link>
      </div>
      <div className="button-holder">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding:4,
         }}></div>
      
        <Web3Button />
      </div>
    </header>
  );
}

export default Header;
