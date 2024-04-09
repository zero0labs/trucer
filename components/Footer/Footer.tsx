import Link from "next/link";
import React, { useState } from "react";

function Footer() {
  const [show, setShow] = useState(false);
  function Donate() {
    setShow(true);
  }
  return (
    // sm -> md -> lg -> xl - 2xl
    <footer className="max-w-7xl w-full  mt-24 mb-12  flex  space-y-4 items-center justify-between mx-auto ">
      {show && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white relative text-black rounded-3xl w-1/2 h-1/2 flex flex-col justify-center items-center">
            <div className="text-4xl text-[#f7c655] font-bold">Donate</div>
            <div
              onClick={() => {
                setShow(false);
              }}
              className="font-bold absolute z-[200] text-2xl text-black right-5 top-1 cursor-pointer ">
              <img className="w-8" src="/x.svg" />
            </div>
            <div className="text-2xl font-bold text-[#f7c655] mt-12">
              EVM Wallet Address
            </div>
            <div className="text-2xl font-bold ">
              0xCf2ABddff134ef29dC45db6eb42fBefE7e28FdA2
            </div>
             <img className="w-36 mt-10" src="/qr2.png" />
          </div>
        </div>
      )}
     
      <div className="flex "> 
      <div className="text-[#f7c655] ml-2 mt-4">Powered by </div>
      <img className="w-32 ml-3 mt-2 "src="/zero.png" />
      </div>
     

      <div className="flex space-x-8 items-center">
        <Link
          href="https://twitter.com/0labssolutions"
          className="text-[#f7c655]">
          Twitter
        </Link>
        <Link
          href="https://twitter.com/0labssolutions"
          className="text-[#f7c655]">
          Medium
        </Link>
        <Link
          href="https://twitter.com/0labssolutions"
          className="text-[#f7c655]">
          Github
        </Link>
        <div
          onClick={Donate}
          className=" cursor-pointer px-4 py-2 rounded-full bg-[#f7c655] text-black ">
          Donate
        </div>
      </div>
    </footer>
  );
}

export default Footer;
